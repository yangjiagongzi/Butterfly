import {
  HttpContentTypeApplication,
  HttpContentTypeMultipart,
  HttpHeader,
  HttpMethod,
  HttpProtocolVersion,
} from "~/constant/intruder";
import { EOL, EOL2X, regexps } from "./constants";
import { parseFormData } from "./form-data-param-parser";
import {
  isNil,
  ParseBody,
  ParseBodyParam,
  ParseCookieParam,
  ParseHeader,
  parseOrigin,
  parseUrl,
  prettifyHeaderName,
  splitBy,
  trim,
} from "./utils";

const parseStartRow = (startRow: string, hostInHeader: string) => {
  if (!regexps.requestStartRow.test(startRow)) {
    throw new Error("Incorrect startRow format, expected: " + startRow);
  }

  const rowParts = startRow.split(/\s+/);
  const method = rowParts[0].toUpperCase() as HttpMethod;
  const protocolVersion = (
    rowParts[2] || HttpProtocolVersion.http11
  ).toUpperCase() as HttpProtocolVersion;
  const target = rowParts[1];

  try {
    const { host, path, params } = parseUrl(target);
    const targetPath = parseOrigin(target, hostInHeader);

    return {
      method,
      protocolVersion,
      target: targetPath,
      host: host || hostInHeader,
      path,
      queryParams: params,
    };
  } catch (err) {
    throw err;
  }
};

const parseHeadersRow = (headerRows: string[]) => {
  return headerRows.map((hRow) => {
    // eslint-disable-next-line prefer-const
    let [name, value] = splitBy(hRow, ":");
    if (!name) {
      throw new Error("Incorrect header row format, name: " + name);
    }

    if (isNil(value)) {
      value = "";
    } else if (regexps.quotedHeaderValue.test(value)) {
      value = trim(value, '"');
    }

    return {
      name: prettifyHeaderName(name),
      value,
    };
  });
};

const parseCookieRows = (cookiesRow?: string) => {
  if (!cookiesRow) {
    return [];
  }

  const [cookieHeaderName, values] = splitBy(cookiesRow, ":");

  if (!cookieHeaderName) {
    throw new Error("Incorrect cookie row format: " + cookiesRow);
  }

  if (!values) {
    return [];
  }

  return values.split(";").map((pair) => {
    const [name, value] = splitBy(pair, "=");
    const cookie: ParseCookieParam = {
      name,
    };
    if (value) {
      cookie.value = value;
    }
    if (!cookie.name) {
      throw new Error("Incorrect cookie pair format: " + values);
    }
    return cookie;
  });
};

const processTransferEncodingChunked = (
  bodyRows: string,
  headers: ParseHeader[]
) => {
  const isChunked = headers.some(
    (h) =>
      h.name === HttpHeader.transferEncoding.toString() &&
      h.value.includes("chunked")
  );
  if (!isChunked) {
    return bodyRows;
  }

  let text = bodyRows;
  const buffer: string[] = [];
  do {
    const rows = text.match(regexps.chunkRow);
    const firstRow = rows ? rows[0] : "";
    const chunkLength = +("0x" + firstRow || "").trim();
    if (!chunkLength) {
      throw new Error("Incorrect row: " + bodyRows);
    }
    text = text.slice(firstRow.length);
    const chunk = text.slice(0, chunkLength);
    buffer.push(chunk);
    text = text.slice(chunkLength + EOL.length);
  } while (text);

  return buffer.join("");
};

const getBoundary = (contentType?: string) => {
  if (!contentType) {
    throw new Error(
      "Message with multipart/form-data body must have Content-Type header with boundary"
    );
  }

  const params = contentType.split(";")[1];
  if (!params) {
    throw new Error(
      "Message with multipart/form-data body must have Content-Type header with boundary"
    );
  }

  const boundary = params.match(regexps.boundary);
  if (!boundary) {
    throw new Error("Incorrect boundary, expected: " + params);
  }
  return trim(boundary[0], '"');
};

const parseFormDataBody = (
  bodyRows: string,
  contentType?: string
): ParseBody => {
  const boundary = getBoundary(contentType);
  const params = bodyRows
    .split(`--${boundary}`)
    // skip first and last items, which contains boundary
    .filter((unused, index, params) => index > 0 && index < params.length - 1)
    .map((paramGroup) => parseFormData(paramGroup));
  return {
    boundary,
    params,
  };
};

const parseUrlencodedBody = (bodyRows: string): ParseBody => {
  const params = new URLSearchParams(bodyRows);
  const paramsList: ParseBodyParam[] = [];
  params.forEach((value, name) => {
    paramsList.push({ name, value });
  });
  return {
    params: paramsList,
  };
};

const parseTextBody = (bodyRows: string): ParseBody => {
  return {
    text: bodyRows,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseBodyRows = (
  bodyRows: string,
  headers: ParseHeader[]
): ParseBody | undefined => {
  if (!bodyRows) {
    return;
  }

  const bodyRowsFormat = processTransferEncodingChunked(bodyRows, headers);

  let contentType = null;
  const contentTypeHeader = headers.find(
    (h) => h.name === HttpHeader.contentType.toString()
  );
  if (contentTypeHeader?.value) {
    contentType = contentTypeHeader.value.toLowerCase().split(";")[0];
  }

  switch (contentType) {
    case HttpContentTypeMultipart.formData:
    case HttpContentTypeMultipart.alternative:
    case HttpContentTypeMultipart.mixed:
    case HttpContentTypeMultipart.related:
      return parseFormDataBody(bodyRowsFormat, contentTypeHeader?.value);
    case HttpContentTypeApplication.xWwwFormUrlencoded:
      return parseUrlencodedBody(bodyRowsFormat);
    default:
      return parseTextBody(bodyRowsFormat);
  }
};

export const parse = (rawMessage: string) => {
  const row = rawMessage.split("\n");
  const firstRow = row[0];

  if (!regexps.requestStartRow.test(firstRow)) {
    throw new Error("rawMessage has incorrect format");
  }

  const [top = rawMessage, bodyRows = ""] = splitBy(rawMessage, EOL2X);
  const [startRow, ...headerRows] = top.split(EOL);

  // startRow
  const hostRow = headerRows.find((row) =>
    row.toLowerCase().startsWith("host:")
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, hostInHeader] = splitBy(hostRow || "", ":");
  const startRowValue = parseStartRow(startRow, hostInHeader);

  // headers
  const headers = parseHeadersRow(headerRows);

  // cookies
  const cookiesRow = headerRows.find((row) =>
    row.toLowerCase().startsWith("cookie:")
  );
  const cookies = parseCookieRows(cookiesRow);

  // body
  // const body = parseBodyRows(bodyRows, headers);

  return {
    ...startRowValue,
    headers,
    cookies,
    body: bodyRows,
  };
};
