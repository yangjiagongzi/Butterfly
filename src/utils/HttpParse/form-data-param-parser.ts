import { EOL, regexps } from "./constants";
import { ParseBodyParam, trim, trimEnd } from "./utils";

const getContentDisposition = (param: string) => {
  const contentDisposition = param.match(regexps.contentDisposition);
  if (contentDisposition) {
    return {
      param: param.replace(contentDisposition[0], ""),
      contentDispositionHeader: trimEnd(contentDisposition[0], EOL),
    };
  }
  throw new Error("Incorrect Content-Disposition: " + param);
};

const getContentType = (param: string) => {
  const contentType = param.match(regexps.contentType);
  if (contentType) {
    return {
      param: param.replace(contentType[0], ""),
      contentType: trimEnd(
        contentType
          .toString()
          .toLowerCase()
          .replace(/^content-type: */, ""),
        EOL
      ),
    };
  }
  return { param, contentType: "" };
};

const getDispositionType = (contentDisposition: string) => {
  const dispositionType = contentDisposition.match(
    regexps.contentDispositionType
  );
  if (dispositionType) {
    return dispositionType[0].trim().toLowerCase();
  }
  throw new Error("Incorrect Content-Disposition type: " + contentDisposition);
};

const getParamName = (contentDisposition: string) => {
  const paramName = contentDisposition.match(regexps.dispositionName);
  if (paramName) {
    return trim(paramName[0], '"');
  }
  throw new Error(
    "Incorrect Content-Disposition, expected param name: " + contentDisposition
  );
};

const getFileName = (contentDisposition: string) => {
  const fileName = contentDisposition.match(regexps.dispositionFileName);
  if (fileName) {
    return trim(fileName[0], '"');
  }
};

const getParamValue = (param: string) => {
  if (param.match(regexps.nlStart)) {
    return param.replace(regexps.nlStart, "");
  }
  throw new Error("Incorrect form-data parameter: " + param);
};

export const parseFormData = (param: string) => {
  const { param: param1, contentDispositionHeader } =
    getContentDisposition(param);

  const { param: param2, contentType } = getContentType(param1);

  const dispositionType = getDispositionType(contentDispositionHeader);

  const name =
    dispositionType === "form-data"
      ? getParamName(contentDispositionHeader)
      : undefined;
  const fileName = getFileName(contentDispositionHeader);
  const value = getParamValue(param2);

  const result: ParseBodyParam = {
    value,
  };
  if (dispositionType !== "form-data") {
    result.type = dispositionType;
  }
  if (contentType != undefined) {
    result.contentType = contentType;
  }
  if (name != undefined) {
    result.name = name;
  }
  if (fileName != undefined) {
    result.fileName = fileName;
  }

  return result;
};
