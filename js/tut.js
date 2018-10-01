///////////////////////////////////////////////////////////////////

let direction = {
	left: false,
	right: false,
	up: false,
	down: false,
	collisionHorizontal: false,
	colisionUp: false,
	colisionDown: false
}


let fireCounter = 0;

let gravity = 3;

///////////////////////////////////////////////////////////////////
const movingLeft = () =>{
	console.log("moving left");
};


const movingUp = () =>{
	console.log("moving up");
};


const movingRight = () =>{
	console.log("moving right");
};


const movingDown = () =>{
	console.log("moving down");
};
///////////////////////////////////////////////////////////////////

const fire = () => {
  if (fireCounter === 0) {
  	console.log('Pew!')
  	fireCounter++;
  }
  else if (fireCounter <= 4){
  	let firing = setTimeout(()=>{
  		console.log('Pew!')
  		fireCounter++;

  		
  	}, 1500)
  }
}
///////////////////////////////////////////////////////////////////


let canvas = document.getElementById('canvas');
const resizer = () =>{
	canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


}
let c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", resizer)
////////////////////////////////////////////////////////////////////////////////
class Ground{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	theGround(groundx, groundy) {
		c.beginPath();
		c.moveTo(0, tutG.y);
		c.lineTo(groundx, groundy);
		c.strokeStyle = "blue";
		c.stroke();
	}
}



////////////////////////////////////////////////////////////////////////////////
class Block {
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.left = x;
		this.right = x + width;
		this.top = height;

	}
	theEnemies(abx, aby, abw, abh) {
		c.fillStyle = '#FF0000';
		c.fillRect(abx, aby, abw, abh);
	}
	moving() {

		if (direction.right == true && direction.up == true && xDistance < 0) {
			this.x-= first.dx;
			//tutG.x-= first.dx;
			this.y += 3;
			//tutG.y += 3;
		}
		else if (direction.right == true && xDistance < 0) {
			this.x -= first.dx;
			//tutG.x += first.dx;
		}
		else if (direction.right == true && xDistance <= 0) {
			this.x += 0;
			if(direction.right == true && yDistance < 0){
				this.x += first.dx;
			}
			//tutG.x += first.dx;
		}

		else if (direction.right && direction.up == false && this.y < 390 - 80) {
			if (this.x > 76) {
				this.x--;
			//	tutG.x++;
				this.y -= gravity;
			//	tutG.y -= gravity * 2;
			}
		}
		else if (direction.left == true) {
			this.x += first.dx;
			//tutG.x += first.dx;
		}
		else if (direction.down == true) {
			this.y--;
			//tutG.y--;
		}
		else if (direction.up == true) {
			this.y += 3;
		//	tutG.y += 3;
		}
		// if(xDistance == 0 && yDistance> 0){
		// 	this.x -= first.dx;
		// 	tutG.x += first.dx;
		// }

		else {
			// aBlock.y-= gravity;
			if (this.y > 390 - 38) {
				this.y -= gravity;
				this.y -= gravity;
			}
			this.x += 0;
		//	tutG.x += 0;
		}
	}
}



////////////////////////////////////////////////////////////////////////////////


class ThePlayer {
	constructor(x, y, width, height, dx, dy, health, ammo, win){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.dx = dx;
		this.dy = dy;
		this.health = health;
		this.jump = false;
		this.ammo = ammo;
		this.win = win;
	}

 //visual player
  thePlayer (firstx,firsty,firstW , firstH){
c.fillStyle = '#00FF0F';
c.fillRect(firstx, firsty, firstW, firstH)
 
     }
}

	let first;
	let aBlock;
	let a2Block;
	let tutG;
	let allEnemies = [];
	const init  = () => {
	    first = new ThePlayer(75,310,40,80,5,3,3,3,false);
		aBlock = new Block(400, 350, 40, 40);
		a2Block = new Block(600, 350, 40, 40);
        tutG = new Ground(window.innerWidth, 390);
		allEnemies.push(aBlock)
		allEnemies.push(a2Block)
		//first.moving();

	}

//////////////////////////////////////////////////////////////////////////////////
let yDistance;
let xDistance;
let getDistance = (x1, y1, x2, y2) => {
	xDistance = (x1 + 40) - x2;
	yDistance = (y1 + 80) - y2;

    let total = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    console.log(yDistance);

}

///////////////////////////////////////////////////////////////////////////////
	const animation = () =>{
		requestAnimationFrame(animation);
	   c.clearRect(0, 0, innerWidth, innerHeight);
	    first.thePlayer(first.x,first.y,first.width,first.height);
	   aBlock.theEnemies(aBlock.x, aBlock.y, aBlock.width, aBlock.height);
		a2Block.theEnemies(a2Block.x, a2Block.y, a2Block.width, a2Block.height);
		tutG.theGround(tutG.x,tutG.y);
		aBlock.moving();
		a2Block.moving();
	//	first.moving();
	     for(let i = 0; i < allEnemies.length; i++){
			 if(allEnemies[i].x + first.width + 1 < first.x){
			   getDistance(first.x, first.y, allEnemies[i].x, allEnemies[i].y);

			 }
             else{
		       getDistance(first.x, first.y,allEnemies[i].x,allEnemies[i].y);
		       i++;
			 }
		 }
	}
init();
animation();





//i did it



////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

// the funcion callbacks based on which key codes are pressed
$(document).on("keydown", (e) =>{
	if (event.keyCode == 39) {
		direction.right = true;
		movingRight();
	}
	else if (event.keyCode == 38) {
		direction.up = true;
		movingUp();
	}
	else if (event.keyCode == 37) {
		direction.left = true;
		movingLeft();
	}
	else if (event.keyCode == 40) {
		direction.down = true;
		movingDown();
	}
// the function call that fires bullets
	else if(event.keyCode == 32){
		fire();
		
	}
}).on("keyup", (e)=>{

	//resets direction object
 if(event.keyCode == 39 ){  
console.log("stopped moving right");
 direction.right = false;
}
else if(event.keyCode == 38){
	console.log("stopped moving up");
	direction.up = false;
}
else if(event.keyCode == 37){
	console.log("stopped moving left");
	direction.left = false;
}
else if(event.keyCode == 40){
	console.log("stopped moving down");
	direction.down = false;
}

  //resets firing mechanic
else if(event.keyCode == 32){
console.log("stopped firing");
fireCounter = 0;
};
});












