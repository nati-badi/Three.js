import Sizes from "../Utils/Sizes";

export default class Experience {
  constructor(canvas) {
    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Sizes
    this.sizes = new Sizes();
  }
}
