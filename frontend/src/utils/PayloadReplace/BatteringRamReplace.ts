import { PayloadReplaceParams } from ".";

export default class BatteringRamReplace {
  private params: PayloadReplaceParams;
  private hasStart: boolean;

  length: number;

  constructor(params: PayloadReplaceParams) {
    this.params = params;
    this.hasStart = false;
    const { payloads } = params;
    const generatorLength = payloads[0]?.generator.length || 0;
    this.length = generatorLength + 1;
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

    const payloadValue = generator.next();
    if (payloadValue === undefined) {
      return undefined;
    }

    return format(
      new Array(pointCount).fill("").map(() => {
        return { value: payloadValue!, replace: true };
      })
    );
  };
}
