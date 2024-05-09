class Movement {
    constructor() {
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.keyState = {}; // Track pressed keys
        this.speed = 5; // Set default speed
    }

    setDirection(xSpeed, ySpeed) {
        // Set the movement direction
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    updatePosition(x, y, speed) {
        this.speed = speed;
        // Calculate the length of the movement vector
        const length = Math.sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed);

        // If the length is greater than 0 (to avoid division by zero), normalize the vector
        if (length > 0) {
            const normalizedX = this.xSpeed / length;
            const normalizedY = this.ySpeed / length;

            // Update position based on normalized vector and speed
            const newX = x + (this.speed * normalizedX);
            const newY = y + (this.speed * normalizedY);
            return { x: newX, y: newY };
        } else {
            // If length is 0, no movement
            return { x, y };
        }
    }


    handleKeyDown(event) {
        // Set key state to true when key is pressed
        this.keyState[event.key] = true;
        this.handleKeys();
    }

    handleKeyUp(event) {
        // Set key state to false when key is released
        this.keyState[event.key] = false;
        this.handleKeys();
    }

    handleKeys() {
        // Handle movement based on pressed keys
        let xSpeed = 0;
        let ySpeed = 0;

        if (this.keyState['ArrowLeft'] || this.keyState['a']) {
            xSpeed -= 1;
        }
        if (this.keyState['ArrowRight'] || this.keyState['d']) {
            xSpeed += 1;
        }
        if (this.keyState['ArrowUp'] || this.keyState['w']) {
            ySpeed -= 1;
        }
        if (this.keyState['ArrowDown'] || this.keyState['s']) {
            ySpeed += 1;
        }

        // Update movement direction
        this.setDirection(xSpeed, ySpeed);
    }

}

export default Movement;
