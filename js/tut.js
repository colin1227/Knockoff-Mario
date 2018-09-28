///////////////////////////////////////////////////////////////////

let direction = {
	left: false,
	right: false,
	up: false,
	down: false
}


let fireCounter = 0;

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



let player = class ThePlayer {
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
       requestAnimationFrame(animating);
       c.clearRect(0, 0, innerWidth, innerHeight);
 
       if(direction.right == true){
     	theX--;
 	    theX2++;
 }
       if(direction.left == true){
     	theX++;
     	theX2--;
 } 
 if(direction.down == true){	
 	theY++;
 	theY2--;
 }
if(direction.up == true){
 	theY-= 3;
 	theY2--;
  while(direction.up == false && theY < 390 + 40){
 theY+= gravity;

}
}
 else{
 	theX += 0;
 	theX2 += 0;
 }

c.fillStyle = '#00FF0F';
c.fillRect(75, theY, 40, 80)
c.fillStyle ='#FF0000';
c.fillRect(theX, 350, 40, 40);
c.beginPath();
c.moveTo(0, 390);
c.lineTo( theX2, 390);
c.strokeStyle = "blue";
c.stroke();
	 }
	}
	let first = new player(3,3,3,3,3,3,false)

	first.animating();











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








 let gravity = 1;
 let theX = 400;
 let theX2 = window.innerWidth;
 let theY =  310;
;






