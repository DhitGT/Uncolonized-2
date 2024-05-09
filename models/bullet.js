class Bullet {
    constructor(x, y, speed, directionX, directionY, lifetime) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;
        this.lifetime = lifetime; // Lifetime of the bullet in milliseconds
    }

    update() {
        // Update bullet position based on direction and speed
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;

        // Decrement lifetime
        this.lifetime -= 1;
    }

    // Check if the bullet is alive
    isAlive() {
        return this.lifetime > 0;
    }

    draw(ctx) {
        // Draw the bullet
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, 5, 5); // Adjust size as needed
    }
}

export default Bullet;
