let ctx;
const SPAWN_PIPE_INTERVAL = 1.7;
const PIPE_WIDTH = 50;
const SPACE_HEIGHT = 150;
const MIN_SPACE_Y = 50;

class Game {
  constructor(canvas) {
    /** @type {CanvasRenderingContext2D} */
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;

    this.bird = new Bird(this.ctx, 40, canvas.height / 2, 20, 0, 0);
    this.listenForInput();

    this.gameUI = new GameUI(this.ctx, canvas.width, canvas.height);

    this.pipePairList = [];

    this.secondsPassed = 0;
    this.oldTimeStamp = 0;

    this.spawnPipeTimer = 0;
    this.score = 0;

    this.isStart = false;
    this.isDeath = false;

    this.draw();
    this.gameUI.drawMessage(
      "Press Space to Play",
      canvas.width / 2,
      canvas.height / 2,
    );
    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.gameUI.drawBackground();

    for (let pipePair of this.pipePairList) {
      pipePair.draw();
    }

    this.gameUI.drawScore(this.score);
    this.bird.draw();

    if (this.isDeath) {
      this.gameUI.drawMessage("Press ", canvas.width / 2, canvas.height / 2);
      this.gameUI.drawMessage(
        "Space to PlayAgain",
        canvas.width / 2,
        canvas.height / 2 + 50,
      );
    }
  }

  update(secondsPassed) {
    this.bird.update(secondsPassed);
    this.spawnPipe(secondsPassed);

    if (this.bird.isOutOfScreen(this.canvas.width, this.canvas.height)) {
      this.isStart = false;
      this.isDeath = true;
    }

    for (let pipePair of this.pipePairList) {
      // console.log('update');
      pipePair.update(secondsPassed);
      if (pipePair.isPipeTouchedBird(this.bird)) {
        // console.log("bird touched pipe pair");
        this.isStart = false;
        this.isDeath = true;
      }

      if (pipePair.isBirdPassed(this.bird) && !pipePair.isPassed) {
        pipePair.isPassed = true;
        this.score++;
        // console.log("bird passed");
      }
    }
  }

  spawnPipe(secondsPassed) {
    this.spawnPipeTimer += secondsPassed;
    if (this.spawnPipeTimer >= SPAWN_PIPE_INTERVAL) {
      let maxSpaceY = this.canvas.height - SPACE_HEIGHT - MIN_SPACE_Y;

      let spaceY = Math.floor(Math.random() * (maxSpaceY - MIN_SPACE_Y)) + MIN_SPACE_Y;

      let pipePair = new PipePair(
        this.ctx,
        this.canvas.width,
        PIPE_WIDTH,
        spaceY,
        SPACE_HEIGHT,
        this.canvas.height,
      );
      this.pipePairList.push(pipePair);

      this.spawnPipeTimer = 0;
    }
  }

  listenForInput() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (this.isStart) {
          this.bird.up();
        } else if (!this.isStart && this.isDeath) {
          this.resetGame();
          console.log("restart");
        } else if (!this.isStart) {
          this.isStart = true;
        }
      }
    });
  }

  resetGame() {
    this.bird.moveTo(40, this.canvas.height / 2);
    this.bird.vy = 0;
    this.spawnPipeTimer = 0;
    this.secondsPassed = 0;
    this.oldTimeStamp = 0;
    this.pipePairList = [];
    this.score = 0;
    this.draw();
    this.isStart = true;
    this.isDeath = false;
  }

  gameLoop(timeStamp) {
    if (this.isStart) {
      this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
      this.secondsPassed = Math.min(this.secondsPassed, 0.1);

      this.oldTimeStamp = timeStamp;

      this.update(this.secondsPassed);
    }

    this.draw();
    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }
}
