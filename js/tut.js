///////////////////////////////////////////////////////////////////

let direction = {
	left: false,
	right: false,
	up: false,
	down: false
}


let fireCounter = 0;

let gravity = 1;
 let theX = 400;
 let theX2 = window.innerWidth;
 let theY =  310;
 let theY2 = 390;
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



class ThePlayer {
	constructor(x, y, dx, dy, health, ammo, win){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.health = health;
		this.jump = false;
		this.ammo = ammo;
		this.win = win;
	}
	 animating (){
		
		 if (direction.right == true && direction.up == true && theY < 390 - 80){
			 theX--;
			 theX2++;
			theY -= 3;
			 theY2 += 3;
	   }
       else if(direction.right == true && theX > 115 ){
     	 theX--;
 	     theX2++;
 }
		 else if (direction.right && direction.up == false && theY < 390 - 80){
			if(theX > 76) {
			theX--;
			 theX2++;
			 theY += gravity;
			 theY2 -= gravity;
		 }
	   }
		 else if (direction.left == true){
     	 theX++;
     	 theX2--;
 } 
		 else if (direction.down == true && theY < 390 - 80){	
 	     theY++;
 	     theY2--;
 }
		 else if (direction.up == true){
 	     theY-= 3;
		  theY2+=3;
	   }
       else if(direction.up == false && theY < 390 - 80){
		 theY+= gravity;
		 theY2 -= gravity;


}
 else{
 	theX += 0;
 	theX2 += 0;
 }

 //player
c.fillStyle = '#00FF0F';
c.fillRect(75, theY, 40, 80)

c.fillStyle ='#FF0000';
c.fillRect(theX, theY2 - 40, 40, 40);
c.beginPath();
c.moveTo(0, theY2);
c.lineTo( theX2, theY2);
c.strokeStyle = "blue";
c.stroke();
	 }
	}

	let first;
	const init  = () => {
	first = new ThePlayer(3,3,3,3,3,3,false)
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
	else if(event.keyCode == 32){
		fire();
		
	}
}).on("keyup", (e)=>{
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
else if(event.keyCode == 32){
console.log("stopped firing");
fireCounter = 0;
};
});














