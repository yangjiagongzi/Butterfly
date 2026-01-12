import type { NextRequest } from "next/server";
import { HttpMethod, RequestOptions } from "~/constant/intruder";

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

  const init: RequestInit = {
    method: requestParams.method,
    headers: headers,
    body: requestParams.body,
  };

  if (
    requestParams.method === HttpMethod.get ||
    requestParams.method === HttpMethod.head
  ) {
    delete init.body;
  }

  const proxyRes = await fetch(urlWithParams, init);

  const resHeaders: string[] = [];
  proxyRes.headers.forEach((v, k) => {
    resHeaders.push(`${k}: ${v}`);
  });

  const result = await proxyRes.text();

  return Response.json({
    response_string: `HTTP/1.1 ${proxyRes.status} ${
      proxyRes.statusText
    }\n${resHeaders.join("\n")}\n\n${result}`,
  });
}
