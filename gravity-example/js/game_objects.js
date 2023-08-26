 import { ctx } from "./main.js";


 function Ball(x, y, r, col) {
   this.x = x;
   this.y = y;
   this.r = r;
   this.col = col;
   this.vx = 3;
   this.vy = 4;
   this.gr = 0.2;
   this.xfriction = 0.99;
   this.yfriction = 0.99;
 
   this.centerX = function() {
     return this.x + (this.r / 2);
   };
   this.centerY = function() {
     return this.y + (this.r / 2);
   }
   this.halfWidth = function() {
     return this.r / 2;
   }
   this.halfHeight = function() {
     return this.r / 2;
   }
   this.draw = function() {
     ctx.fillStyle = this.col;
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
     ctx.closePath();
     ctx.fill();
   };

   this.update = function() {
     this.draw();
   };
 }

 function Rect(x, y, w, h, col) {
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.col = col;
   this.vx = 4;
   this.vy = 5;
   this.xfriction = 0.99;
   this.yfriction = 0.99;
 
   this.gr = 0.2;
   
   this.centerX = function() {
     return this.x + (this.w / 2);
   };
   this.centerY = function() {
     return this.y + (this.h / 2);
   }
   this.halfWidth = function() {
     return this.w / 2;
   }
   this.halfHeight = function() {
     return this.h / 2;
   }

   this.draw = function() {
     ctx.fillStyle = this.col;
     ctx.shadowColor = "rgba(0,0,0,0.2)";
     ctx.shadowXOffset = 2;
     ctx.shadowBlur = 2;
     ctx.fillRect(this.x, this.y, this.w, this.h);

   };

   this.update = function() {
     this.draw();
   };
 }

 function Text(text, font, x, y, col) {
   this.x = x;
   this.y = y;
   this.text = text;
   this.col = col;
   this.font = font;
   this.friction = 0.99;

   this.draw = function() {
     ctx.fillStyle = this.col;
     ctx.font = this.font;
     ctx.fillText(this.text, this.x, this.y);
   };

   this.update = function() {
     this.draw();
   };
 }

 export { Text, Rect, Ball };