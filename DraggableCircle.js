/**
 * DraggableCircle
 *
 * Draws a circle on a HTML5 canvas, and provide
 * ways to allow the user to drag this circle.
 *
 * @author odon.rafael@gmail.com
 * @date 2011-07-05
 */
function DraggableCircle(initX, initY){

	var COLOR_NORMAL_LIGHT = "#00BB00";
	var COLOR_NORMAL_DARK = "#007700";
	var COLOR_HOVER = "#00DD00";

	this.x = initX;
	this.y = initY;

	this.color = COLOR_NORMAL_DARK;
	this.isDragging = false;
	this.isOver = false;
	this.radius = 30;

	this.draw = function(context){
		
		if(this.isOver){
			this.color = COLOR_HOVER;
		}else{
			this.color = COLOR_NORMAL_DARK;
		}
		context.strokeStyle = this.color;
		context.fillStyle = this.color;
			
		if(this.isDragging){
			context.shadowColor = "#888";
			context.shadowBlur = 6;
			context.shadowOffsetX = -3;
			context.shadowOffsetY = 3;
		}
		context.beginPath();
		context.arc(this.x, this.y, this.radius-1, 0, Math.PI*2, false);
		context.closePath();
		context.stroke();
		context.fill();

		resetShadow(context);

		if(!this.isOver){
			var grd = context.createRadialGradient(this.x-this.radius/3, this.y-this.radius/3, 5, this.x, this.y, this.radius);
			grd.addColorStop(0, COLOR_NORMAL_LIGHT);
			grd.addColorStop(1, COLOR_NORMAL_DARK);
			context.fillStyle = grd;
	
			context.beginPath();
			context.arc(this.x, this.y, this.radius-1, 0, Math.PI*2, false);
			context.closePath();
			context.stroke();
			context.fill();
		}
	}

	this.mouseMove = function(x,y){
	
		this.isOver = this.isPointInside(x,y);				
		if(this.isDragging){
			this.setPosition(x,y);
		}
	}

	this.startDrag = function (){
		this.isDragging = true;
		this.x += 5;
		this.y -= 5;
	}				

	this.stopDrag = function (){
		this.isDragging = false;
		this.x -= 5;
		this.y += 5;
	}				

	this.isPointInside = function (x, y){

		var dx = this.x-x;
		var dy = this.y-y;
		var dist = Math.sqrt(dx*dx + dy*dy);
		return dist <= this.radius;
	}

	this.setPosition = function(pX, pY){

		this.x = pX;
		this.y = pY;
	}

	function resetShadow(context){
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 0;
	}

}
