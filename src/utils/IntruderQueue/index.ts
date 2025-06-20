import {
  IntruderOptionsDelayBetweenReqType,
  SettingsParams,
} from "~/constant/intruder";
import { sleep } from "../Base";

export enum ProgressStatus {
  Start = "start",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export type ProgressItemType = {
  idx: number;
  finishLength: number;
  totalLength: number;
  request: string;
} & (
  | { status: ProgressStatus.Start | ProgressStatus.Loading }
  | { status: ProgressStatus.Success; response: string }
  | { status: ProgressStatus.Failed; errorMessage: string }
);

export default class IntruderQueue {
  private readonly maximumConcurrentReq: number;
  private readonly next: () => string | undefined;
  private readonly onProgress: (item: ProgressItemType) => void;
  private readonly getDelay: () => number;
  private readonly handleFunc: (value: string) => Promise<string>;
  private length: number;
  private finishLength: number;
  private progressNumber: number;
  private isSuspended: boolean;
  private idx: number;
  constructor({
    length,
    maximumConcurrentReq,
    delayBetweenRes,
    next,
    onProgress,
    handleFunc,
  }: SettingsParams & {
    length: number;
    next: () => string | undefined;
    onProgress: (item: ProgressItemType) => void;
    handleFunc: (value: string) => Promise<string>;
  }) {
    this.maximumConcurrentReq = maximumConcurrentReq;
    this.next = next;
    this.onProgress = onProgress;
    this.getDelay = this.getDelayFunc({
      maximumConcurrentReq,
      delayBetweenRes,
    });
    this.handleFunc = handleFunc;
    this.length = length;
    this.finishLength = 0;
    this.progressNumber = 0;
    this.isSuspended = false;
    this.idx = 0;
  }

  private getDelayFunc = ({
    maximumConcurrentReq,
    delayBetweenRes,
  }: SettingsParams) => {
    if (maximumConcurrentReq > 1) {
      return () => 0;
    }
    let increaseBase = 0;
    if (delayBetweenRes.type === IntruderOptionsDelayBetweenReqType.Fixed.id) {
      return () => delayBetweenRes.fixedValue;
    }
    if (
      delayBetweenRes.type === IntruderOptionsDelayBetweenReqType.Increase.id
    ) {
      increaseBase = increaseBase + delayBetweenRes.increaseValue;
      return () => increaseBase;
    }
    const min = Math.min(
      delayBetweenRes.randomValue[0],
      delayBetweenRes.randomValue[1]
    );
    const max = Math.max(
      delayBetweenRes.randomValue[0],
      delayBetweenRes.randomValue[1]
    );
    return () => min + Math.round(Math.random() * (max - min));
  };

  private consumeFunc = async (item: string, idx: number) => {
    this.onProgress({
      idx,
      status: ProgressStatus.Start,
      request: item,
      finishLength: this.finishLength,
      totalLength: this.length,
    });
    const delay = this.getDelay();
    try {
      await sleep(delay);

      this.onProgress({
        idx,
        status: ProgressStatus.Loading,
        request: item,
        finishLength: this.finishLength,
        totalLength: this.length,
      });

      const result = await this.handleFunc(item);

      this.finishLength++;
      this.onProgress({
        idx,
        status: ProgressStatus.Success,
        request: item,
        response: result,
        finishLength: this.finishLength,
        totalLength: this.length,
      });
    } catch (err: unknown) {
      this.finishLength++;
      this.onProgress({
        idx,
        status: ProgressStatus.Failed,
        request: item,
        errorMessage: (err as Error).message,
        finishLength: this.finishLength,
        totalLength: this.length,
      });
      console.log(err);
    }
    this.progressNumber = this.progressNumber - 1;
    this.consume();
  };

  private consume = async () => {
    if (this.isSuspended) {
      return;
    }
    const freeThreadCount = this.maximumConcurrentReq - this.progressNumber;
    if (freeThreadCount <= 0) {
      return;
    }
    const item = this.next();
    if (item === undefined) {
      this.isSuspended = true;
      return;
    }
    this.progressNumber = this.progressNumber + 1;
    const idx = this.idx;
    this.idx++;
    this.consumeFunc(item, idx);
    this.consume();
  };

  get waitSize() {
    return this.length - this.finishLength;
  }
  get fullSize() {
    return this.length;
  }

  suspend = () => {
    this.isSuspended = true;
  };
  start = () => {
    this.isSuspended = false;
    this.consume();
  };
}
