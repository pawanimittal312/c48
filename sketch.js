var obstacle1,coin1,bird,mario;
var score=0;
var gameState='play';
function preload(){
  mario1=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png");
  groundImg=loadImage("bg2.png");
 bg1=loadImage("bg6.jpg");
 bg2=loadImage("bg4.jpg");
 bg3=loadImage("bg5.jpg");
 birdImg=loadAnimation("bird1(1).png","bird2.png","bird3.png","bird4.png","bird5.png");
 obstacle1Img=loadImage("brick7.jpg");
 obstacle2Img=loadImage("brick8.jpg");
 coinImg=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png");
 congrats=loadImage("congrats (1).png")
 pipeimg=loadImage("pipes.png");
 obstacle3Img=loadImage("qmark.png");
 gameOverImg=loadImage("game over.jpg");
 resetImg=loadImage("reset.png");
}
function setup() {
  createCanvas(1200,400);
  
 
  
  mario=createSprite(100,370,20,40);
  mario.addAnimation("marioRunning",mario1);
  
  ground=createSprite(280,440,2400,20);
  ground.addImage(groundImg);
  reset=createSprite(1100,350,30,30);
  reset.addImage(resetImg);
  invisible=createSprite(600,380,1200,10);
invisible.visible=false;

coin1g=createGroup();
coin2g= createGroup();
bricksGroup1=createGroup();
bricksGroup2=createGroup();
invisible1g=createGroup();
invisible2g=createGroup();
pipesGroup=createGroup();
obstacle3g=createGroup();
}

function draw() {
  background(bg1); 
  if(gameState==="play"){
  if(ground.x<250){
    ground.x=700
  }
  ground.velocityX=-(3+2*score/50);
  console.log(ground.x);
   if(keyDown("space")){
      mario.velocityY=-13;
     
   }
   mario.velocityY= mario.velocityY + 0.8;
   if(keyDown("left_arrow")){
    mario.x = mario.x - 3;
  }
  
  if(keyDown("right_arrow")){
    mario.x = mario.x + 3;
  }
   mario.collide(invisible);

   if(invisible1g.isTouching(mario) || invisible2g.isTouching(mario)){
    mario.velocityY = 0;
  }
  if(score>=200){
    background(bg2)
  }
  if(score>=400){
    background(bg3)
  }
  if(score>100 && score<150 || score> 250 && score< 300 || score> 395 && score< 450 || score> 500 && score< 550
    || score> 650 && score< 700){
    //image(congrats,500,100,300,150);
    textStyle(BOLDITALIC)
  fill("golden");
  textSize(25);
    text("Keep Going !!", 600,70);
  }
  
  // coins();
  mario.isTouching(coin1g,coinhit1);
  mario.isTouching(coin2g,coinhit2);
  if(obstacle3g.isTouching(mario)){
    obstacle3g.destroyEach();
    score=score+10;
  }

  if(pipesGroup.isTouching(mario)){
     // mario.destroy();
     gameState="end";
  }
  reset.visible=false;
  birds();
  obstacles();
  pipe();
  qmark();
  drawSprites();
  textStyle(BOLD)
  fill("brown")
  textSize(30)
  text("SCORE : " +score,1000,50);
}
if(gameState=='end'){
  background("lightblue");
  imageMode(CENTER);
 image(gameOverImg,600,200)
 image(resetImg,1100,350,30,30)
 //drawSprites();
 if(mousePressedOver(reset)){
   restart();

 }
 // text("Game Over",600,200)
 reset.visible=true;
}
}

function birds(){
  if(frameCount% 115===0){
    bird=createSprite(1200,Math.round(random(12,250)))
    bird.addAnimation("flying",birdImg);
    bird.velocityX=-6;
    bird.scale=0.5;
    bird.lifetime=500;
    bird.depth=mario.depth;
    mario.depth+=1
  }
}

function obstacles(){
 
if(frameCount% 250===0){
  obstacle1=createSprite(1200,Math.round(random(150,300)));
  obstacle1.velocityX=-(5+2*score/50);
  obstacle1.addImage(obstacle1Img);
  obstacle1.scale=0.6;
  obstacle1.lifetime=500;
  obstacle1.depth=mario.depth;
  mario.depth+=1
  bricksGroup1.add(obstacle1);
 for(var i=1260;i>1125;i=i-30){
  coin1=createSprite(i,obstacle1.y-50,20,20)
  coin1.velocityX=-(5+2*score/50);
  coin1.addAnimation("sparkling",coinImg)
  coin1.scale=0.4;
  coin1.lifetime=500;
  coin1g.add(coin1);
  invisible1= createSprite(obstacle1.x,obstacle1.y-25,245,2);
  invisible1.velocityX=obstacle1.velocityX;
  invisible1.lifetime=500;
 // invisible1.debug=true
  invisible1.visible=false;
  invisible1g.add(invisible1);

 
 
 }

 
    }
  
    if(frameCount% 150===0){
      obstacle2=createSprite(1200,Math.round(random(150,270)));
      obstacle2.velocityX=-(5+2*score/50);
      obstacle2.addImage(obstacle2Img);
      obstacle2.scale=0.6;
      obstacle2.depth=mario.depth;
      mario.depth+=1
      obstacle2.lifetime=500;
      bricksGroup2.add(obstacle2);
      coin2=createSprite(1200,obstacle2.y-50,20,20)
      coin2.velocityX=-(5+2*score/50);
      coin2.addAnimation("sparkling",coinImg)
      coin2.scale=0.4;
      coin2.lifetime=500;
      coin2g.add(coin2)
      invisible2= createSprite(obstacle2.x,obstacle2.y-25,50,2);
      invisible2.velocityX=obstacle2.velocityX;
      invisible2.lifetime=500;
    //  invisible2.debug=true
    invisible2.visible=false
      invisible2g.add(invisible2);
     
     } 
    
}


 function coinhit1(mario,coin1){
  coin1.destroy();
  score=score+5;
}
function coinhit2(mario,coin2){
  coin2.destroy();
  score=score+3;
}
function pipe(){
  if(frameCount % 300 === 0){
    pipes = createSprite(1200,340,10,10);
    pipes.addImage("pipes",pipeimg);
    pipes.velocityX = -(5+2*score/50);
    pipes.scale = 0.6;
    pipes.lifetime = 240;
    pipes.depth=ground.depth;
    ground.depth+=1;
    pipesGroup.add(pipes);
   
}
}
function qmark(){
if(frameCount% 500===0 ){
  obstacle3=createSprite(Math.round(random(200,1000)),180);
  
  obstacle3.addImage(obstacle3Img);
  obstacle3.scale=0.6;
  obstacle3.depth=mario.depth;
  mario.depth+=1
  obstacle3.lifetime=70;
  obstacle3g.add(obstacle3);
}
}

function restart(){
  gameState="play";
  score=0;

}