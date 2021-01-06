var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword
var fruitGroup, fruit1, fruit2, fruit3, fruit4;

var enemyGroup, monster, moving, alien1, alien2;

var Over, gameOverImage;

var gameOverSound, knifeSound;

var score;

function preload(){
  
  swordImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
monsterImage = loadAnimation("alien1.png","alien2.png");
  
  OverImage = loadImage("gameover.png");
  
  gameOverSound = loadSound("mixkit-retro-arcade-game-over-470.wav");
  knifeSound = loadSound ("Swoosh 3-SoundBible.com-1573211927.mp3");
  
  
}


function setup(){

  sword = createSprite(40,200,20,20);
  sword.addImage("n",swordImage);
  sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}


function draw(){
  background("lightblue");
   
  if (gameState === PLAY){
    
  fruits();
  Enemy();
  
  sword.y = World.mouseY;
  sword.x = World.mouseX;
    
  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score = score + 2;
    knifeSound.play();

    
  }
 
  if (enemyGroup.isTouching(sword)){
    gameState = END;
    gameOverSound.play();
    score = 0;

  }
}
  
  else if (gameState === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);    
    sword.scale = 0;
    
    Over = createSprite (200,200,20,20);
    Over.addImage("Over",OverImage);
    Over.scale = 1.2;

    
  }
  
  drawSprites();
    text("Score: "+ score, 300,50);
  
}

function fruits (){
  
  if(World.frameCount%80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    
    r = Math.round(random(1,4));
    
    if (r == 1) {
      fruit.addImage(fruit1);
    }
    else if (r == 2){
      fruit.addImage(fruit2); 
    }
    else if (r == 3){
      fruit.addImage(fruit3);
    }
    else if  (r == 4){
      fruit.addImage(fruit4);

    }
    
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -(4+3*score%50);
    fruit.setlifetime = 100;
    
    fruitGroup.add(fruit);
  }
}


function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.y = Math.round(random(100,300));
    monster.addAnimation("moving",monsterImage);
    monster.velocityX = -(4+3*score%50);
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
    
  }
}