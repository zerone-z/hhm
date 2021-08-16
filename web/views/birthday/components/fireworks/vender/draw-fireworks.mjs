const Path = "web/views/birthday/components/fireworks/vender/assets/"
function Fireworks(canvas) {
  this.canvas = canvas;
  this.pi=Math.PI;
  this.ctx=canvas.getContext("2d");
  this.canvas.width=canvas.clientWidth;
  this.canvas.height=canvas.clientHeight;
  this.cx=canvas.width/2;
  this.cy=canvas.height/2;
  this.playerZ=-25;
  this.playerX=this.playerY=this.playerVX=this.playerVY=this.playerVZ=this.pitch=this.yaw=this.pitchV=this.yawV=0;
  this.scale=600;
  this.seedTimer=0;
  this.seedInterval=5;
  this.seedLife=100;
  this.gravity=.02;
  this.seeds=new Array();
  this.sparkPics=new Array();
  this.s=window.location.href + Path;
  // this.s="https://cantelope.org/NYE/";
  for(let i=1;i<=10;++i){
    let sparkPic=new Image();
    sparkPic.src=this.s+"spark"+i+".png";
    this.sparkPics.push(sparkPic);
  }
  this.sparks=new Array();
  this.pow1=new Audio(this.s+"pow1.ogg");
  this.pow2=new Audio(this.s+"pow2.ogg");
  this.pow3=new Audio(this.s+"pow3.ogg");
  this.pow4=new Audio(this.s+"pow4.ogg");
  this.frames = 0;

  window.addEventListener("resize", ()=> {
    this.canvas.width=this.canvas.clientWidth;
    this.canvas.height=this.canvas.clientHeight;
    this.cx=this.canvas.width/2;
    this.cy=this.canvas.height/2;
  });
}
Fireworks.prototype = {
  rasterizePoint: function (x,y,z){
    var p,d;
    x-=this.playerX;
    y-=this.playerY;
    z-=this.playerZ;
    p=Math.atan2(x,z);
    d=Math.sqrt(x*x+z*z);
    x=Math.sin(p-this.yaw)*d;
    z=Math.cos(p-this.yaw)*d;
    p=Math.atan2(y,z);
    d=Math.sqrt(y*y+z*z);
    y=Math.sin(p-this.pitch)*d;
    z=Math.cos(p-this.pitch)*d;
    var rx1=-1000,ry1=1,rx2=1000,ry2=1,rx3=0,ry3=0,rx4=x,ry4=z,uc=(ry4-ry3)*(rx2-rx1)-(rx4-rx3)*(ry2-ry1);
    if(!uc) return {x:0,y:0,d:-1};
    var ua=((rx4-rx3)*(ry1-ry3)-(ry4-ry3)*(rx1-rx3))/uc;
    var ub=((rx2-rx1)*(ry1-ry3)-(ry2-ry1)*(rx1-rx3))/uc;
    if(!z)z=.000000001;
    if(ua>0&&ua<1&&ub>0&&ub<1){
      return {
        x:this.cx+(rx1+ua*(rx2-rx1))*this.scale,
        y:this.cy+y/z*this.scale,
        d:Math.sqrt(x*x+y*y+z*z)
      };
    }else{
      return {
        x:this.cx+(rx1+ua*(rx2-rx1))*this.scale,
        y:this.cy+y/z*this.scale,
        d:-1
      };
    }
  },
  spawnSeed: function(){
    let seed=new Object();
    seed.x=-50+Math.random()*100;
    seed.y=25;
    seed.z=-50+Math.random()*100;
    seed.vx=.1-Math.random()*.2;
    seed.vy=-1.5;//*(1+Math.random()/2);
    seed.vz=.1-Math.random()*.2;
    seed.born=this.frames;
    this.seeds.push(seed);
  },
  splode: function(x,y,z){
    let t=5+parseInt(Math.random()*150);
    let sparkV=1+Math.random()*2.5;
    let type=parseInt(Math.random()*3);
    let pic1, pic2, pic3;
    switch(type){
      case 0:
        pic1=parseInt(Math.random()*10);
        break;
      case 1:
        pic1=parseInt(Math.random()*10);
        do{ pic2=parseInt(Math.random()*10); }while(pic2==pic1);
        break;
      case 2:
        pic1=parseInt(Math.random()*10);
        do{ pic2=parseInt(Math.random()*10); }while(pic2==pic1);
        do{ pic3=parseInt(Math.random()*10); }while(pic3==pic1 || pic3==pic2);
        break;
    }
    for(let m=1;m<t;++m){
      let spark=new Object();
      spark.x=x; spark.y=y; spark.z=z;
      let p1=this.pi*2*Math.random();
      let p2=this.pi*Math.random();
      let v=sparkV*(1+Math.random()/6)
      spark.vx=Math.sin(p1)*Math.sin(p2)*v;
      spark.vz=Math.cos(p1)*Math.sin(p2)*v;
      spark.vy=Math.cos(p2)*v;
      switch(type){
        case 0: spark.img=this.sparkPics[pic1]; break;
        case 1:
          spark.img=this.sparkPics[parseInt(Math.random()*2)?pic1:pic2];
          break;
        case 2:
          switch(parseInt(Math.random()*3)){
            case 0: spark.img=this.sparkPics[pic1]; break;
            case 1: spark.img=this.sparkPics[pic2]; break;
            case 2: spark.img=this.sparkPics[pic3]; break;
          }
          break;
      }
      spark.radius=25+Math.random()*50;
      spark.alpha=1;
      spark.trail=new Array();
      this.sparks.push(spark);
    }
    let pow;
    switch(parseInt(Math.random()*4)){
      case 0: pow=new Audio(this.s+"pow1.ogg"); break;
      case 1: pow=new Audio(this.s+"pow2.ogg"); break;
      case 2: pow=new Audio(this.s+"pow3.ogg"); break;
      case 3: pow=new Audio(this.s+"pow4.ogg"); break;
    }
    let d=Math.sqrt((x-this.playerX)*(x-this.playerX)+(y-this.playerY)*(y-this.playerY)+(z-this.playerZ)*(z-this.playerZ));
    pow.volume=1.5/(1+d/10);
    pow.load()
    pow.play();
  },
  doLogic: function(){
    if(this.seedTimer<this.frames){
      this.seedTimer=this.frames+this.seedInterval*Math.random()*10;
      this.spawnSeed();
    }
    for(let i=0;i<this.seeds.length;++i){
      this.seeds[i].vy+=this.gravity;
      this.seeds[i].x+=this.seeds[i].vx;
      this.seeds[i].y+=this.seeds[i].vy;
      this.seeds[i].z+=this.seeds[i].vz;
      if(this.frames-this.seeds[i].born>this.seedLife){
        this.splode(this.seeds[i].x,this.seeds[i].y,this.seeds[i].z);
        this.seeds.splice(i,1);
      }
    }
    for(let i=0;i<this.sparks.length;++i){
      if(this.sparks[i].alpha>0 && this.sparks[i].radius>5){
        this.sparks[i].alpha-=.01;
        this.sparks[i].radius/=1.02;
        this.sparks[i].vy+=this.gravity;
        let point=new Object();
        point.x=this.sparks[i].x;
        point.y=this.sparks[i].y;
        point.z=this.sparks[i].z;
        if(this.sparks[i].trail.length){
          let x=this.sparks[i].trail[this.sparks[i].trail.length-1].x;
          let y=this.sparks[i].trail[this.sparks[i].trail.length-1].y;
          let z=this.sparks[i].trail[this.sparks[i].trail.length-1].z;
          let d=((point.x-x)*(point.x-x)+(point.y-y)*(point.y-y)+(point.z-z)*(point.z-z));
          if(d>9){
            this.sparks[i].trail.push(point);
          }
        }else{
          this.sparks[i].trail.push(point);
        }
        if(this.sparks[i].trail.length>5)this.sparks[i].trail.splice(0,1);        
        this.sparks[i].x+=this.sparks[i].vx;
        this.sparks[i].y+=this.sparks[i].vy;
        this.sparks[i].z+=this.sparks[i].vz;
        this.sparks[i].vx/=1.075;
        this.sparks[i].vy/=1.075;
        this.sparks[i].vz/=1.075;
      }else{
        this.sparks.splice(i,1);
      }
    }
    let p=Math.atan2(this.playerX,this.playerZ);
    let d=Math.sqrt(this.playerX*this.playerX+this.playerZ*this.playerZ);
    d+=Math.sin(this.frames/80)/1.25;
    let t=Math.sin(this.frames/200)/40;
    this.playerX=Math.sin(p+t)*d;
    this.playerZ=Math.cos(p+t)*d;
    this.yaw=this.pi+p+t;
  },
  draw: function(){
    this.ctx.clearRect(0,0,this.cx*2,this.cy*2);
    
    this.ctx.fillStyle="#ff8";
    for(let i=-100;i<100;i+=3){
      for(let j=-100;j<100;j+=4){
        let x=i;
        let z=j;
        let y=25;
        let point=this.rasterizePoint(x,y,z);
        if(point.d!=-1){
          let size=250/(1+point.d);
          let d = Math.sqrt(x * x + z * z);
          let a = 0.75 - Math.pow(d / 100, 6) * 0.75;
          if(a>0){
            this.ctx.globalAlpha = a;
            this.ctx.fillRect(point.x-size/2,point.y-size/2,size,size);        
          }
        }
      }
    }
    this.ctx.globalAlpha=1;
    for(let i=0;i<this.seeds.length;++i){
      let point=this.rasterizePoint(this.seeds[i].x,this.seeds[i].y,this.seeds[i].z);
      if(point.d!=-1){
        let size=200/(1+point.d);
        this.ctx.fillRect(point.x-size/2,point.y-size/2,size,size);
      }
    }
    let point1=new Object();
    for(let i=0;i<this.sparks.length;++i){
      let point=this.rasterizePoint(this.sparks[i].x,this.sparks[i].y,this.sparks[i].z);
      if(point.d!=-1){
        let size=this.sparks[i].radius*200/(1+point.d);
        if(this.sparks[i].alpha<0)this.sparks[i].alpha=0;
        if(this.sparks[i].trail.length){
          point1.x=point.x;
          point1.y=point.y;
          switch(this.sparks[i].img){
            case this.sparkPics[0]:this.ctx.strokeStyle="#f84";break;
            case this.sparkPics[1]:this.ctx.strokeStyle="#84f";break;
            case this.sparkPics[2]:this.ctx.strokeStyle="#8ff";break;
            case this.sparkPics[3]:this.ctx.strokeStyle="#fff";break;
            case this.sparkPics[4]:this.ctx.strokeStyle="#4f8";break;
            case this.sparkPics[5]:this.ctx.strokeStyle="#f44";break;
            case this.sparkPics[6]:this.ctx.strokeStyle="#f84";break;
            case this.sparkPics[7]:this.ctx.strokeStyle="#84f";break;
            case this.sparkPics[8]:this.ctx.strokeStyle="#fff";break;
            case this.sparkPics[9]:this.ctx.strokeStyle="#44f";break;
          }
          for(let j=this.sparks[i].trail.length-1;j>=0;--j){
            let point2=this.rasterizePoint(this.sparks[i].trail[j].x,this.sparks[i].trail[j].y,this.sparks[i].trail[j].z);
            if(point2.d!=-1){
              this.ctx.globalAlpha=j/this.sparks[i].trail.length*this.sparks[i].alpha/2;
              this.ctx.beginPath();
              this.ctx.moveTo(point1.x,point1.y);
              this.ctx.lineWidth=1+this.sparks[i].radius*10/(this.sparks[i].trail.length-j)/(1+point2.d);
              this.ctx.lineTo(point2.x,point2.y);
              this.ctx.stroke();
              point1.x=point2.x;
              point1.y=point2.y;
            }
          }
        }
        this.ctx.globalAlpha=this.sparks[i].alpha;
        this.ctx.drawImage(this.sparks[i].img,point.x-size/2,point.y-size/2,size,size);
      }
    }
  },
  frame: function(){
    if(this.frames>100000){
      this.seedTimer=0;
      this.frames=0;
    }
    this.frames++;
    this.draw();
    this.doLogic();
    
    this.lastTime = new Date().getTime();
    let animloop = () => {
      let currTime = new Date().getTime();
      if (currTime - this.lastTime > 60)  {
        this.frame();
      }
      window.requestAnimationFrame(animloop);
    }
    window.requestAnimationFrame(animloop)
  }
};

export default Fireworks;
