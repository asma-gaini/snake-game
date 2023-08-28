const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext('2d');

let snake = [
    {x : 150 , y : 150},
    {x : 140 , y : 150},
    {x : 130 , y : 150},
    {x : 120 , y : 150},
    {x : 110 , y : 150}
]

// Food location
let foodX ;
let foodY;
//  snake path direction 
let dx = 10;
let dy = 0;
score = 0;

/*vaghti chand dokme hamzaman bokhore hang mikone chon modatesh tamom nashode
pas miyaym moteghayere changingDirection ru dar enteda false mizarim 
va vaghti true hast migim code haye harekatimon ejra nashe  va zamani false mikonim k 
tu main kamek code ha ejra shode bashe k hang nakone yani ghbl ejra kamel ye klid
klid dg kar nemikone */
let changingDirection = false;

// harekat snak dar jahat haye mokhtalef
document.addEventListener('keydown' , changeDirection);

main();
creatFood();


function main() {
    if(didGameEnd())
        return;

    setTimeout(() => {
        changingDirection = false;
        clearCanvas();
        drowFood();
        advanceSnake();
        drowSnake();

        main();
    }, 100)
}

function didGameEnd(){
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width -10;
    const hitUpWall = snake[0].y < 0;
    const hitDownWall = snake[0].y > gameCanvas.height -10;

    return hitLeftWall || hitRightWall || hitUpWall || hitDownWall;
}

// rasm boom dar safhe va har bar pak kardan an
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height);
    ctx.strokeRect(0 , 0 , gameCanvas.width , gameCanvas.height);
}

// eejade mokhtasat baraye food 
function randomNumber(max , min) {
    return Math.round((Math.random() * (max - min) + min ) /10) *10;
} 

// food dar noghte goshe ha ya ro khode snake nayofte
function creatFood() {
    foodX = randomNumber(0 , gameCanvas.width-10);
    foodY = randomNumber(0 , gameCanvas.height-10);
    snake.forEach((snakePart) => {
        if (snake.x == foodX && snakePart.y ==foodY) {
            creatFood();
        }
    })
}

// ejra va harekat snake dar jahat ha ba b vojod avordan yek head va sar jadid baraye snak va delete dom
function advanceSnake() {
    const head = {x : snake[0].x + dx , y : snake[0].y + dy};
    snake.unshift(head);

    // age head snake ru food bud  score + she va food jadid  va dom pak nashe
    if(head.x == foodX && head.y == foodY){
        score += 10;
        document.getElementById('score').innerHTML = score;
        creatFood();
    }
    else{
        // ag ru food nabod domesh pak she 
        snake.pop();
    }
}


// rasm kardan mokhtasat snake dar boom
function drowSnake() {
    return snake.forEach(drowSnakePart);
}

function drowSnakePart(snakePart){
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";

    ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
    ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
}

//  rasme food dar boom
function drowFood() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX , foodY , 10 , 10);
    ctx.strokeRect(foodX , foodY , 10 , 10);
}

function changeDirection(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const Up_KEY = 38;
    const DOWN_KEY = 40;

    if( changingDirection )
        return;

    changingDirection = true;

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

