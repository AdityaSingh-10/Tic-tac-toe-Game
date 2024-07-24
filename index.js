const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function init() {
    // Set Current Player to X 
    currentPlayer = 'X';
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

    //to empty boxes 
    boxes.forEach((box,index)=>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents  = "all";
        
        //to re-initialize css properties
        box.classList = `box box${index+1}`;
    })

    // Empty Kar Do Boxes 
    gameGrid = ["", "", "", "", "", "", "", "", ""];


    // Remove Active Class From Button
    newGameBtn.classList.remove("active");


}

init();


function swapturn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //updating UI
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}


function gameover(){
    let ans = "";

    winningPositions.forEach((pos)=>{
        if( (gameGrid[pos[0]] !== "" || gameGrid[pos[1]] !== "" || gameGrid[pos[2]] !== ""  ) && (gameGrid[pos[0]] === gameGrid[pos[1]]) && (gameGrid[pos[1]] === gameGrid[pos[2]]) ){

                if(gameGrid[pos[0]] === "X"){
                    ans = "X";
                }
                else{
                    ans = "O";
                }

                 //pointer disable
                 boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                })

                //now,we get know who has won,then
                boxes[pos[0]].classList.add("win");
                boxes[pos[1]].classList.add("win");
                boxes[pos[2]].classList.add("win");
        }    
    });


                //we got ourselves a winner,then
                if(ans !== ""){
                    gameInfo.innerHTML = `Winner - ${ans}`;
                    newGameBtn.classList.add("active");
                    return;
                }

                //game tie condition
                let fill = 0;
                gameGrid.forEach((box) =>{
                    if(box !== ""){
                        fill++;
                    }
                });

                //filled condition,then
                if(fill === 9){
                    gameInfo.innerHTML = "Game tied !";
                    newGameBtn.classList.add("active");
                }
            }      

// ************key function-2***************
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        
        //updating gamegrid
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents  = "none";

        //swapping of turns
        swapturn();

        //gameover condition checking
        gameover();
    }
}

// *****************KEY FUNCTION-1****************
boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
 });

newGameBtn.addEventListener("click",init);

