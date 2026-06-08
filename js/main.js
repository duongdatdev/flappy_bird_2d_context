let canvas;
let game;

window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    
    game = new Game(canvas);
}