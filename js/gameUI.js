class GameUI {
  constructor(ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  drawScore(score = 0) {
    this.ctx.fillStyle = "black";
    this.ctx.font = "bold 30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Score ${score}`, this.width / 2, 30);

    //test only
    // score = 15;
    // this.ctx.fillText(score, this.width/2, 30);
  }

  drawBackground() {
    //draw sky
    this.ctx.fillStyle = "#87cefa";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    //draw ground
    this.ctx.fillStyle = "#01a550";
    this.ctx.fillRect(0, this.canvasHeight -50, this.canvasWidth, 50)
  }

  drawMessage(text, x, y) {
    this.ctx.font = "bold 40px Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, x, y);
  }
}
