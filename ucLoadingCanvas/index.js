/*loading canvas动画*/
var canvas = document.getElementById("canvasLoading");
var ctx = canvas.getContext("2d");
var image = document.getElementById("ucLogo");
/*logo constructor*/
function logo(img,dx,dy,dwidth,dheight,sx,sy,swidth,sheight,scaleX,scaleY){
  this.init(img,dx,dy,dwidth,dheight,sx,sy,swidth,sheight,scaleX,scaleY);
}
logo.prototype = {
  init:function(img,dx,dy,dwidth,dheight,sx,sy,swidth,sheight,scaleX,scaleY){
    this.img = img;
    this.dx = dx;
    this.dy = dy;
    this.dwidth = dwidth;
    this.dheight = dheight;
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.scaleX = scaleX || 1;
    this.scaleY = scaleY || 1;
  },
  setImg:function(img){
    this.img = img;
  },
  setdxy:function(dx,dy){
    this.dx = dx;
    this.dy = dy;
  },
  setsxy:function(sx,sy){
    this.sx = sx;
    this.sy = sy;
  },
  setdwh:function(dwidth,dheight){
    this.dwidth = dwidth;
    this.dheight = dheight;
  },
  setswh:function(swidth,sheight){
    this.swidth = swidth;
    this.sheight = sheight;
  },
  setScale:function(scaleX,scaleY){
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  },
  paint:function(){
    ctx.save();
    ctx.translate(this.sx+this.img.width/2,this.sy+this.img.height);
    ctx.scale(this.scaleX,this.scaleY);
    ctx.drawImage(this.img,this.dx,this.dy,this.dwidth,this.dheight,-this.img.width/2,-this.img.height,this.swidth,this.sheight);
    ctx.restore();
  }
}

/*line constructor*/
function line(spx, spy, cpx, cpy, epx, epy) {
  this.init(spx, spy, cpx, cpy, epx, epy);
}

line.prototype = {
  init: function(spx, spy, cpx, cpy, epx, epy) {
    this.spx = spx;
    this.spy = spy;
    this.cpx = cpx;
    this.cpy = cpy;
    this.epx = epx;
    this.epy = epy;
  },
  setControls:function(cpx,cpy){
    this.cpx = cpx;
    this.cpy = cpy;
  },
  stroke: function() {
    ctx.beginPath();
    ctx.strokeStyle = "#FF6600";
    ctx.moveTo(this.spx, this.spy);
    ctx.quadraticCurveTo(this.cpx, this.cpy, this.epx, this.epy);
    ctx.stroke();
  }
};

var lineControls = [];
lineControls[0] = {'x':200,'y':300};
lineControls[1] = {'x':200,'y':380};
lineControls[2] = {'x':200,'y':420};
lineControls[3] = {'x':200,'y':460};
lineControls[4] = {'x':200,'y':500};
lineControls[5] = {'x':200,'y':540};
lineControls[6] = {'x':200,'y':580};
lineControls[7] = {'x':200,'y':615};
lineControls[8] = {'x':200,'y':630};
lineControls[9] = {'x':200,'y':638};
lineControls[10] = {'x':200,'y':645};
lineControls[11] = {'x':200,'y':648};
lineControls[12] = {'x':200,'y':651};
lineControls[13] = {'x':200,'y':510};
lineControls[14] = {'x':200,'y':455};
lineControls[15] = {'x':200,'y':410};
lineControls[16] = {'x':200,'y':290};
lineControls[17] = {'x':200,'y':200};
lineControls[18] = {'x':200,'y':230};
lineControls[19] = {'x':200,'y':370};
lineControls[20] = {'x':200,'y':390};
lineControls[21] = {'x':200,'y':330};

var logoLocate = [];
logoLocate[0] = {'x':156,'y':200,'scaleX':1,'scaleY':1};
logoLocate[1] = {'x':156,'y':280,'scaleX':0.9,'scaleY':1.1};
logoLocate[2] = {'x':156,'y':300,'scaleX':1,'scaleY':1};
logoLocate[3] = {'x':156,'y':320,'scaleX':1.1,'scaleY':0.9};
logoLocate[4] = {'x':156,'y':340,'scaleX':1.1,'scaleY':0.9};
logoLocate[5] = {'x':156,'y':363,'scaleX':1.2,'scaleY':0.8};
logoLocate[6] = {'x':156,'y':383,'scaleX':1.2,'scaleY':0.8};
logoLocate[7] = {'x':156,'y':398,'scaleX':1.2,'scaleY':0.8};
logoLocate[8] = {'x':156,'y':408,'scaleX':1.3,'scaleY':0.7};
logoLocate[9] = {'x':156,'y':411,'scaleX':1.3,'scaleY':0.7};
logoLocate[10] = {'x':156,'y':413,'scaleX':1.3,'scaleY':0.7};
logoLocate[11] = {'x':156,'y':415,'scaleX':1.4,'scaleY':0.6};
logoLocate[12] = {'x':156,'y':417,'scaleX':1.4,'scaleY':0.6};
logoLocate[13] = {'x':156,'y':300,'scaleX':1.1,'scaleY':0.9};
logoLocate[14] = {'x':156,'y':240,'scaleX':1.1,'scaleY':0.9};
logoLocate[15] = {'x':156,'y':180,'scaleX':0.8,'scaleY':1.2};
logoLocate[16] = {'x':156,'y':130,'scaleX':0.7,'scaleY':1.3};
logoLocate[17] = {'x':156,'y':85,'scaleX':0.8,'scaleY':1.2};
logoLocate[18] = {'x':156,'y':70,'scaleX':0.8,'scaleY':1.2};
logoLocate[19] = {'x':156,'y':58,'scaleX':0.9,'scaleY':1.1};
logoLocate[20] = {'x':156,'y':43,'scaleX':0.9,'scaleY':1.1};
logoLocate[21] = {'x':156,'y':45,'scaleX':1,'scaleY':1};

var rope = new line(0,300,200,300,400,300);
var ucLogo = new logo(image,0,0,98,66,156,200,88,60);

var i = 0;
function toggle(){
  if(i > 20){
    i = 0;
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ucLogo.setsxy(logoLocate[i].x,logoLocate[i].y);
  ucLogo.setScale(logoLocate[i].scaleX,logoLocate[i].scaleY);
  ucLogo.paint();
  rope.setControls(lineControls[i].x,lineControls[i].y);
  rope.stroke();
  i++;
}
window.TOGGLELOADING = setInterval(toggle,60);
