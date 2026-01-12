import { PayloadReplaceParams } from ".";

export default class SniperReplace {
  private params: PayloadReplaceParams;
  private hasStart: boolean;
  private paddingList: Array<string | undefined>;

  length: number;

  constructor(params: PayloadReplaceParams) {
    this.params = params;
    this.hasStart = false;

    const { payloads, pointCount } = params;
    this.length =
      payloads.reduce((pre, payload) => pre * payload.generator.length, 1) + 1;
    this.paddingList = new Array(pointCount).fill(undefined);
  }

  private formatNext = () => {
    const { payloads, pointCount } = this.params;

    let i = 0;
    let shouldGet = true;
    while (i < pointCount) {
      if (shouldGet) {
        this.paddingList[i] = payloads[i].generator.next();
      }
      if (this.paddingList[i] === undefined && i !== pointCount - 1) {
        payloads[i].generator.reset();
        this.paddingList[i] = payloads[i].generator.next();
        i++;
        shouldGet = true;
      } else {
        i++;
        shouldGet = false;
      }
    }
  };

  next = (): string | undefined => {
    const { originalString, payloads, pointCount, format } = this.params;
    if (pointCount <= 0 || payloads.length !== pointCount) {
      return undefined;
    }

    if (!this.hasStart) {
      this.hasStart = true;
      this.paddingList = payloads.map((item) => {
        item.generator.reset();
        return item.generator.next();
      });
      return originalString;
    }

    if (this.paddingList.every((p) => p !== undefined)) {
      const paddingList = this.paddingList.map((p) => ({
        value: p,
        replace: true,
      }));
      this.formatNext();
      return format(paddingList);
    }

    return undefined;
  };
}
