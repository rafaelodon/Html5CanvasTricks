	/**
	 * SoftMotionTween
	 *
	 * This class can be used to move from a initial to a final
	 * position (x,y), obtaining a smooth accelerated movement
	 * based on two parts: first the object accelerates to the
	 * half of the path, then it de-accelerate until stop in
	 * the final position.
	 * 
	 * Usage:
	 * 	var myTween = new SoftMotionTween();
	 * 	myTween.start(0,0,200,200); //moves from 0,0 to 200,200
	 * 	while(myTween.isMoving){
	 * 		myTween.nextFrame();
	 * 		myX = myTween.x;
	 * 		myY = myTween.y;
	 * 	}
	 *
	 * @author odon.rafael@gmail.com
	 * @date 2011-07-10
	 */
	function SoftMotionTween() {

		this.isMoving = false;

		// current position
		this.x;
		this.y;

		// initial position 
		var x0, y0;

		// final position
		var xl, yl;

		// current time (in frames)
		var t=0;

		// final time (in frames)
		var tf;

		// partial final time
		var tf2;

		// initial velocity
		var v0x, v0y;

		// current velocity
		var vx, vy;

		// acceleration
		var ax, ay;

		this.start = function (initialX, initialY, finalX, finalY, timeInFrames){

			// copy the duration time from the parameters
			tf=timeInFrames;
			tf2=parseInt(tf/2);

			// copy the initial position from the parameters
			x0 = initialX;
			y0 = initialY;

			// copy the final position from the parameters values
			xl = finalX;
			yl = finalY;

			// the initial velocity is always zero
			v0x = 0;
			v0y = 0;

			// the current velocity is the initial velocity
			vx = v0x;
			vy = v0y;

			// the movement starts in time zero
			t = 0;

			// calculate the acceleration needed to reach the
			// final position in the specified time
			var xl2 = parseInt(x0+(xl-x0)/2);
			var yl2 = parseInt(y0+(yl-y0)/2);
			var dx = xl2-x0;
			var dy = yl2-y0;
			var vfx = (2*dx-v0x*tf2)/tf2;
			var vfy = (2*dy-v0y*tf2)/tf2;
			ax = (vfx-v0x)/(tf2);
			ay = (vfy-v0y)/(tf2);

			// and the magic starts...
			this.isMoving = true;
		}

		this.stop = function (){
			this.isMoving = false;
		}

		this.nextFrame = function (){

			if(this.isMoving){
				t++;
				// the first part of movement is positively accelerated
				if(t<=tf2){
					// calculate current position according to the "famous" equation	
					this.x = x0 + v0x*t + (ax*t*t)/2;
					this.y = y0 + v0y*t + (ay*t*t)/2;

					// calculate velocity at the current time
					vx = v0x + ax*t;
					vy = v0y + ay*t;

					// check if the movement is over
					if(t==tf2 && vx == 0 && vy == 0){
						this.isMoving=false;
					}
				}else{
					// the second part of movement is negatively accelerated
					t = 0;
					x0 = this.x;
					y0 = this.y;
					v0x = vx;
					v0y = vy;
					ax=(0-v0x)/(tf2);
					ay=(0-v0y)/(tf2);
				}
			}
		}
	}
