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
	topCol2: false,
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
let gravity = 1;
let distanceCounter = 0;

let hexx = "#"
const hex = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"]
const rainbow = (arr) => {
	for (let r = 0; r < 6; r++) {
		let value = arr[Math.floor(Math.random() * arr.length)]
		hexx += value
	}
}
rainbow(hex)
///////////////////////////////////////////////////////////////////
const gameOver = () => {
  $('html').html("Game Over").css({"font-size": "32px", "background-color": "red", "font-family": "Comic Sans"})
}
///////////////////////////////////////////////////////////////////

// const fire = () => {
//   if (fireCounter === 0) {
//   	console.log('Pew!')
//   	fireCounter++;
//   }
//   else if (fireCounter <= 4){
//   	let firing = setTimeout(()=>{
//   		console.log('Pew!')
//   		fireCounter++;

  		
//   	}, 1500)
//   }
// }
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

canvas.height = window.innerHeight;

//window.addEventListener("resize", resizer)
let timer = 0;
let running = window.setInterval(() => {
	timer++;
	$('h1').text(`Timer: ${timer}s`)
	if (block18.leftX <= 75) {
		window.clearInterval(running)
		$('html').html("You Win!").css({ "font-size": "32px", "background-color": "green", "font-family": "Comic Sans" })

	}
}
	, 1000)

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
let color = rainbow(hex)
class Block {
	constructor(x,y,width,height){
		this.leftX = x;
		this.topY = y;
		this.width = width;
		this.height = height;
		this.rightX = x + width;
		this.bottomY = y + height;
	}
	theEnemies(abx, aby, abw, abh) {
	
		c.fillStyle = color;
		c.fillRect(abx, aby, abw, abh);
	}

	moving(groundy, Pspeed, Pjump, PTopY, PBottomY) {
		
		
           
	
console.log(distanceCounter)
		
			
		
		// else if ((direction.right === true && mapCollision.leftCol == true) || (direction.left === true && mapCollision.rightCol == true && mapCollision.topCol === true) || (direction.down === true && mapCollision.topCol === true)) {
		// 	this.x += 0;
		// 	this.y += 0;
		// }
	  
		if (mapCollision.topCol2 == true) {
			first.TopY += 0;
			first.bottomY += 0;
			if (direction.left == true && mapCollision.topCol === true && mapCollision.leftCol === false) {
                
				mapCollision.rightCol = false;
				this.leftX += Pspeed;
				this.rightX += Pspeed;
			} 
			else if (direction.right == true && mapCollision.topCol === true && mapCollision.rightCol === false) {
				mapCollision.leftCol = false;
				distanceCounter += Pspeed / 5;
				this.leftX -= Pspeed;
				this.rightX -= Pspeed;
				
			}
		}
		else if (direction.down === true && mapCollision.topCol == true) {
			gameOver()
			this.x += 0;
		}
		else if (direction.right == true && mapCollision.topCol === true && mapCollision.rightCol === false) {
			mapCollision.leftCol = false;
		;
			this.leftX -= Pspeed;
			this.rightX-= Pspeed;
			
		
		}

		else if (direction.left === true && mapCollision.leftCol == true && mapCollision.topCol === true) {
			this.x += 0;
			gameOver()
		}

		else if (direction.left == true && mapCollision.topCol === true && mapCollision.leftCol === false) {

			mapCollision.rightCol = false;
			this.leftX += Pspeed;
			this.rightX += Pspeed;
		}

		else if (direction.down == true && mapCollision.topCol === true) {
			first.topY -= first.dy;
			first.bottomY -= this.dy

		}

		 else if (direction.up == true && (mapCollision.topCol === true || mapCollision.topCol2) && PTopY <= 310 && PBottomY <= 390) {
           // mapCollision.topCol = false;
			first.topY -= Pjump;
			first.bottomY -= Pjump;


		}
		 
		else {

			if (first.bottomY < groundy) {
				first.bottomY += gravity;
				first.topY += gravity;
			}

			else if( mapCollision.topCol)
				
			 if (first.bottomY > groundy) {
				this.bottomY -= gravity;
				this.y -= gravity;

			}
			 else {
				 mapCollision.topCol2 = true;
				
			 }

		}
	}
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



class ThePlayer {
	constructor(x, y, width, height, dx, dy, health, ammo, win){
		this.leftX = x;
		this.topY = y;
		this.width = width;
		this.height = height;
		this.dx = dx;
		this.dy = dy;
		this.rightX = x + width;
		this.bottomY = y + height;

        
		this.health = health;
		this.ammo = ammo;
		this.win = win;
	}

 //visual player
  thePlayer (firstx,firsty,firstW , firstH){
c.fillStyle = '#00FF0F';
c.fillRect(firstx, firsty, firstW, firstH)
 
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 game = {

	 colDetObjLeft(PTopY, PBottomY, PRightX, OTopY, OBottomY,OLeftX ){

		
		if(PRightX === OLeftX){	
			
			
			if (((PBottomY >= OTopY && PBottomY <= OBottomY) && (PTopY < OTopY && PTopY < OBottomY)) || ((PBottomY >= OTopY && PBottomY >= OBottomY) && (PTopY >= OTopY && PTopY <= OBottomY))){
				mapCollision.leftCol = true;
					
				return;
				}
		    else if ((PBottomY < OTopY && PBottomY < OBottomY) && (PBottomY < OTopY && PBottomY < OBottomY)) {
			mapCollision.leftCol = false;
		}
			else if ((PBottomY > OTopY && PBottomY > OBottomY) && (PBottomY > OTopY && PBottomY > OBottomY)){
				mapCollision.leftCol = false;			
			}
			else{
				mapCollision.leftCol = false;
	        }
		}
		else {
			mapCollision.leftCol = false;
		
		}
    },
	 colDetObjRight(PTopY, PBottomY, PLeftX, OTopY, OBottomY, ORightX) {
        
		if (ORightX === PLeftX) {

			if (((PBottomY >= OTopY && PBottomY <= OBottomY) && (PTopY < OTopY && PTopY < OBottomY)) || ((PBottomY >= OTopY && PBottomY >= OBottomY) && (PTopY >= OTopY && PTopY <= OBottomY))) {
				mapCollision.rightCol = true;
				
				return;
			  }
			
			  else if ((PBottomY < OTopY && PBottomY < OBottomY) && (PBottomY < OTopY && PBottomY < OBottomY)) {
				mapCollision.rightCol = false;
			  }
			  else if ((PBottomY > OTopY && PBottomY > OBottomY) && (PBottomY > OTopY && PBottomY > OBottomY)) {
				mapCollision.rightCol = false;
			  }
			  else {
				mapCollision.rightCol = false;
				
			}
		  }
		  else {
			mapCollision.rightCol = false;
			
		}
	},
	colDetObjTop(PLeftX, PRightX, OLeftX, ORightX, PBottomY, OTopY ){
	
		if (PBottomY === OTopY){
			
			

			 if((PLeftX <= OLeftX && PLeftX <= ORightX) && (PRightX >= OLeftX && PRightX <= ORightX)){
				mapCollision.topCol2 = true;
				 
			}
			else if (((PLeftX >= OLeftX && PLeftX <= ORightX) && (PRightX >= OLeftX && PRightX >= ORightX))){
				mapCollision.topCol2 = true;
				 
			}
			else if (((PLeftX >= OLeftX && PLeftX <= ORightX) && (PRightX >= OLeftX && PRightX <= ORightX))){
				mapCollision.topCol = true;
				
				
			}



			else if (((PLeftX < OLeftX) && (PLeftX < ORightX))&& (PRightX <= OLeftX && PRightX < ORightX)) {
				mapCollision.topCol2 = false;
				 
			}
			else if (((PLeftX > OLeftX) && (PLeftX >= ORightX)) && (PRightX > OLeftX && PRightX > ORightX)) {
				mapCollision.topCol2 = false;
				 
				
			}
			else {
				mapCollision.topCol = false;
				 
				
				
			}
		}
		else {
			mapCollision.topCol2 = false;
			
			

		}
		
	},
	// colDetObjBottom(PLeftX, PRightX, OLeftX, ORightX, PTopY, OBottomY) {
		
	// 	if (PTopY === OBottomY) {
	// 		if ((PLeftX < OLeftX && PLeftX < ORightX) && (PRightX > OLeftX && PRightX < ORightX) || ((PLeftX > ORightX && PLeftX < ORightX) && (PRightX > OLeftX && PRightX > ORightX))) {
	// 			mapCollision.bottomCol = true;
	// 		}
	// 		else if (((PLeftX < OLeftX) && (PLeftX < ORightX)) && (PRightX < OLeftX && PRightX < ORightX)) {
	// 			mapCollision.bottomCol = false;
	// 		}
	// 		else if (((PLeftX > OLeftX) && (PLeftX > ORightX)) && (PRightX > OLeftX && PRightX > ORightX)) {
	// 			mapCollision.bottomCol = false;
	// 		}
	// 	}
	// }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	const init  = () => {
	    first = new ThePlayer(75,310,40,80,5,7,3,3,false);
		aBlock = new Block(400, 350, 40, 40);
		a2Block = new Block(600, 350, 40, 40);
		a3Block = new Block(900, 350, 40 ,40);
		block1 = new Block(1210, 320, 70, 70)
		block2 = new Block(1325, 320, 70, 70)
		block3 = new Block(1650, 300, 40, 90)
		block4 = new Block(1000, 340, 20, 50)
		block5 = new Block(1250, 340, 50, 50)
		block6 = new Block(1425, 315, 30, 75)
		block7 = new Block(1675, 365, 120, 25)
		block8 = new Block(1800, 355, 215, 35)
		block9 = new Block(2500, 360, 150, 30)
		block10 = new Block(2600, 345, 170, 45)
		block11 = new Block(2700, 335, 170, 55)
		block12 = new Block(2750, 360, 50, 30)
		block13 = new Block(3000, 340, 225, 50)
		block14 = new Block(3500, 370, 20, 20)
		block15 = new Block(3500, 350, 20, 20)
		block16 = new Block(3520, 370, 20, 20)
		block17 = new Block(3950, 330, 65, 60)
		block18 = new Block(4000, 280, 45, 110)
		tutG = new Ground(window.innerWidth, 390);
		allEnemies.push(aBlock)
		allEnemies.push(a2Block)
	
	}

//////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
	const animation = () =>{
		requestAnimationFrame(animation);
	    c.clearRect(0, 0, innerWidth, innerHeight);
	    first.thePlayer(first.leftX,first.topY,first.width,first.height);
	    aBlock.theEnemies(aBlock.leftX, aBlock.topY, aBlock.width, aBlock.height);
		a2Block.theEnemies(a2Block.leftX, a2Block.topY, a2Block.width, a2Block.height);
		a2Block.theEnemies(a3Block.leftX, a3Block.topY, a3Block.width, a3Block.height);
		block1.theEnemies(block1.leftX, block1.topY, block1.width, block1.height);
		block2.theEnemies(block2.leftX, block2.topY, block2.width, block2.height);
		block3.theEnemies(block3.leftX, block3.topY, block3.width, block3.height);
		block4.theEnemies(block4.leftX, block4.topY, block4.width, block4.height);
		block5.theEnemies(block5.leftX, block5.topY, block5.width, block5.height);
		block6.theEnemies(block6.leftX, block6.topY, block6.width, block6.height);
		block7.theEnemies(block7.leftX, block7.topY, block7.width, block7.height);
		block8.theEnemies(block8.leftX, block8.topY, block8.width, block8.height);
		block9.theEnemies(block9.leftX, block9.topY, block9.width, block9.height);
		block10.theEnemies(block10.leftX, block10.topY, block10.width, block10.height);
		block11.theEnemies(block11.leftX, block11.topY, block11.width, block11.height);
		block12.theEnemies(block12.leftX, block12.topY, block12.width, block12.height);
		block13.theEnemies(block13.leftX, block13.topY, block13.width, block13.height);
		block14.theEnemies(block14.leftX, block14.topY, block14.width, block14.height);
		block15.theEnemies(block15.leftX, block15.topY, block15.width, block15.height);
		block16.theEnemies(block16.leftX, block16.topY, block16.width, block16.height);
		block17.theEnemies(block17.leftX, block17.topY, block17.width, block17.height);
		block18.theEnemies(block18.leftX, block18.topY, block18.width, block18.height);
		tutG.theGround(tutG.x,tutG.y);
		
		
        // ground
		game.colDetObjTop(aBlock.leftX, aBlock.rightX, 0, tutG.x, aBlock.bottomY, tutG.y)
 
		//first object
        if( aBlock.leftX >= 75 && aBlock.leftX > -300){
		game.colDetObjTop(first.leftX, first.rightX, aBlock.leftX, aBlock.rightX, first.bottomY, aBlock.topY)
		game.colDetObjRight(first.topY, first.bottomY, first.rightX, aBlock.topY, aBlock.bottomY, aBlock.leftX)
		game.colDetObjLeft(first.topY, first.bottomY, first.leftX, aBlock.topY, aBlock.bottomY, aBlock.rightX);
		}
		else if (a2Block.leftX >= 75 && a2Block.leftX > -300){
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, a2Block.leftX, a2Block.rightX, first.bottomY, a2Block.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, a2Block.topY, a2Block.bottomY, a2Block.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, a2Block.topY, a2Block.bottomY, a2Block.rightX);
		  }
		else if (block1.leftX >= 75 && block1.leftX > 0){
			game.colDetObjTop(first.leftX, first.rightX, block1.leftX, block1.rightX, first.bottomY, block1.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block1.topY, block1.bottomY, block1.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.rightX, block1.topY, block1.bottomY, block1.leftX)

		}
		else if (block2.leftX >= 75 && block2.leftX > 0){
			game.colDetObjTop(first.leftX, first.rightX, block2.leftX, block2.rightX, first.bottomY, block2.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block2.topY, block2.bottomY, block2.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block2.topY, block2.bottomY, block2.rightX);

		}
		else if (block3.leftX >= 75 && block3.leftX > 0){
			game.colDetObjTop(first.leftX, first.rightX, block3.leftX, block3.rightX, first.bottomY, block3.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block3.topY, block3.bottomY, block3.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block3.topY, block3.bottomY, block3.rightX);

		}
		else if (block4.leftX >= 75 && block4.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block4.leftX, block4.rightX, first.bottomY, block4.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block4.topY, block4.bottomY, block4.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block4.topY, block4.bottomY, block4.rightX);
		}
		//block 5 
		else if (block5.leftX >= 75 && block5.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block5.leftX, block5.rightX, first.bottom, block5.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block5.topY, block5.bottomY, block5.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block5.topY, block5.bottomY, block5.rightX);
		}
		//block 6 
		else if (block6.leftX >= 75 && block6.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block6.leftX, block6.rightX, first.bottomY, block6.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block6.topY, block6.bottomY, block6.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block6.topY, block6.bottomY, block6.rightX);
		}
		//block 7
		else if (block7.leftX >= 75 && block7.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block7.leftX, block7.rightX, first.bottomY, block7.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block7.topY, block7.bottomY, block7.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block7.topY, block7.bottomY, block7.rightX);
		}
		//block 8
		else if (block8.leftX >= 75 && block8.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block8.leftX, block8.rightX, first.bottomY, block8.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block8.topY, block8.bottomY, block8.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block8.topY, block8.bottomY, block8.rightX);
		}
		//block 9  
		else if (block9.leftX >= 75 && block9.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block9.leftX, block9.rightX, first.bottomY, block9.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block9.topY, block9.bottomY, block9.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block9.topY, block9.bottomY, block9.rightX);
		}
		//block 10
		else if (block10.leftX >= 75 && block10.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block10.leftX, block10.rightX, first.bottomY, block10.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block10.topY, block10.bottomY, block10.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block10.topY, block10.bottomY, block10.rightX);
		}
		// block 11
		else if (block11.leftX >= 75 && block11.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block11.leftX, block11.rightX, first.bottomY, block11.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block11.topY, block11.bottomY, block11.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block11.topY, block11.bottomY, block11.rightX);
		}
		// block 12
		else if (block12.leftX >= 75 && block12.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block12.leftX, block12.rightX, first.bottomY, block12.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block12.topY, block12.bottomY, block12.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block12.topY, block12.bottomY, block12.rightX);
		}
		// block 13  
		else if (block13.leftX >= 75 && block13.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block13.leftX, block13.rightX, first.bottomY, block13.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block13.topY, block13.bottomY, block13.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block13.topY, block13.bottomY, block13.rightX);
		}
		// block 14
		else if (block14.leftX >= 75 && block14.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block14.leftX, block14.rightX, first.bottomY, block14.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block14.topY, block14.bottomY, block14.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block14.topY, block14.bottomY, block14.rightX);
		}
		// block 15
		else if (block15.leftX >= 75 && block15.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block15.leftX, block15.rightX, first.bottomY, block15.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block15.topY, block15.bottomY, block15.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block15.topY, block15.bottomY, block15.rightX);
		}
		//block 16
		else if (block16.leftX >= 75 && block16.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block16.leftX, block16.rightX, first.bottomY, block16.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block16.topY, block16.bottomY, block16.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block16.topY, block16.bottomY, block16.rightX);
		}
		//block 17
		else if (block17.leftX >= 75 && block17.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block17.leftX, block17.rightX, first.bottomY, block17.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block17.topY, block17.bottomY, block17.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block17.topY, block17.bottomY, block17.rightX);
		}

		//block 18
		else if (block18.leftX >= 75 && block18.leftX > 0) {
			//console.log("activated")
			game.colDetObjTop(first.leftX, first.rightX, block18.leftX, block18.rightX, first.bottomY, block18.topY)
			game.colDetObjRight(first.topY, first.bottomY, first.rightX, block18.topY, block18.bottomY, block18.leftX)
			game.colDetObjLeft(first.topY, first.bottomY, first.leftX, block18.topY, block18.bottomY, block18.rightX);
		}
  
		aBlock.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		a2Block.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block1.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block2.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block3.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block4.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block5.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block6.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block7.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block8.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block9.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block10.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block11.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block12.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block13.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block14.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block15.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block16.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block17.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
		block18.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);

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
		distanceCounter += first.dx * 12;
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
		distanceCounter -= 5;
		distanceCounter -= first.dx * 12;
		
	}
	else if (event.keyCode == 40) {
		preventDefault()
		direction.down = true;
		//movingDown();
	}

// the function call that fires bullets
	else if(event.keyCode == 32){
		preventDefault()
		//fire();
		
	}
}).on("keyup", (event)=>{

	//resets direction object
 if(event.keyCode == 39 ){  
   //console.log("stopped moving right");
 direction.right = false;
}
else if(event.keyCode == 38){
	//console.log("stopped moving up");
	direction.up = false;
}
else if(event.keyCode == 37){
	//console.log("stopped moving left");
	direction.left = false;
	
}
else if(event.keyCode == 40){
	//console.log("stopped moving down");
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

//console.log(aBlock.leftX) 
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