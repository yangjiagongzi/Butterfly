import { RequestOptions } from "~/constant/intruder";

export const fetchByServer = async (options: RequestOptions) => {
  try {
    const res = await fetch("/api/fetch", {
      method: "POST",
      body: JSON.stringify(options),
    });
    const resJson = await res.json();
    if (resJson && resJson.responseString) {
      return resJson.responseString as string;
    }
    throw new Error("error get response string");
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
