class Bird extends GameObject {
  constructor(ctx, x, y, radius, vx, vy) {
    super(ctx, x, y, radius, radius, vx, vy);
    this.radius = radius;
    this.gravity = 900;
  }

  draw() {
    //base
    this.ctx.beginPath();
    this.ctx.fillStyle = "yellow";
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    //beak
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.moveTo(this.x + this.radius + 12, this.y);
    this.ctx.lineTo(this.x + 12, this.y + this.radius / 2);
    this.ctx.lineTo(this.x + 12, this.y - this.radius / 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update(secondsPassed) {
    this.vy += this.gravity * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  up() {
    // this.vy -= amount;
    this.vy = -350;
  }

  down() {}

  isOutOfScreen(canvasWidth, canvasHeight) {
    return this.y > canvasHeight - this.radius 
            || this.y - this.radius < 0;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}
