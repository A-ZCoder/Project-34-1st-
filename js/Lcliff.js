class Lcliff {
    constructor(x,y,width,height) {
        var L_options={
            isStatic : true
        }

        this.body = Bodies.rectangle(x,y,width,height,L_options)

        this.width = width;
        this.height = height;
        this.image = loadImage("./assets/leftcliff.png");


        World.add(world, this.body)
    }

    display() {
        var pos = this.body.position;
        push()
        translate(pos.x, pos.y)
        imageMode(CENTER)
        image(this.image, 0, 0, this.width, this.height);
        pop()
    }
}




