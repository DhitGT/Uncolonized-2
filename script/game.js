import gameConfig from "../config/gameConfig.js";
import Player from "../models/player.js"; // Adjust the path as needed
import Weapon from "../models/weapon.js";


const gameController = {
    animationFrameId: null,
    player: null,
    canvas: null,
    c: null,
    weapon: [],

    init() {
        this.canvas = gameConfig.canvas;
        this.canvas.height = gameConfig.screenH;
        this.canvas.width = gameConfig.screenW;
        this.c = this.canvas.getContext("2d");

        this.player = new Player()
        this.player.setPosition(200, 200)
        this.player.setScale(30, 30)
        this.player.setAppearance('green', 4)


        const playerWeapon = new Weapon(200, 200, 100, 20, 2000);
        playerWeapon.setScale(20, 20);
        this.weapon.push(playerWeapon);
    },

    update() {

        this.weapon.forEach(weapon => {
            weapon.update()
            if (this.player.isColliding(this.player, weapon)) {
                weapon.setParent(this.player)
            }
        })
        this.player.update()
    },

    draw() {
        // Add your drawing code here
        this.c.clearRect(0, 0, gameConfig.screenW, gameConfig.screenH)
        this.player.draw(this.c);
        this.weapon.forEach(weapon => {
            weapon.draw(this.c)
        });

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
