export const EOL = "\n";
export const EOL2X = EOL + EOL;

const HTTP_METHODS = "(CONNECT|OPTIONS|TRACE|GET|HEAD|POST|PUT|PATCH|DELETE)";
const HTTP_PROTOCOL_VERSIONS =
  "(HTTP)\\/(1\\.0|1\\.1|2(\\.0){0,1}|3(\\.0){0,1})";

export const regexps = {
  nlStart: new RegExp(`^${EOL}`),
  nlEnd: new RegExp(`${EOL}$`),
  requestStartRow: new RegExp(
    `^${HTTP_METHODS}\\s+\\S*(\\s+${HTTP_PROTOCOL_VERSIONS})?$`
  ),
  quotedHeaderValue: new RegExp('^"[\\u0009\\u0020\\u0021\\u0023-\\u007E]+"$'),
  boundary: new RegExp(`(?<=boundary=)"{0,1}[A-Za-z0-9'()+_,.:=?-]+"{0,1}`),
  contentDisposition: new RegExp(
    `^Content-Disposition:\\s*(form-data|inline|attachment)(?:\\s*;\\s*(name|filename)\\s*=\\s*(?:"([^"]+)"|([^;\\s]+)))*${EOL}`,
    "i"
  ),
  contentType: new RegExp(`^Content-Type:[\\S ]*${EOL}`, "i"),
  contentDispositionType: new RegExp(
    `(?<=Content-Disposition:)\\s*(form-data|inline|attachment)`
  ),
  dispositionName: new RegExp(`(?<=name=)(?:"([^"]+)"|([^;\\s]+))+`, "i"),
  dispositionFileName: new RegExp(
    `(?<=filename=)(?:"([^"]+)"|([^;\\s]+))+`,
    "i"
  ),
  chunkRow: new RegExp(`^[0-9a-fA-F]+${EOL}`),
};
