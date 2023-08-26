const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext('2d');


let snake = [
   {x : 150 , y : 150},
   {x : 140 , y : 150},
   {x : 130 , y : 150},
   {x : 120 , y : 150},
   {x : 110 , y : 150}
]

let foodX ;
let foodY;
 
function main() {
    setTimeout(() => {
        clearCanvas();
        drowFood();
        advanceSnake();
        drowSnake();

        main();
    }, 300)
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

// harekat snak dar jahat bala 
let advanceSnake = () => {
    const head = {x : snake[0].x + 0 , y: snake[0].y - 10};
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


main();
