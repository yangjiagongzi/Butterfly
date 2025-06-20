import { BaseGenerator } from "~/utils/PayloadGenerate";

export const AttackType = {
  Sniper: { id: "Sniper", name: "狙击" },
  BatteringRam: { id: "BatteringRam", name: "横推" },
  Pitchfork: { id: "Pitchfork", name: "多路并进" },
  ClusterBomb: { id: "ClusterBomb", name: "饱和攻击" },
} as const;

export enum HttpProtocol {
  http = "HTTP",
  https = "HTTPS",
}

export enum HttpProtocolVersion {
  http10 = "HTTP/1.0",
  http11 = "HTTP/1.1",
  http2 = "HTTP/2",
  http3 = "HTTP/3",
}

export enum HttpMethod {
  connect = "CONNECT",
  options = "OPTIONS",
  trace = "TRACE",
  head = "HEAD",
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  delete = "DELETE",
}

export enum HttpHeader {
  host = "Host",
  contentType = "Content-Type",
  contentLength = "Content-Length",
  userAgent = "User-Agent",
  setCookie = "Set-Cookie",
  transferEncoding = "Transfer-Encoding",
}

export enum HttpContentTypeMultipart {
  any = "multipart/",
  alternative = "multipart/alternative",
  formData = "multipart/form-data",
  mixed = "multipart/mixed",
  related = "multipart/related",
}

export enum HttpContentTypeApplication {
  any = "application/",
  javascript = "application/javascript",
  json = "application/json",
  octetStream = "application/octet-stream",
  ogg = "application/ogg",
  pdf = "application/pdf",
  xhtml = "application/xhtml+xml",
  xml = "application/xml",
  xShockwaveFlash = "application/x-shockwave-flash",
  xWwwFormUrlencoded = "application/x-www-form-urlencoded",
  zip = "application/zip",
}

export const IntruderOptionsDelayBetweenReqType = {
  Fixed: { id: "Fixed", name: "固定" },
  Random: { id: "Random", name: "随机" },
  Increase: { id: "Increase", name: "自增" },
} as const;

export const RequestOptionsDefaultValue: RequestOptions = {
  id: "default-empty",
  method: HttpMethod.get,
  url: "",
  headers: [{ id: "default-empty", key: "", value: "", enable: true }],
  params: [{ id: "default-empty", key: "", value: "", enable: true }],
  body: "",
};

export const IntruderOptionsDefaultValue: IntruderOptions = {
  attackType: AttackType.Sniper.id,
  httpMessage: "",
  payloads: [],
  settings: {
    maximumConcurrentReq: 1,
    delayBetweenRes: {
      type: IntruderOptionsDelayBetweenReqType.Fixed.id,
      fixedValue: 1000,
      randomValue: [1000, 5000],
      increaseValue: 100,
    },
  },
};

export type HeaderParamsItem = {
  id: string;
  key: string;
  value: string;
  enable: boolean;
};

export type SettingsParams = {
  maximumConcurrentReq: number;
  delayBetweenRes: {
    type: Values<typeof IntruderOptionsDelayBetweenReqType>["id"];
    fixedValue: number;
    randomValue: [number, number];
    increaseValue: number;
  };
};

export type RequestOptions = {
  id: string;
  method: HttpMethod;
  url: string;
  headers: HeaderParamsItem[];
  params: HeaderParamsItem[];
  body: string;
};

export type IntruderOptions = {
  attackType: Values<typeof AttackType>["id"];
  httpMessage: string;
  payloads: Array<{ id: string; name: string; generator: BaseGenerator }>;
  settings: SettingsParams;
};

export const PayloadType = {
  SimpleList: { id: "SimpleList", name: "简单列表" },
  Numbers: { id: "Numbers", name: "数字" },
  Dates: { id: "Dates", name: "日期" },
  BruteForcer: { id: "BruteForcer", name: "暴力字典" },
  DirectoryTraversal: { id: "DirectoryTraversal", name: "目录生成" },
} as const;

export const PayloadTypeList = Object.values(PayloadType);
