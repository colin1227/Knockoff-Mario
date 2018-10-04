let canvas = document.getElementById('canvas');
const resizer = () => {
    canvas.width = 1000;
    canvas.height = window.innerHeight;


}
let c = canvas.getContext('2d');
canvas.width = 4000;

canvas.height = window.innerHeight;

//window.addEventListener("resize", resizer)

let direction = {
    left: false,
    right: false,
    up: false,
    down: false
}

let mapCollision = {
    leftCol: false,
    topCol: false,
    topCol2: false,
    rightCol: false,
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

class ThePlayer {
    constructor(x, y, width, height, dx, dy, health, ammo, win) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.leftX = this.x; //collison top and bottom
        this.leftY = [this.y, this.y + this.height];
        this.rightX = this.x + 40; //collison top and bottom
        this.rightY = [this.y, this.y + this.height];
        this.bottomY = this.y + 80; //collison top and bottom
        this.bottomX = [this.x, this.x + this.width]; // same as LeftY and RightY
        this.topY = this.y; //collison top and bottom
        this.topX = [this.x, this.x + this.width]; // same as LeftY and RightY


        this.health = health;
        this.ammo = ammo;
        this.win = win;
    }
    thePlayer(firstx, firsty, firstW, firstH) {
        c.fillStyle = '#00FF0F';
        c.fillRect(firstx, firsty, firstW, firstH)

    }
}

class Block {
    constructor(x, y, width, height) {
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
                //trans -= this.dx;
                this.leftX -= Pspeed;
                this.rightX -= Pspeed;
                //console.log(this.rightX)
                // c.translate(trans, 0);
            }
        }
        else if (direction.down === true && mapCollision.topCol == true) {
            this.x += 0;
        }
        else if (direction.right == true && mapCollision.topCol === true && mapCollision.rightCol === false) {
            mapCollision.leftCol = false;
            //trans -= this.dx;
            this.leftX -= Pspeed;
            this.rightX -= Pspeed;
            distanceCounter += Pspeed / 3;
            //console.log(this.rightX)
            // c.translate(trans, 0);
        }

        else if (direction.left === true && mapCollision.leftCol == true && mapCollision.topCol === true) {
            this.x += 0;
        }

        else if (direction.left == true && mapCollision.topCol === true && mapCollision.leftCol === false) {
            distanceCounter -= Pspeed / 3;
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

            else if (mapCollision.topCol)
                if (first.bottomY > groundy) {
                    this.bottomY -= gravity;
                    this.y -= gravity;

                }
                else {
                    mapCollision.topCol = true;
                }

        }
    }
    theEnemies(abx, aby, abw, abh) {
        c.fillStyle = '#FF0000';
        c.fillRect(abx, aby, abw, abh);
    }
}

class Ground {
    constructor(x, y) {
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
const game = {
    colDetObjLeft(PTopY, PBottomY, PRightX, OTopY, OBottomY, OLeftX) {


        if (PRightX === OLeftX) {


            if (((PBottomY >= OTopY && PBottomY <= OBottomY) && (PTopY < OTopY && PTopY < OBottomY)) || ((PBottomY >= OTopY && PBottomY >= OBottomY) && (PTopY >= OTopY && PTopY <= OBottomY))) {
                mapCollision.leftCol = true;
                return;
            }
            else if ((PBottomY < OTopY && PBottomY < OBottomY) && (PBottomY < OTopY && PBottomY < OBottomY)) {
                mapCollision.leftCol = false;
            }
            else if ((PBottomY > OTopY && PBottomY > OBottomY) && (PBottomY > OTopY && PBottomY > OBottomY)) {
                mapCollision.leftCol = false;
            }
            else {
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
    colDetObjTop(PLeftX, PRightX, OLeftX, ORightX, PBottomY, OTopY) {

        if (PBottomY === OTopY) {



            if ((PLeftX <= OLeftX && PLeftX <= ORightX) && (PRightX >= OLeftX && PRightX <= ORightX)) {
                mapCollision.topCol2 = true;

            }
            else if (((PLeftX >= OLeftX && PLeftX <= ORightX) && (PRightX >= OLeftX && PRightX >= ORightX))) {
                mapCollision.topCol2 = true;

            }
            else if (((PLeftX >= OLeftX && PLeftX <= ORightX) && (PRightX >= OLeftX && PRightX <= ORightX))) {
                mapCollision.topCol = true;


            }



            else if (((PLeftX < OLeftX) && (PLeftX < ORightX)) && (PRightX <= OLeftX && PRightX < ORightX)) {
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
const init = () => {
    first = new ThePlayer(75, 310, 40, 80, 5, 7, 3, 3, false);
    block1 = new Block(350, 270, 70, 70)
    block2 = new Block(625)
    block3 = new Block( 750)
    block4 = new Block( 1000)
    block5 = new Block(1250)
    block6 = new Block( 925)
    block7 = new Block(875)
    block8 = new Block()
    block9 = new Block()
    block10 = new Block()
    block11 = new Block()
    tutG = new Ground(window.innerWidth, 390);
    allEnemies.push(aBlock)
    allEnemies.push(a2Block)

}
const animation = () => {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, innerWidth, innerHeight);
    first.thePlayer(first.leftX, first.topY, first.width, first.height);
    aBlock.theEnemies(aBlock.leftX, aBlock.topY, aBlock.width, aBlock.height);
    a2Block.theEnemies(a2Block.leftX, a2Block.topY, a2Block.width, a2Block.height);
    a2Block.theEnemies(a3Block.leftX, a3Block.topY, a3Block.width, a3Block.height);
    tutG.theGround(tutG.x, tutG.y);


    // ground
    game.colDetObjTop(aBlock.leftX, aBlock.rightX, 0, tutG.x, aBlock.bottomY, tutG.y)

    //first object
       
        
    

    // else if (800 <= distanceCounter >= 1200) {
    //     b2();
    // }

    aBlock.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
    a2Block.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);
    a3Block.moving(tutG.y, first.dx, first.dy, first.topY, first.bottomY);


}

$(document).on("keydown", (event) => {
    if (event.keyCode == 39) {
        preventDefault()
        direction.right = true;
       
    }
    else if (event.keyCode == 38) {
        preventDefault()
        direction.up = true;
        jump = true;
       
    }
    else if (event.keyCode == 37) {
        preventDefault()
        direction.left = true;
        
    }
    else if (event.keyCode == 40) {
        preventDefault()
        direction.down = true;
        
    }

    // the function call that fires bullets
    else if (event.keyCode == 32) {
        preventDefault()
        //fire();

    }
}).on("keyup", (event) => {

    //resets direction object
    if (event.keyCode == 39) {
        //console.log("stopped moving right");
        direction.right = false;
    }
    else if (event.keyCode == 38) {
        //console.log("stopped moving up");
        direction.up = false;
    }
    else if (event.keyCode == 37) {
        //console.log("stopped moving left");
        direction.left = false;
    }
    else if (event.keyCode == 40) {
        //console.log("stopped moving down");
        direction.down = false;
    }

    //resets firing mechanic
    else if (event.keyCode == 32) {
        console.log("stopped firing");
        fireCounter = 0;
    };
});


function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}
init();
animation();
