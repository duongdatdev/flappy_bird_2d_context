class GameObject {
  constructor(ctx, x, y, width, height, vx, vy) {
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = vx;
    this.vy = vy;

    this.isColliding = false;
  }

  update(secondsPassed){
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  draw(){

  }
}
