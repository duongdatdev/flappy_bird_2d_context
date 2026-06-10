let canvas;
let game;

window.onload = () => {
    /** @type {HTMLCanvasElement} */
    canvas = document.getElementById("gameCanvas");
    
    game = new Game(canvas);
}