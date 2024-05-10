import Entity from "./entity.js"
import Movement from "./movement.js"
import Weapon from "./weapon.js"
import gameConfig from "../config/gameConfig.js"

class Player extends Entity {
    constructor() {
        super();
        this.playerMovement = new Movement();
        // Bind event handlers
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        // this.handleFire = this.handleFire.bind(this);
        // this.handleReleaseFire = this.handleReleaseFire.bind(this);
        // this.handleReload = this.handleReload.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        // document.addEventListener('mousedown', this.handleFire);
        // document.addEventListener('mouseup', this.handleReleaseFire);
        // document.addEventListener('keydown', this.handleReload);
    }

    handleKeyDown(event) {

        this.playerMovement.handleKeyDown(event);
    }

    handleKeyUp(event) {

        this.playerMovement.handleKeyUp(event);
    }
    // handleFire(event) {

    //     this.playerWeapon.handleClickFire(event, gameConfig.canvas);
    // }
    // handleReleaseFire(event) {

    //     this.playerWeapon.handleReleaseFire(event);
    // }
    // handleReload(event) {

    //     this.playerWeapon.handleReload(event);
    // }

    update() {
        const { x, y } = this.playerMovement.updatePosition(this.x, this.y, this.speed);
        this.x = x;
        this.y = y;
        // this.playerWeapon.update();
        // this.playerWeapon.updatePlayerPosition(this.x, this.y);
    }

    draw(c) {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
        // this.playerWeapon.draw(c);
    }
}

export default Player;
