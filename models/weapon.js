import Bullet from "./bullet.js";
import Entity from "./entity.js";
import Player from "./player.js";

class Weapon extends Entity {
    constructor(playerX, playerY, fireRate, magAmmo, reloadDelay) {
        super();
        this.playerX = playerX;
        this.playerY = playerY;
        this.bullets = [];
        this.fireRate = fireRate; // Fire rate in milliseconds
        this.lastShotTime = 0;
        this.magAmmo = magAmmo;
        this.maxAmmo = magAmmo// Number of bullets in the magazine
        this.reloadDelay = reloadDelay; // Reload delay in milliseconds
        this.lastReloadTime = 0; // Initialize last reload time
        this.shootingInterval = null;
        this.reloading = false; // Track reloading state
        this.parent = null;
    }

    updatePlayerPosition(x, y) {
        this.playerX = x
        this.playerY = y
    }

    handleClickFire(event, canvas) {
        if (event.button === 0) { // Left mouse button

            let rect = canvas.getBoundingClientRect();

            // Initial shot
            let cursorX = event.clientX - rect.left;
            let cursorY = event.clientY - rect.top;
            this.shootToCursor(cursorX, cursorY, 10);

            // Function to handle mousemove event
            const handleMouseMove = (moveEvent) => {
                rect = canvas.getBoundingClientRect();
                cursorX = moveEvent.clientX - rect.left;
                cursorY = moveEvent.clientY - rect.top;
            };

            // Start shooting interval
            this.shootingInterval = setInterval(() => {
                // Shoot to updated cursor position
                this.shootToCursor(cursorX, cursorY, 10);
            }, this.fireRate);

            // Add mousemove event listener
            document.addEventListener('mousemove', handleMouseMove);

            // Remove mousemove event listener when mouse button is released
            const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mouseup', handleMouseUp);

        }
        if (event.button === 2) { // Right mouse button
            event.preventDefault(); // Prevent context menu
            this.handleReleaseFire(event); // Stop shooting mantap
            clearInterval(this.shootingInterval);
        }
    }

    handleReleaseFire(event) {
        if (event.button === 0) { // Left mouse button
            // Stop shooting interval
            clearInterval(this.shootingInterval);
        }
    }

    setParent(player) {
        this.parent = player
    }

    handleReload(event) {
        if (event.key === 'r' && !this.reloading && this.magAmmo < this.maxAmmo) {
            this.reloading = true; // Set reloading state to true
            setTimeout(() => {
                this.magAmmo = this.maxAmmo; // Refill ammo back to full
                this.reloading = false; // Reset reloading state
            }, this.reloadDelay);
        }
    }

    shootToCursor(cursorX, cursorY, speed) {
        const currentTime = Date.now();

        // Calculate direction towards cursor
        const directionX = cursorX - this.playerX;
        const directionY = cursorY - this.playerY;
        const distance = Math.sqrt(directionX * directionX + directionY * directionY);

        // Normalize direction
        const normalizedDirectionX = directionX / distance;
        const normalizedDirectionY = directionY / distance;

        // Create a new bullet with normalized direction
        if (this.magAmmo > 0) {
            const bullet = new Bullet(this.playerX, this.playerY, speed, normalizedDirectionX, normalizedDirectionY, 50);
            this.bullets.push(bullet);
            this.magAmmo--;
            this.lastShotTime = currentTime;
        }

        // Update last shot time and decrease magazine ammo count
    }

    update() {
        // Update all bullets
        this.bullets.forEach((bullet, index) => {
            bullet.update();
            if (!bullet.isAlive()) {
                this.bullets.splice(index, 1);
            }

        });

        if (this.parent != null) {
            this.updatePlayerPosition(this.parent.x, this.parent.y);
        }
    }

    draw(ctx) {
        // Draw all bullets
        this.bullets.forEach(bullet => {
            bullet.draw(ctx);
        });

        ctx.fillStyle = 'brown'
        ctx.fillRect(this.playerX, this.playerY, this.w, this.h);
    }
}

export default Weapon;
