const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext('2d');

// rasm boom dar safhe 
ctx.fillStyle = 'white';
ctx.strokeStyle = 'black';
ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height);
ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height);

let snake = [
   {x : 150 , y : 150},
   {x : 140 , y : 150},
   {x : 130 , y : 150},
   {x : 120 , y : 150},
   {x : 110 , y : 150}
]

// rasm kardan mokhtasat snake dar boom
snake.forEach(snakePart => {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";

    ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
    ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
});

let foodX ;
let foodY;

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

//  rasme food dar boom
creatFood();
ctx.fillStyle = "red";
ctx.strokeStyle = "darkred";
ctx.fillRect(foodX , foodY , 10 , 10);
ctx.strokeRect(foodX , foodY , 10 , 10);
