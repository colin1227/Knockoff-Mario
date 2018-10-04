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
    block1 = new Block(310, 270, 70, 70)
    block2 = new Block(625, 190, 70, 70)
    block3 = new Block(750, 350, 40, 90)
    block4 = new Block(1000, 350, 20, 50)
    block5 = new Block(1250, 250, 50, 50)
    block6 = new Block(1425, 150, 30, 75)
    block7 = new Block(1075, 375,120, 25)
    block8 = new Block(1800, 345, 225, 35)
    block9 = new Block( 2000, 290,150,30)
    block10 = new Block(2100, 285, 170,45 )
    block11 = new Block(2200, 275, 170, 55)
    block12 = new Block(2250, 150, 50, 30,)
    block13 = new Block(2900, 270, 225, 50)
    block14 = new Block(3000,290, 20,20)
    block15 = new Block(3000,270, 20, 20)
    block16 = new Block(3020,290, 20, 20)
    block17 = new Block(3150,250, 65, 60)
    block18 = new Block(3200,200, 45, 110)
    tutG = new Ground(window.innerWidth, 390);
    allEnemies.push(aBlock)
    allEnemies.push(a2Block)

}
const animation = () => {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, innerWidth, innerHeight);
    first.thePlayer(first.leftX, first.topY, first.width, first.height);
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

    tutG.theGround(tutG.x, tutG.y);


    // ground
    game.colDetObjTop(first.leftX, first.rightX, 0, tutG.x, first.bottomY, tutG.y)

    //first object


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
