import React, { useCallback, useMemo, useState } from "react";
import Button from "~/component/Button";
import Input from "~/component/Input";
import Modal from "~/component/Modal";
import Select from "~/component/Select";
import Tab from "~/component/Tab";
import {
  HeaderParamsItem,
  HttpMethod,
  RequestOptions,
} from "~/constant/intruder";
import uuid from "~/utils/UuidUtil";
import styles from "./request.module.scss";
import RequestBody from "./request-body";
import RequestCookies from "./request-cookies";
import RequestHeaders from "./request-headers";
import RequestParams from "./request-params";
import RequestParse from "./request-parse";

const BodyType = ["Headers", "Cookies", "Query Params", "Body"] as const;

type Props = {
  requestOptions: RequestOptions;
  onUpdateRequest: (requestParams: RequestOptions) => void;
};

const Request: React.FC<Props> = ({
  requestOptions,
  onUpdateRequest,
}: Props) => {
  const [choose, setChoose] = useState<(typeof BodyType)[number]>(BodyType[0]);
  const requestMethList = useMemo(
    () => Object.values(HttpMethod).map((m) => ({ id: m, name: m })),
    []
  );
  const bodyTypeList = useMemo(
    () => BodyType.map((m) => ({ id: m, name: m })),
    []
  );

  const onUpdateMethod = useCallback(
    (method: HttpMethod) => {
      onUpdateRequest({ ...requestOptions, method });
    },
    [requestOptions, onUpdateRequest]
  );

  const onUpdateHeaders = useCallback(
    (id: string, value: HeaderParamsItem) => {
      const headers = requestOptions.headers;
      let hasUpdate = false;
      const newHeaders = headers.map((item) => {
        if (item.id === id) {
          hasUpdate = true;
          return value;
        }
        return item;
      });

      if (!hasUpdate) {
        newHeaders.push(value);
      }

      const hasEmpty = newHeaders.some((item) => !item.key && !item.value);
      if (!hasEmpty) {
        newHeaders.push({ id: uuid(), key: "", value: "", enable: true });
      }
      onUpdateRequest({ ...requestOptions, headers: newHeaders });
    },
    [requestOptions, onUpdateRequest]
  );

  const onDeleteHeadersItem = useCallback(
    (id: string) => {
      const headers = requestOptions.headers;
      const newHeaders = headers.filter((item) => item.id != id);
      onUpdateRequest({ ...requestOptions, headers: newHeaders });
    },
    [requestOptions, onUpdateRequest]
  );

  const onUpdateParams = useCallback(
    (id: string, value: HeaderParamsItem) => {
      const params = requestOptions.params;
      let hasUpdate = false;
      const newParams = params.map((item) => {
        if (item.id === id) {
          hasUpdate = true;
          return value;
        }
        return item;
      });

      if (!hasUpdate) {
        newParams.push(value);
      }

      const hasEmpty = newParams.some((item) => !item.key && !item.value);
      if (!hasEmpty) {
        newParams.push({ id: uuid(), key: "", value: "", enable: true });
      }
      onUpdateRequest({ ...requestOptions, params: newParams });
    },
    [requestOptions, onUpdateRequest]
  );

  const onDeleteParamsItem = useCallback(
    (id: string) => {
      const params = requestOptions.params;
      const newParams = params.filter((item) => item.id != id);
      onUpdateRequest({ ...requestOptions, params: newParams });
    },
    [requestOptions, onUpdateRequest]
  );

  const onUpdateBody = useCallback(
    (body: string) => {
      onUpdateRequest({ ...requestOptions, body });
    },
    [requestOptions, onUpdateRequest]
  );

  return (
    <div className={styles.content}>
      <div className={styles.inputBox}>
        <Select
          className="method-select"
          title={"Method"}
          data={requestMethList}
          value={{ id: requestOptions.method, name: requestOptions.method }}
          onChange={({ id }) => {
            onUpdateMethod(id as HttpMethod);
          }}
        />
        <Input
          className="url-input"
          title="URL*"
          placeholder='E.g. "https://example.com/foobar"'
          value={requestOptions.url}
          onChange={(e) => {
            onUpdateRequest({ ...requestOptions, url: e.target.value });
          }}
        />
        <Button
          className="curl-parse-btn"
          title="解析http报文"
          onClick={() => {
            Modal.show(<RequestParse onUpdateRequest={onUpdateRequest} />);
          }}
        />
      </div>
      <div className={styles.requestContent}>
        <Tab
          size="small"
          data={bodyTypeList}
          onChange={(value) => setChoose(value.id as (typeof BodyType)[number])}
        />
        <div className="requestOptions">
          {choose === BodyType[0] ? (
            <RequestHeaders
              requestOptions={requestOptions}
              onUpdateHeaders={onUpdateHeaders}
              onDeleteHeadersItem={onDeleteHeadersItem}
            />
          ) : null}
          {choose === BodyType[1] ? (
            <RequestCookies
              requestOptions={requestOptions}
              onUpdateHeaders={onUpdateHeaders}
            />
          ) : null}
          {choose === BodyType[2] ? (
            <RequestParams
              requestOptions={requestOptions}
              onUpdateParams={onUpdateParams}
              onDeleteParamsItem={onDeleteParamsItem}
            />
          ) : null}
          {choose === BodyType[3] ? (
            <RequestBody
              requestOptions={requestOptions}
              onUpdateBody={onUpdateBody}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Request;
