import { PayloadReplaceParams } from ".";

export default class PitchforkReplace {
  private params: PayloadReplaceParams;
  private hasStart: boolean;

  length: number;

  constructor(params: PayloadReplaceParams) {
    this.params = params;
    this.hasStart = false;

    const { payloads } = params;
    let minGeneratorLength = 0;
    payloads.forEach((p) => {
      if (minGeneratorLength === 0 || p.generator.length < minGeneratorLength) {
        minGeneratorLength = p.generator.length;
      }
    });
    this.length = minGeneratorLength + 1;
  }

  next = (): string | undefined => {
    const { originalString, payloads, pointCount, format } = this.params;
    if (pointCount <= 0 || payloads.length !== pointCount) {
      return undefined;
    }

    if (!this.hasStart) {
      this.hasStart = true;
      payloads.forEach((item) => {
        item.generator.reset();
      });
      return originalString;
    }

    const paddingList = payloads.map((item) => {
      return { value: item.generator.next(), replace: true };
    });

    if (paddingList.every((p) => p.value !== undefined)) {
      return format(
        paddingList as unknown as {
          value: string;
          replace: boolean;
        }[]
      );
    }

    return undefined;
  };
}
