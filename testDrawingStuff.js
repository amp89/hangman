// for test doc only
addEventListener('load',function(){
  drawAllTestDeleteThis();
  console.log('testDrawingStuff.js loaded');
});
// end for test doc only

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var setCanvasAndContext = function(){
  //clear
  //draw noose
  ctx.clearRect(0,0,400,400);
  ctx.fillStyle = "grey";
  ctx.strokeRect(20,20,20,20);

};

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
ctx.strokeStyle = 'black';
// ctx.fillStyle = 'black';
ctx.arc(200,115,40,0,2*Math.PI)
ctx.stroke();
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
  var x = (270 + 7.07106781187);
  var y = (160 - 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
};
//8
var drawLeftHand = function(){
  ctx.beginPath();
  var x = (130 - 7.07106781187);
  var y = (160 - 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
};
//9
var drawRightFoot = function(){
  ctx.beginPath();
  var x = (250 + 7.07106781187);
  var y = (330 + 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
};
//10
var drawLeftFoot = function(){
  ctx.beginPath();
  var x = (150 - 7.07106781187);
  var y = (330 + 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
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
  drawNoose();
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
