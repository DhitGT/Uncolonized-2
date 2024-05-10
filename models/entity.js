class Entity {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.w = 30;
        this.h = 30;
        this.speed = 3;
        this.color = 'black';
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setScale(w, h) {
        this.w = w;
        this.h = h;
    }
    setAppearance(color, speed) {
        this.color = color
        this.speed = speed
    }
    
    isColliding(entityA, entityB) {
    return (
        entityA.x < entityB.x + entityB.w &&
        entityA.x + entityA.w > entityB.x &&
        entityA.y < entityB.y + entityB.h &&
        entityA.y + entityA.h > entityB.y
    );
}

}

export default Entity