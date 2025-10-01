import IInputHandler from "./IInputHandler";

class LRKeyInputHandler implements IInputHandler {
  private wasLeftArrowPushed: boolean;
  private wasRightArrowPushed: boolean;

  constructor() {
    this.wasLeftArrowPushed = false;
    this.wasRightArrowPushed = false;
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") {
      this.wasLeftArrowPushed = true;
    } else if (event.key === "ArrowRight") {
      this.wasRightArrowPushed = true;
    }
  }

  public resetLeftMove() {
    this.wasLeftArrowPushed = false;
  }

  public resetRightMove() {
    this.wasRightArrowPushed = false;
  }

  public madeLeftMove(): boolean {
    return this.wasLeftArrowPushed;
  }

  public madeRightMove(): boolean {
    return this.wasRightArrowPushed;
  }
}

export default LRKeyInputHandler;
