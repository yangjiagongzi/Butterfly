import { parse } from 'shell-quote'

/**
 * Rewrite args for special cases such as -XPUT.
 */

function rewrite(args: string[]) {
  return args.reduce<string[]>(function (args, a) {
    if (a.startsWith('-X')) {
      args.push('-X')
      args.push(a.slice(2))
    } else {
      args.push(a)
    }

    return args
  }, [])
}

function rewriteValue(str: string) {
  if (str.startsWith('$')) {
    return str.replace(/^\$/g, '')
  }
  return str
}

/**
 * Parse header field.
 */

function parseField(s: string) {
  return s.split(/: (.+)/)
}

/**
 * Check if `s` looks like a url.
 */

function isURL(s: string) {
  // TODO: others at some point
  return /^https?:\/\//.test(s)
}

export const parseFunc = function (string: string) {
  const s = string.trim()
  if (!s.startsWith('curl ')) {
    return
  }

  const args = rewrite(parse(s) as string[])
  const out: Record<string, any> = { method: 'GET', header: {} }
  let state: 'user-agent' | 'header' | 'data' | 'user' | 'method' | 'cookie' | '' = ''

  args.forEach(function (arg) {
    const formatArg = rewriteValue(arg)

    switch (true) {
      case isURL(formatArg):
        out.url = formatArg
        break

      case arg === '-A' || arg === '--user-agent':
        state = 'user-agent'
        break

      case arg === '-H' || arg === '--header':
        state = 'header'
        break

      case arg === '-d' ||
        arg === '--data' ||
        arg === '--data-ascii' ||
        arg === '--data-urlencode' ||
        arg === '--data-binary':
        state = 'data'
        break

      case arg === '-u' || arg === '--user':
        state = 'user'
        break

      case arg === '-I' || arg === '--head':
        out.method = 'HEAD'
        break

      case arg === '-X' || arg === '--request':
        state = 'method'
        break

      case arg === '-b' || arg === '--cookie':
        state = 'cookie'
        break

      case arg === '--compressed':
        out.header['Accept-Encoding'] = out.header['Accept-Encoding'] || 'deflate, gzip'
        break

      case !!arg: {
        switch (state) {
          case 'header': {
            const field = parseField(formatArg)
            out.header[field[0]] = field[1]
            state = ''
            break
          }
          case 'user-agent':
            out.header['User-Agent'] = formatArg
            state = ''
            break
          case 'data': {
            if (out.method == 'GET' || out.method == 'HEAD' || !out.method) {
              out.method = 'POST'
            }
            out.header['Content-Type'] =
              out.header['Content-Type'] || 'application/x-www-form-urlencoded'
            out.body = out.body ? out.body + '&' + formatArg : formatArg
            state = ''
            break
          }
          case 'user':
            out.header['Authorization'] = 'Basic ' + btoa(formatArg)
            state = ''
            break
          case 'method':
            out.method = formatArg
            state = ''
            break
          case 'cookie':
            out.header['Set-Cookie'] = formatArg
            state = ''
            break
        }
        break
      }
    }
  })

  return out
}
