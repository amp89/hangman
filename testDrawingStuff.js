// for test doc only
addEventListener('load',function(){
  drawAllTestDeleteThis();
  console.log('testDrawingStuff.js loaded');
});
// end for test doc only

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var drawOnCanvas = function(failNumber){
  switch (failNumber) {
    case 1:drawHead:break;
    case 2:drawHead:break;
    case 3:drawHead:break;
    case 4:drawHead:break;
    case 5:drawHead:break;
    case 6:drawHead:break;
    case 7:drawHead:break;
    case 8:drawHead:break;
    case 9:drawHead:break;
    case 10:drawHead:break;
    case 11:drawHead:break;
    case 12:drawHead:break;
    case 13:drawHead:break;

    default:

  }
}

var setCanvasAndContext = function(){
  ctx.clearRect(0,0,400,400);
  drawSun();
  drawTree(20,175);
  drawTree(40,250);
  drawTree(-10,320);
  drawTree(70,300);
  drawTree(240,175);
  drawTree(250,300);
  drawTree(120,350);
  drawTree(160,325);
  drawTree(315,300);





  drawNoose();

};

var drawSun = function(){
  ctx.beginPath();
  var x = 50;
  var y = 50;
  ctx.arc(x,y,40,0,2*Math.PI);
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'black';
  ctx.fill();
  // ctx.stroke();
  //make sure it goes back to black
  ctx.fillStyle = 'black';
};

var drawTree = function(x,y){
  console.log("drawing tree")
  ctx.beginPath();
  var x = x;
  ctx.moveTo(x,375);
  ctx.lineTo(x+(y/6),(375-y));
  ctx.lineTo(x+y/3,375);


  ctx.fillStyle = "rgb(150,225,150)";
  ctx.strokeStyle = "rgb(0,50,0)";
  // ctx.fill()
  // ctx.stroke();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
}

var drawNoose = function(){
  ctx.beginPath()
  ctx.moveTo(200,75);
  ctx.lineTo(200,25);
  ctx.lineTo(350,25);
  ctx.lineTo(350,375);
  ctx.stroke();
  ctx.moveTo(0,375);
  ctx.lineTo(400,375);
  ctx.stroke();
}

//1
var drawHead = function(){
  console.log('drawing head');
ctx.beginPath();
ctx.fillStyle = 'white';
ctx.strokeStyle = 'black';
// ctx.fillStyle = 'black';
ctx.arc(200,115,40,0,2*Math.PI)
ctx.stroke();
ctx.fill();
};
// ctx.fillStyle = 'black';

// ctx.fill();
//2
var drawBody = function(){
  ctx.beginPath();
  ctx.moveTo(200,155);
  ctx.lineTo(200,260);
  ctx.stroke();
};
//3
var drawLeftArm = function(){
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(130,160);
  ctx.stroke();
};
//4
var drawRightArm = function(){
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(270,160);
  ctx.stroke();
};
//5
var drawLeftLeg = function(){
  console.log('left leg');
  ctx.beginPath();
  ctx.moveTo(200,260);
  ctx.lineTo(150,330);
  ctx.stroke();
};
//6
var drawRightLeg = function(){
  console.log('left leg');
  ctx.beginPath();
  ctx.moveTo(200,260);
  ctx.lineTo(250,330);
  ctx.stroke();
};
//7
var drawRightHand = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (270 + 7.07106781187);
  var y = (160 - 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//8
var drawLeftHand = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (130 - 7.07106781187);
  var y = (160 - 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//9
var drawRightFoot = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (250 + 7.07106781187);
  var y = (330 + 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//10
var drawLeftFoot = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (150 - 7.07106781187);
  var y = (330 + 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//11
var drawLeftEye = function(){
  ctx.beginPath();
  var x = (190);
  var y = (105);
  ctx.arc(x,y,8,0,2*Math.PI);
  ctx.stroke();
};
//12
var drawRightEye = function(){
  ctx.beginPath();
  var x = (210);
  var y = (105);
  ctx.arc(x,y,8,0,2*Math.PI);
  ctx.stroke();
};
//13
var drawMouth = function(){
  ctx.beginPath();
  var x = (200);
  var y = (130);
  ctx.arc(x,y,8,0,Math.PI,true);
  ctx.stroke();
};

var drawAllTestDeleteThis = function(){
  setCanvasAndContext();

  drawHead();
  drawBody();
  drawLeftArm();
  drawRightArm();
  drawLeftLeg();
  drawRightLeg();
  drawRightHand();
  drawLeftHand();
  drawRightFoot();
  drawLeftFoot();
  drawLeftEye();
  drawRightEye();
  drawMouth();




};
