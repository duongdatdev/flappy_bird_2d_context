class PipePair extends GameObject {
  constructor(ctx, x, width, spaceY, spaceHeight, canvasHeight) {
    super(ctx, x, 0, width, canvasHeight, -120, 0);

    this.canvasHeight = canvasHeight;
    this.spaceHeight = spaceHeight;
    this.spaceY = spaceY;

    // console.log(this.x);

    this.topPipeHeight = spaceY;
    this.bottomPipeHeight = canvasHeight - (this.topPipeHeight + spaceHeight);
    this.bottomPipeY = this.spaceY + this.spaceHeight;

    this.isPassed = false;
  }

  draw() {
    //top pipe
    this.ctx.fillStyle = "#76c10f";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;

    this.ctx.fillRect(this.x, this.y, this.width, this.topPipeHeight);
    this.ctx.strokeRect(this.x, this.y, this.width, this.topPipeHeight);

    this.ctx.fillRect(this.x - 2, this.topPipeHeight - 10, this.width + 4, 10);
    this.ctx.strokeRect(
      this.x - 2,
      this.topPipeHeight - 10,
      this.width + 4,
      10,
    );

    //glow
    this.ctx.fillStyle = "#ebff92";
    this.ctx.fillRect(this.x + 4, this.y - 2, 4, this.topPipeHeight - 9);
    this.ctx.fillRect(this.x + 2, this.topPipeHeight - 10 + 1, 4, 10 - 2);

    //shadow
    this.ctx.fillStyle = "#2e6500";
    this.ctx.fillRect(
      this.x + this.width - 9,
      this.y - 2,
      4,
      this.topPipeHeight - 9,
    );
    this.ctx.fillRect(
      this.x + this.width - 9 + 2,
      this.topPipeHeight - 10 + 1,
      4,
      10 - 2,
    );

    //bottom pipe
    this.ctx.fillStyle = "#76c10f";
    this.ctx.strokeStyle = "black";
    this.ctx.fillRect(
      this.x,
      this.bottomPipeY,
      this.width,
      this.bottomPipeHeight,
    );
    this.ctx.strokeRect(
      this.x,
      this.bottomPipeY,
      this.width,
      this.bottomPipeHeight,
    );
    this.ctx.fillRect(this.x - 2, this.bottomPipeY, this.width + 4, 10);
    this.ctx.strokeRect(this.x - 2, this.bottomPipeY, this.width + 4, 10);

    //glow
    this.ctx.fillStyle = "#ebff92";
    this.ctx.fillRect(
      this.x + 4,
      this.bottomPipeY + 11,
      4,
      this.bottomPipeHeight - 12,
    );
    this.ctx.fillRect(this.x + 2, this.bottomPipeY + 1, 4, 10 - 2);

    //shadow
    this.ctx.fillStyle = "#2e6500";
    this.ctx.fillRect(
      this.x + this.width - 9,
      this.bottomPipeY + 11,
      4,
      this.bottomPipeHeight - 12,
    );
    this.ctx.fillRect(
      this.x + this.width - 9 + 2,
      this.bottomPipeY + 1,
      4,
      10 - 2,
    );
  }

  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    // console.log(this.x);
  }

  increaseSpeed(amount) {
    this.vy += amount * secondsPassed;
  }

  isPipeTouchedBird(bird) {
    let closestTopPipeX = Math.max(
      this.x,
      Math.min(bird.x, this.x + this.width),
    );
    let closestTopPipeY = Math.max(
      this.y,
      Math.min(bird.y, this.y + this.topPipeHeight),
    );

    let closestBottomPipeX = Math.max(
      this.x,
      Math.min(bird.x, this.x + this.width),
    );
    let closestBottomPipeY = Math.max(
      this.bottomPipeY,
      Math.min(bird.y, this.bottomPipeY + this.bottomPipeHeight),
    );

    let dxTopPipe = bird.x - closestTopPipeX;
    let dyTopPipe = bird.y - closestTopPipeY;

    let dxBottomPipe = bird.x - closestBottomPipeX;
    let dyBottomPipe = bird.y - closestBottomPipeY;

    return (
      dxBottomPipe * dxBottomPipe + dyBottomPipe * dyBottomPipe <=
        bird.radius * bird.radius ||
      dxTopPipe * dxTopPipe + dyTopPipe * dyTopPipe <= bird.radius * bird.radius
    );
  }

  isBirdPassed(bird) {
    return bird.x - bird.radius > this.x + this.width;
  }

  isOutOffScreen() {
    return this.x + this.width <= 0;
  }
}
