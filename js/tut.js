///////////////////////////////////////////////////////////////////

let direction = {
	left: false,
	right: false,
	up: false,
	down: false
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

class Ground{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}
class Block {
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height
	}
}


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
	 animating (){
		
		 if (direction.right == true && direction.up == true && aBlock.y < 390 - 80){
			 aBlock.x--;
			 tutG.x++;
			theY -= 3;
			 tutG.y += 3;
	   }
       else if(direction.right == true && aBlock.x > 115 ){
     	 aBlock.x-= first.dx;
 	     tutG.x-= first.dx;
 }
		 else if (direction.right && direction.up == false && aBlock.y < 390 - 80){
			if(theX > 76) {
			aBlock.x--;
			 tutG.x++;
			 theY += gravity;
			 tutG.y -= gravity;
		 }
	   }
		 else if (direction.left == true){
     	 aBlock.x++;
     	 tutG.x--;
 } 
		 else if (direction.down == true && aBlock.y > 390 - 80){	
 	     aBlock.y--;
 	     tutG.y--;
 }
		 else if (direction.up == true){
 	     aBlock.y+= 3;
		  tutG.y+=3;
	   }
       else {
		// aBlock.y-= gravity;
		if (aBlock.y > 390 - 40){
		 aBlock.y-= gravity;
		 tutG.y -= gravity;
			 }
		  aBlock.x += 0;
		  tutG.x += 0;
	 }

 //player
c.fillStyle = '#00FF0F';
c.fillRect(first.x, first.y, 40, 80)

c.fillStyle ='#FF0000';
c.fillRect(aBlock.x, aBlock.y, aBlock.width, aBlock.height);
c.beginPath();
c.moveTo(0, tutG.y);
c.lineTo( tutG.x, tutG.y);
c.strokeStyle = "blue";
c.stroke();
	 }
	}
	let first;
    let aBlock;
    let tutG;
	const init  = () => {
	    first = new ThePlayer(75,310,40,80,5,3,3,3,false);
        aBlock = new Block(400, 350, 40, 40);
        tutG = new Ground(window.innerWidth, 390);
	    first.animating();

	}

	const animation = () =>{
		requestAnimationFrame(animation);
	   c.clearRect(0, 0, innerWidth, innerHeight);
	   first.animating();
	}
init();
animation();



function getDistance (x1, y1, x2, y2){
	let xDistance = x1 - x2;
	let yDistance = y1 - y2;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

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













// let theX = 400;
//let theX2 = window.innerWidth;
// let theY = 310;
//let theY2 = 390;