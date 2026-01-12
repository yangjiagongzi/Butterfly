import React, { useCallback, useEffect, useState } from "react";
import { HeaderParamsItem, RequestOptions } from "~/constant/intruder";
import { splitBy } from "~/utils/HttpParse/utils";
import uuid from "~/utils/UuidUtil";
import ParamsTable from "./ParamsTable";

type Props = {
  requestOptions: RequestOptions;
  onUpdateHeaders: (id: string, value: HeaderParamsItem) => void;
};

const RequestCookies: React.FC<Props> = ({
  requestOptions,
  onUpdateHeaders,
}: Props) => {
  const [header, setHeader] = useState<HeaderParamsItem>({
    id: "default-empty",
    key: "",
    value: "",
    enable: true,
  });
  const [cookies, setCookies] = useState<HeaderParamsItem[]>([]);

  useEffect(() => {
    const { header, cookies } = formatCookies(requestOptions.headers);
    setHeader(header);
    setCookies(cookies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestOptions.id]);

  const onChange = useCallback(
    (id: string, value: HeaderParamsItem) => {
      const newCookies = cookies.map((item) => (item.id === id ? value : item));
      const hasEmpty = newCookies.some((item) => !item.key && !item.value);
      if (!hasEmpty) {
        newCookies.push({ id: uuid(), key: "", value: "", enable: true });
      }
      setCookies(newCookies);

      const newCookiesString = generateCookies(newCookies);
      onUpdateHeaders(header.id, { ...header, value: newCookiesString });
    },
    [cookies, header, onUpdateHeaders]
  );

  const onDelete = useCallback(
    (id: string) => {
      const newCookies = cookies.filter((item) => item.id != id);
      setCookies(newCookies);

      const newCookiesString = generateCookies(newCookies);
      onUpdateHeaders(header.id, { ...header, value: newCookiesString });
    },
    [cookies, header, onUpdateHeaders]
  );

  return (
    <ParamsTable params={cookies} onChange={onChange} onDelete={onDelete} />
  );
};

const formatCookies = (headers: HeaderParamsItem[]) => {
  const cookiesRow = headers.find((row) => row.key.toLowerCase() === "cookie");

  if (!cookiesRow) {
    return {
      header: { id: uuid(), key: "Cookie", value: "", enable: true },
      cookies: [{ id: uuid(), key: "", value: "", enable: true }],
    };
  }

  const format = cookiesRow.value.split(";").map((pair) => {
    const [key, value] = splitBy(pair, "=");
    return {
      id: uuid(),
      key,
      value,
      enable: true,
    };
  });
  return {
    header: cookiesRow,
    cookies: [...format, { id: uuid(), key: "", value: "", enable: true }],
  };
};

const generateCookies = (cookies: HeaderParamsItem[]) => {
  let cookiesString = "";
  cookies.forEach((c) => {
    if (c.enable && c.key) {
      cookiesString =
        cookiesString + `${cookiesString ? ";" : ""}${c.key}=${c.value}`;
    }
  });
  return cookiesString;
};

export default RequestCookies;
