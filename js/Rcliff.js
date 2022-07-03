class Rcliff {
    constructor(x,y,width,height) {
        var R_options={
            isStatic : true
        }

        this.body = Bodies.rectangle(x,y,width,height,R_options)

        this.width = width;
        this.height = height;
        this.image = loadImage("./assets/rightcliff.png");


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
