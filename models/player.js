import Entity from "./entity.js"
import Movement from "./movement.js"
class Player extends Entity {
    constructor() {
        super()
        this.playerMovement = new Movement()
        // Bind event handlers
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(event) {
        // Call Movement's handleKeyDown method
        this.playerMovement.handleKeyDown(event);
    }

    handleKeyUp(event) {
        // Call Movement's handleKeyUp method
        this.playerMovement.handleKeyUp(event);
    }

    update() {

        const { x, y } = this.playerMovement.updatePosition(this.x, this.y, 10)
        this.x = x;
        this.y = y;
    }

    draw(c) {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
        console.log()
    }
}

export default Player