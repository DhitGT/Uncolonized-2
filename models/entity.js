class Entity {
    constructor(){
        this.x = 200;
        this.y = 200;
        this.w = 30;
        this.h = 30;
        this.color = 'black';
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    setScale(w,h){
        this.w = w;
        this.h = h;
    }
    setStyle(color){
        this.color = color
    }
}

export default Entity