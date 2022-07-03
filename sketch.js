const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var backgroundImg, leftcliffImg, rightcliffImg, rockImg;

var leftcliff, rightcliff, rope;
var jointPoint, jointLink;
var lever;
var rockImg
var rocks = []

var ground;

var zomb1, zomb2,zomb3,zomb4;
var zomb1Img, zomb2Img, zomb3Img, zomb4Img;
var zombGroup, zambGroup;

var leverSound;

function preload() {
backgroundImg = loadImage("./assets/forest.jpg");
rockImg = loadImage("./assets/rock.png");
leverSound = loadSound("./assets/leverSound.mp3");
zomb1Img = loadImage("./assets/zomb1.png");
zomb2Img = loadImage("./assets/zomb1.png");
zomb3Img = loadImage("./assets/zomb2.png");
zomb4Img = loadImage("./assets/zomb2.png");
}


function setup() {
createCanvas(windowWidth-5, windowHeight-5)
engine = Engine.create()
world = engine.world

zombGroup = new Group()
zambGroup = new Group()

var options={
  isStatic : true
}

ground = Bodies.rectangle(-5,640, 2000,10, options)
World.add(world, ground)

leftcliff = new Lcliff(width/2-607, height/2, 220,200)
rightcliff = new Rcliff(width/2+695, height/2-75, 350,275)

var lever = createImg("./assets/lever.png")
lever.position(20, 180)
lever.size(100,100)
lever.mouseClicked(buttonPress)



rope = new Rope(30, {x : width/2-680, y : height/2-60})
jointPoint = new Lcliff(width/2-607, height/2, 50,50)
jointPoint = new Rcliff(width/2+655, height/2-80, 50,50)
Matter.Composite.add(rope.body, jointPoint)
jointLink = new Link(rope, jointPoint)


for (var i = 0; i <= 5; i++) {
    var x = random(width / 2 - 250, width / 2 + 250);
    var y = random(-10, 140);
    var rock = new Rock(x, y, 120, 120);
    rocks.push(rock);
  }

zomb1 = createSprite(width/2, height/2+210, 50,50)
zomb1.addImage(zomb1Img)
zomb1.scale = 0.45
zomb1.velocityX = 5
zomb2 = createSprite(width/2-50, height/2+210, 50,50)
zomb2.addImage(zomb2Img)
zomb2.scale = 0.45
zomb2.velocityX = 4
zomb3 = createSprite(width/2+50, height/2+210, 50,50)
zomb3.addImage(zomb3Img)
zomb3.scale = 0.15
zomb3.velocityX = 6
zomb4 = createSprite(width/2, height/2+210, 50,50)
zomb4.addImage(zomb4Img)
zomb4.scale = 0.15
zomb4.velocityX = 3

zombGroup.add(zomb1, zomb2, zomb3, zomb4)
}


function draw() {
background(backgroundImg)

Engine.update(engine)
leftcliff.display()
rightcliff.display()
rope.display()

if(zomb1.x > 1200) {
  zomb1.mirrorX(-1)
  zomb1.velocityX = -4
}

if(zomb2.x > 1200) {
  zomb2.mirrorX(-1)
  zomb2.velocityX = -6
}

if(zomb3.x > 1200) {
  zomb3.mirrorX(-1)
  zomb3.velocityX = -5
}

if(zomb4.x > 1200) {
  zomb4.mirrorX(-1)
  zomb4.velocityX = -3
}

//gap

if(zomb1.x < 5) {
  zomb1.mirrorX(1)
  zomb1.velocityX = 5
}

if(zomb2.x < 5) {
  zomb2.mirrorX(1)
  zomb2.velocityX = 4
}

if(zomb3.x < 5) {
  zomb3.mirrorX(1)
  zomb3.velocityX = 6
}

if(zomb4.x < 5) {
  zomb4.mirrorX(1)
  zomb4.velocityX = 3
}
for (var rock of rocks) {
    rock.display();
    var pos = rock.body.position;

    var distance = dist(zomb1.position.x, zomb1.position.y, pos.x, pos.y)

    if (distance <= 50) {
      zomb1.velocityX = 0
      zomb2.velocityX = 0
      zomb3.velocityX = 0
      zomb4.velocityX = 0

      Matter.Body.setVelocity(rock.body, { x: 10, y: -10 });
      zomb1.velocityY = -7
      zomb1.velocityX = -8

      zomb2.velocityY = -8
      zomb2.velocityX = 10

      zomb3.velocityY = -8
      zomb3.velocityX = -5

      zomb4.velocityY = -6
      zomb4.velocityX = -15
      collided = true;
    }
  }


  rect(ground.position.x, ground.position.y, 2000,10)

drawSprites()
}



function buttonPress() {
jointLink.dettach()
leverSound.play()
setTimeout(()=> {
  rope.break()
},8500);
}



