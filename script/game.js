import gameConfig from "../config/gameConfig.js";
import Player from "../models/player.js"; // Adjust the path as needed


const gameController = {
    animationFrameId: null,
    player: null,
    canvas: null,
    c: null,

    init() {
        this.canvas = gameConfig.canvas;
        this.canvas.height = gameConfig.screenH;
        this.canvas.width = gameConfig.screenW;
        this.c = this.canvas.getContext("2d");

        this.player = new Player()
        this.player.setPosition(200, 200)
        this.player.setScale(100, 100)
    },

    update() {
        // Add your game logic update code here
        this.player.update()
    },

    draw() {
        // Add your drawing code here
        this.c.clearRect(0, 0, gameConfig.screenW, gameConfig.screenH)
        this.player.draw(this.c);

    },

    gameLoop() {
        this.update();
        this.draw();
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    },

    startGame() {
        if (!this.animationFrameId) {
            this.gameLoop();
        }
    },

    stopGame() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
};

export default gameController;
