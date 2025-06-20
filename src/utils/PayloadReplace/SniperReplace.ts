import { PayloadReplaceParams } from ".";

export default class SniperReplace {
  private params: PayloadReplaceParams;
  private hasStart: boolean;
  private handlePointIdx: number;

  length: number;

  constructor(params: PayloadReplaceParams) {
    this.params = params;
    this.hasStart = false;
    this.handlePointIdx = 0;
    const { payloads, pointCount } = params;
    const generatorLength = payloads[0]?.generator.length || 0;
    this.length = generatorLength * pointCount + 1;
  }

  next = (): string | undefined => {
    const { originalString, payloads, pointCount, format } = this.params;
    if (pointCount <= 0 || payloads.length !== 1) {
      return undefined;
    }

    const generator = payloads[0].generator;

    if (!this.hasStart) {
      this.hasStart = true;
      generator.reset();
      return originalString;
    }

    if (this.handlePointIdx >= pointCount) {
      return undefined;
    }

    const payloadValue = generator.next();
    if (payloadValue === undefined) {
      generator.reset();
      this.handlePointIdx = this.handlePointIdx + 1;
      return this.next();
    }

    return format(
      new Array(pointCount).fill("").map((item, idx) => {
        if (idx === this.handlePointIdx) {
          return { value: payloadValue!, replace: true };
        }
        return { value: "", replace: false };
      })
    );
  };
}
