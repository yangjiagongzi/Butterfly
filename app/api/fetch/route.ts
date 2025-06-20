import type { NextRequest } from "next/server";
import { RequestOptions } from "~/constant/intruder";

export async function POST(request: NextRequest) {
  const requestParams: RequestOptions = await request.json();

  let urlWithParams = requestParams.url;
  const headers: Record<string, string> = {};

  if (requestParams.params.length) {
    urlWithParams = urlWithParams + "?";
    requestParams.params.forEach((p) => {
      urlWithParams =
        urlWithParams +
        `${decodeURIComponent(p.key)}=${decodeURIComponent(p.value)}`;
    });
  }

  if (requestParams.headers.length) {
    requestParams.headers.forEach((h) => {
      if (h.enable && h.key) {
        headers[h.key] = h.value;
      }
    });
  }

  const proxyRes = await fetch(urlWithParams, {
    method: requestParams.method,
    headers: headers,
    body: requestParams.body,
  });

  const resHeaders: string[] = [];
  proxyRes.headers.forEach((v, k) => {
    resHeaders.push(`${k}: ${v}`);
  });

  const result = await proxyRes.text();

  return Response.json({
    responseString: `HTTP/1.1 ${proxyRes.status} ${
      proxyRes.statusText
    }\n${resHeaders.join("\n")}\n\n${result}`,
  });
}
