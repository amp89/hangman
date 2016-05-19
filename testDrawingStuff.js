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
ctx.arc(200,100,25,0,2*Math.PI)
ctx.stroke();
};
// ctx.fillStyle = 'black';

// ctx.fill();
//2
var drawBody = function(){};
//3
var drawLeftArm = function(){};
//4
var drawRightArm = function(){};
//5
var drawLeftLeg = function(){};
//6
var drawRightLeg = function(){};
//7
var drawRightHand = function(){};
//8
var drawLeftHand = function(){};
//9
var drawRightFoot = function(){};
//10
var drawLeftFoot = function(){};
//11
var drawLeftEye = function(){};
//12
var drawRightEye = function(){};
//13
var drawMouth = function(){};

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
