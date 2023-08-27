const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext('2d');

let foodX ;
let foodY;
let dx = 0;
let dy = 0;

// harekat snak dar jahat haye mokhtalef
document.addEventListener('keydown' , changeDirection);
function changeDirection(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const Up_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    if (keyPressed == LEFT_KEY && dx != 10) {
        dx = -10 ;
        dy = 0;
    }
    if(keyPressed == RIGHT_KEY && dx != -10) {
        dx = 10 ;
        dy = 0;
    }
    if (keyPressed == Up_KEY && dy != 10) {
        dx = 0 ;
        dy = -10;  
    }
    if (keyPressed == DOWN_KEY && dy != -10) {
        dx = 0 ;
        dy = 10;
    }
}

let snake = [
   {x : 150 , y : 150},
   {x : 140 , y : 150},
   {x : 130 , y : 150},
   {x : 120 , y : 150},
   {x : 110 , y : 150}
]

main();

function main() {
    setTimeout(() => {
        clearCanvas();
        drowFood();
        advanceSnake();
        drowSnake();

        main();
    }, 200)
}

// rasm boom dar safhe va har bar pak kardan an
clearCanvas = () => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height);
    ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height);
}

// eejade mokhtasat baraye food 
let randomNumber = (max , min) => Math.round((Math.random() * (max - min) + min ) /10) *10;

// food dar noghte goshe ha ya ro khode snake nayofte
let creatFood = () => {
    foodX = randomNumber(0 , gameCanvas.width-10);
    foodY = randomNumber(0 , gameCanvas.height-10);
    snake.forEach((snakePart) => {
        if (snake.x == foodX && snakePart.y ==foodY) {
            creatFood();
        }
    })
}

// ejra va harekat snake dar jahat ha
let advanceSnake = () => {
    const head = {x : snake[0].x + dx , y : snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}


// rasm kardan mokhtasat snake dar boom
let drowSnake = () => snake.forEach(drowSnakePart);
let drowSnakePart = snakePart => {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";

    ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
    ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
}

//  rasme food dar boom
let drowFood = () => {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX , foodY , 10 , 10);
    ctx.strokeRect(foodX , foodY , 10 , 10);
}
creatFood();


