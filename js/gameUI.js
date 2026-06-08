class GameUI {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
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

  // drawBackground(){
  //   this.ctx.fillStyle = "#87cefa"
  //   this.fillRect =
  // }

  drawMessage(text, x, y) {
    this.ctx.font = "bold 40px Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, x, y);
  }
}
