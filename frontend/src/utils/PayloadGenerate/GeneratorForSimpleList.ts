import { BaseGenerator } from ".";

export default class SimpleListGenerator implements BaseGenerator {
  private value: string;
  private stepStartFlag = 0;
  constructor(value: string) {
    this.stepStartFlag = 0;

    this.value = value;
    this.showList = [];
    this.init();
  }

  private init = () => {
    this.showList = this.value.split("\n");
    this.length = this.showList.length;
  };

  length = 0;
  showList: string[] = [];

  next = () => {
    const idx = this.stepStartFlag;

    if (idx < this.length) {
      this.stepStartFlag++;
      return this.showList[idx];
    }

    return undefined;
  };

  reset = () => {
    this.stepStartFlag = 0;
  };
}
