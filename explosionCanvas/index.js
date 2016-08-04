var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//angle converts to radians
function angleToRadians(angle) {
  return angle * Math.PI / 180
}

//x
function cosVal(radius, mul, radians = angleToRadians(360 / 7)) {
  return Math.round(radius * Math.cos(mul * radians));
}
//y
function sinVal(radius, mul, radians = angleToRadians(360 / 7)) {
  return Math.round(radius * Math.sin(mul * radians));
}


function circle(x,y,radius){
  this.init(x,y,radius);
}

circle.prototype = {
  init: function(x,y,radius){
    context.fillStyle = "yellow";
    context.arc(x,y,radius,0,Math.PI*2,false);
    context.fill();
    context.beginPath();
    context.fillStyle = "white";
    context.arc(x,y,radius-2,0,Math.PI*2,false);
    context.fill();
    this.x = x;
    this.y = y;
    this.radius = radius;
  },
  move:function(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  },
  draw:function(){
    context.beginPath();
    context.fillStyle = "yellow";
    context.arc(this.x,this.y,this.radius,0,Math.PI*2);
    context.fill();
    context.beginPath();
    context.fillStyle = "white";
    context.arc(this.x,this.y,this.radius-2,0,Math.PI*2);
    context.fill();
  }
}


var time = 0
function explosion(){
  if (time > 6){
    time  = 0;
  }             context.clearRect(0,0,canvas.width,canvas.height);
  for (var i = 0; i < 7; i++){
    tmp = circles[i].radius;
    circles[i].move(200 + cosVal(time * 20,i),150 + sinVal(time * 20,i),8-1*time);
    circles[i].draw();
  }
  time = time+ 0.1;
}

function init(){
  setInterval("explosion()",20);
}
  var circles = [];
  for (var i = 0; i < 7; i++){
    circles[i] = new circle(200,150,8);
  }
init();