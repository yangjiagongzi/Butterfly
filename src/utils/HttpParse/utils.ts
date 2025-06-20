export type ParseHeader = {
  name: string;
  value: string;
};

export type ParseParam = {
  name: string;
  value: string;
};

export type ParseBody = {
  text?: string;
  params?: ParseBodyParam[];
  contentType?: string;
  boundary?: string;
};

export type ParseBodyParam = {
  name?: string;
  value?: string;
  type?: string;
  fileName?: string;
  contentType?: string;
};

export type ParseCookieParam = {
  name: string;
  value?: string;
};

export const splitBy = (str: string, delimiter: string): string[] => {
  if (isEmpty(str)) {
    return [];
  }

  const delimiterIndex = str.indexOf(delimiter);
  if (delimiterIndex === -1) {
    return [];
  }

  const result = [
    str.slice(0, delimiterIndex),
    str.slice(delimiterIndex + delimiter.length),
  ];
  result[0] = result[0].trim();
  result[1] = result[1].trim();

  return result;
};

export const isNil = (value: unknown): boolean => {
  return value == null;
};

export const isEmpty = (value: unknown): boolean => {
  if (isNil(value)) {
    return true;
  }
  if ((<Array<unknown>>value).length || (<Set<unknown>>value).size) {
    return false;
  }
  if (typeof value !== "object") {
    return true;
  }
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      return false;
    }
  }
  return true;
};

export const parseUrl = (url: string) => {
  const baseHost = "https://www.superrandomhost28476561927456.com";
  const parsedUrl = url ? new URL(url, baseHost) : new URL(baseHost);
  const params: ParseParam[] = [];
  parsedUrl.searchParams.forEach((value, name) => params.push({ name, value }));

  return {
    host:
      parsedUrl.host !== "www.superrandomhost28476561927456.com"
        ? parsedUrl.host
        : "unspecified-host",
    path: parsedUrl.pathname,
    params,
  };
};

export const trim = (
  value: string,
  chars: string | undefined = undefined
): string => {
  if (isNil(value)) {
    return value;
  }
  value = value.toString();

  if (chars === undefined || chars === "\\s") {
    return value.trim();
  }
  return value.replace(new RegExp(`^([${chars}]*)(.*?)([${chars}]*)$`), "$2");
};

export const trimEnd = (
  value: string,
  chars: string | undefined = undefined
): string => {
  if (isNil(value)) {
    return value;
  }
  value = value.toString();

  if (chars === undefined || chars === "\\s") {
    return value.trimEnd();
  }
  return value.replace(new RegExp(`^(.*?)([${chars}]*)$`), "$1");
};

export const capitalize = (value: string): string => {
  return value
    ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    : "";
};

export const prettifyHeaderName = (name: string | null | undefined): string => {
  return (name ?? "").toString().split("-").map(capitalize).join("-");
};
