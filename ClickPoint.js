/** 
 * ClickPoint
 *
 * When you click inside a canvas it draws a 
 * radial gardient circle that gets smaller 
 * until it desappear, creating a nice fx to 
 * demonstrate where you clicked.
 *
 * @author odon.rafael@gmail.com
 * @date 2011-07-19
 */
function ClickPoint(initColor, initFrames, initRadius){

	var COLOR_IN = initColor;
	var COLOR_OUT = "transparent";
	var FRAMES = initFrames;
	var RADIUS = initRadius;

	this.x = 0;
	this.y = 0;

	this.currentRadius = RADIUS;

	this.currentFrame = FRAMES;

	this.isVisible = false;

	this.draw = function(context){
		
		if(this.isVisible && this.currentFrame > 0){

			var grd = context.createRadialGradient(this.x, this.y, this.currentRadius/5, this.x, this.y, this.currentRadius);
			grd.addColorStop(0, COLOR_IN);
			grd.addColorStop(1, COLOR_OUT);
			context.fillStyle = grd;

			context.strokeStyle = "transparent";
		
			context.beginPath();
			context.arc(this.x, this.y, this.currentRadius, 0, Math.PI*2, false);
			context.closePath();
			context.stroke();
			context.fill();

			this.currentFrame--;

			this.currentRadius = this.currentRadius*(this.currentFrame/FRAMES);
		}else{
			this.isVisible = false;
		}
	}

	this.mousedown = function(x,y){
	
		this.isVisible = true;
		this.currentFrame = FRAMES;
		this.currentRadius = RADIUS;
		this.setPosition(x,y);
	}

	this.setPosition = function(pX, pY){

		this.x = pX;
		this.y = pY;
	}

}
