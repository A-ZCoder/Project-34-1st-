class Rock {
    constructor(x, y, width, height) {
        var rock_options={
            restitution : 0.2,
            density : 0.0002
        }

    this.body = Bodies.rectangle(x,y,width,height,rock_options)  
    this.width = width
    this.height = height
    this.image = loadImage("./assets/rock.png")
    World.add(world, this.body)
    }

    display() {
    let pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.width, this.height);
    pop();
    }
}
















