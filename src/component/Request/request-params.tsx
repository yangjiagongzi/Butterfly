import React from "react";
import ParamsTable from "~/component/ParamsTable";
import { HeaderParamsItem, RequestOptions } from "~/constant/intruder";

type Props = {
  requestOptions: RequestOptions;
  onUpdateParams: (id: string, value: HeaderParamsItem) => void;
  onDeleteParamsItem: (id: string) => void;
};

const RequestParams: React.FC<Props> = ({
  requestOptions,
  onUpdateParams,
  onDeleteParamsItem,
}: Props) => {
  return (
    <ParamsTable
      params={requestOptions.params}
      onChange={onUpdateParams}
      onDelete={onDeleteParamsItem}
    />
  );
};

export default RequestParams;
