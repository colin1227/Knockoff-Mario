/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////  Global Objects & variables  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///                              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let direction = {
	left: false,
	right: false,
	up: false,
	down: false
}

let mapCollision ={
	leftCol: false,
	topCol: false,
	rightCol:false,
	bottomCol: false
}

let jump = false;
let first;
let aBlock;
let a2Block;
let a3Block;
let tutG;
let trans;
let allEnemies = [];
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////                  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////  setting up Canvas     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////                 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let canvas = document.getElementById('canvas');
const resizer = () =>{
	canvas.width = 1000;
canvas.height = window.innerHeight;


}
let c = canvas.getContext('2d');
canvas.width = 4000;
//c.setTransform(-10000, 0, 0, 0, 0, 0)
canvas.height = window.innerHeight;

//window.addEventListener("resize", resizer)


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////                             ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////         All Classes         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////                             ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Block {
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.left = x;
		this.right = x + width;
		this.topY = this.y;
		this.topX = [this.x, this.x + this.width];
		this.bottomY = this.y + 40;
		this.bottomX = [this.x, this.x + this.width];
		this.leftX = this.x;
		this.leftY = [this.y, this.y + this.height];
		this.rightX = this.x + 40;
		this.rightY = [this.y, this.y + this.height];
		;
		

	}
	theEnemies(abx, aby, abw, abh) {
		c.fillStyle = '#FF0000';
		c.fillRect(abx, aby, abw, abh);
	}

	findBottom() {
		for (let r = 0; r < this.x + 41; r++) {
			if (r <= r - this.width || r > r + this.width) {

			}
			else if (r > this.x - 1 && r < this.x + this.width + 1) {
				this.bottomX.push(r- 40);
				this.topX.push(r);

			}
		}
	}
	
	getDistance(x1, y1, player) {
	xDistance = (x1 + player) - this.x;
	yDistance = (y1 + player) - this.y;

	let total = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	// console.log(yDistance);

}
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



class ThePlayer {
	constructor(x, y, width, height, dx, dy, health, ammo, win){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.dx = dx;
		this.dy = dy;
		this.leftX = this.x;
		this.leftY = [this.y, this.y + this.height];
		this.rightX = this.x + 40;
		this.rightY = [this.y, this.y + this.height];
		this.bottomY = this.y + 40;
		this.bottomX = [this.x, this.y + this.height];
		this.topY = this.y;
		this.topX = [this.x, this.y + this.height];

        
		this.health = health;
		this.ammo = ammo;
		this.win = win;
	}
	moving() {

		if (direction.left == true && direction.up == true && mapCollision.bottomCol === true) {
			this.x -= first.dx;
			this.y -= 3;
			this.y += gravity;
			
		
			//tutG.x-= first.dx;

			//tutG.y += 3;
		}
		else if (direction.right === true && mapCollision.leftCol == true && mapCollision.bottomCol === true){
			this.x += 0;
		}


		else if (direction.right == true && mapCollision.bottomCol === true && mapCollision.leftCol === false) {
			if (mapCollision.rightCol === true) {
				mapCollision.rightCol = false;
			}
			this.x+= this.dx;
			trans= this.dx;
			this.rightX += this.dx;
			this.leftX += this.dx;
			console.log(this.rightX)

			c.translate(-trans, 0);
			// this.x += first.dx;
			
			
			// c.setTransform(0, 0, 0, 0, trans, 0)
			//tutG.x += first.dx;
		}
		else if (direction.left === true && mapCollision.rightCol == true && mapCollision.bottomCol === true) {
			this.x += 0;
		}
		else if (direction.left == true && mapCollision.bottomCol === true && mapCollision.rightCol === false) {
			if(mapCollision.leftCol === true){
				mapCollision.leftCol = false;
			}
			this.leftX -= this.dx;
			this.x -= this.dx;
			trans = -this.dx;
            this.rightX -= this.dx;
			c.translate(-trans, 0);
			//tutG.x += first.dx;
		}
		else if (direction.down == true && mapCollision.bottomCol === true) {
			this.y += first.dy;
			this.rightY[0] += first.dy;
			this.rightY[1] += first.dy;
			//console.log(this.rightY[0])
			this.leftY[0] += first.dy;
			this.leftY[1] += first.dy;
			//tutG.y--;
		}
		else if (direction.up == true && mapCollision.bottomCol === true) {
			this.y -= first.dy;
			this.y += gravity;
			this.jump = true;
			this.rightY[0] -= first.dy;
			this.rightY[1] -= first.dy;
			//console.log(this.rightY[0])
			this.leftY[0] -= first.dy;
			this.leftY[1] -= first.dy;
			//	tutG.y += 3;
		}
		else if(direction.up == true && mapCollision.bottomCol === false && jump === true){
			console.log("cant jump in the air now.")
		}


		else {
			this.x += 0;
			trans = 0;
			c.translate(-trans, 0);
			// aBlock.y-= gravity;
			if (this.y < 310) {
				this.y += gravity;
				this.rightY[0] = this.y;
				this.rightY[1] = this.y + this.height;
				console.log(this.rightY[0])
				this.leftY[0] = this.y;
				this.leftY[1] = this.y + this.height;

			}

			//	tutG.x += 0;
		}
	}
	

	isCollidingDown(aby){
		for(let t = 0; t < this.bottomX.length;t++){
			if(aby - this.bottomY === 0){
				mapCollision.bottomCol = true;
				
				return this.colisionDown;
			}
			else{
				mapCollision.bottomCol = false;
			}
		}
	}
	// isColidingRight(abx){
	// 	for(let g = 0; g < this.rightY.length; g++){
	// 		if 
	// 	}

	// }


 //visual player
  thePlayer (firstx,firsty,firstW , firstH){
c.fillStyle = '#00FF0F';
c.fillRect(firstx, firsty, firstW, firstH)
 
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const game = {
	colDetObjLeft(RightX, RightY, LeftX, LeftY){
		// console.log('RightX', RightX)
		// console.log('LeftX', LeftX)
		if(RightX === LeftX){	
	
			if (((RightY[1] >= LeftY[0] && RightY[1] <= LeftY[1]) && (RightY[0] <= LeftY[0] && RightY[0] <= LeftY[1])) || ((RightY[1] >= LeftY[0] && RightY[1] >= LeftY[1]) && (RightY[0] >= LeftY[0] && RightY[0] <= LeftY[1]))){
				// console.log("Ry[1] - Ly[0]", RightY[1] - LeftY[0])
				// console.log("Ry[0] - Ly[1]",RightY[0] - LeftY[1])
				// console.log("Ry[0] - Ly[0]",RightY[0] - LeftY[0])
				// console.log("Ry[1] - Ly[1]",RightY[0] - LeftY[1])
				
				mapCollision.leftCol = true;
		
		
				return;
				}
			else if (RightY[1] > LeftY[0] && RightY[1] > LeftY[1]){
				mapCollision.leftCol = false;
				console.log("positive answer: 1 under block #2")
			}
			else if (RightY[0] < LeftY[0] && RightY[0] < LeftY[1]){
				mapCollision.leftCol = false;
				console.log("negative answer: 0 above block #1")
			}
			else if (RightY[1] < LeftY[0] && RightY[1] < LeftY[1]){
				mapCollision.leftCol = false;
				console.log("negative answer: 1 above block #3")
			}
			else if (RightY[0] > LeftY[0] && RightY[0] > LeftY[1]){
				mapCollision.leftCol = false;
				console.log("positive answer: 0 under block #4")
			}

			else{
				mapCollision.leftCol = false;
	}
		}
		
		else {
			mapCollision.leftCol = false;
			//console.log("false")
		}
},
	colDetObjRight(LeftX, LeftY, RightX, RightY) {
		 console.log('RightX', RightX)
		 console.log('LeftX', LeftX)
		if (RightX === LeftX) {
              console.log("got here")
			if (((LeftY[0] <= RightY[0] && LeftY[0] <= RightY[1]) && (LeftY[1] >= RightY[0] && LeftY[1] <= RightY[1])) || ((LeftY[0] >= RightY[0] && LeftY[0] <= RightY[1]) && (LeftY[1] >= RightY[0] && LeftY[1] <= RightY[1]))) {
				// console.log("Ry[1] - Ly[0]", RightY[1] - LeftY[0])
				// console.log("Ry[0] - Ly[1]",RightY[0] - LeftY[1])
				// console.log("Ry[0] - Ly[0]",RightY[0] - LeftY[0])
				// console.log("Ry[1] - Ly[1]",RightY[0] - LeftY[1])

				mapCollision.rightCol = true;
				return;
			}
			// vvv  first and second not actulally doing anything vvvv
			else if (LeftY[1] > RightY[0] && LeftY[1] > RightY[1]) {
				mapCollision.righttCol = false;
				console.log("positive answer: 1 under block #2")
			}
			else if (LeftY[0] < RightY[0] && LeftY[0] < RightY[1]) {
				mapCollision.rightCol = false;
				console.log("negative answer: 0 above block #1")
			}
			else if (LeftY[1] < RightY[0] && LeftY[1] < RightY[1]) {
				mapCollision.rightCol = false;
				console.log("negative answer: 1 above block #3")
			}
			else if (LeftY[0] > RightY[0] && LeftY[0] > RightY[1]) {
				mapCollision.rightCol = false;
				console.log("positive answer: 0 under block #4")
			}
			else {
				mapCollision.rightCol = false;
			}
		}
		else {
			mapCollision.rightCol = false;
			//console.log("false")
		}
	},
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	const init  = () => {
	    first = new ThePlayer(75,310,40,80,5,7,3,3,false);
		aBlock = new Block(400, 350, 40, 40);
		a2Block = new Block(600, 350, 40, 40);
		a3Block = new Block(900, 350, 40 ,40);
        tutG = new Ground(window.innerWidth, 390);
		allEnemies.push(aBlock)
		allEnemies.push(a2Block)
	
	}

//////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
	const animation = () =>{
		requestAnimationFrame(animation);
	    c.clearRect(0, 0, innerWidth, innerHeight);
	    first.thePlayer(first.x,first.y,first.width,first.height);
	    aBlock.theEnemies(aBlock.x, aBlock.y, aBlock.width, aBlock.height);
		a2Block.theEnemies(a2Block.x, a2Block.y, a2Block.width, a2Block.height);
		a2Block.theEnemies(a3Block.x, a3Block.y, a3Block.width, a3Block.height);
		tutG.theGround(tutG.x,tutG.y);

		//first.findRight();
		//aBlock.findRight();
		
		game.colDetObjRight(first.leftX, first.leftY, aBlock.rightX, aBlock.rightY)
		game.colDetObjLeft(first.rightX, first.rightY, aBlock.leftX, aBlock.leftY);
		first.isCollidingDown(aBlock.y);
		//console.log(first.rightY)
		// RightY = [];
		// LeftY = [];
		first.moving();
		
	
	}






//i did it




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////    buttons & console log functions     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                         ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// the funcion callbacks based on which key codes are pressed
$(document).on("keydown", (event) =>{
	if (event.keyCode == 39) {
		preventDefault()
		direction.right = true;
		movingRight();
	}
	else if (event.keyCode == 38) {
		preventDefault()
		direction.up = true;
		jump = true;
		movingUp();
	}
	else if (event.keyCode == 37) {
		preventDefault()
		direction.left = true;
		movingLeft();
	}
	else if (event.keyCode == 40) {
		preventDefault()
		direction.down = true;
		movingDown();
	}

// the function call that fires bullets
	else if(event.keyCode == 32){
		preventDefault()
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////               /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////   Function calls  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////               ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
init();
animation();

console.log(aBlock.leftX) 
// console.log(aBlock.rightY)
 



 //console.log(first.colisionDown)









function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}


/*for(let i = 0; i < allEnemies.length; i++){
			 if(allEnemies[i].x + first.width + 1 < first.x){
			   getDistance(first.x, first.y, allEnemies[i].x, allEnemies[i].y);

			 }
             else{
		       getDistance(first.x, first.y,allEnemies[i].x,allEnemies[i].y);
		       i++;
			 }
		 } */