import React from "react";
import { HeaderParamsItem, RequestOptions } from "~/constant/intruder";
import ParamsTable from "./ParamsTable";

type Props = {
  requestOptions: RequestOptions;
  onUpdateHeaders: (id: string, value: HeaderParamsItem) => void;
  onDeleteHeadersItem: (id: string) => void;
};

const RequestHeaders: React.FC<Props> = ({
  requestOptions,
  onUpdateHeaders,
  onDeleteHeadersItem,
}: Props) => {
  return (
    <ParamsTable
      params={requestOptions.headers}
      onChange={onUpdateHeaders}
      onDelete={onDeleteHeadersItem}
    />
  );
};

export default RequestHeaders;
