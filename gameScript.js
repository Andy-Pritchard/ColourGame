
let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll('.square');
let colorDisplay = document.querySelectorAll('#color-display');
let messageDisplay = document.getElementById('message');
let h1 = document.querySelectorAll('h1');
let resetButton = document.getElementById('reset');
let modeButtons = document.querySelectorAll(".mode");
var easyButton = document.querySelector(".mode");


// makes a color in rgb format
const makeColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

//creates an array of rgb colors with the number of inputs in the array the total of 'num' input
const genRandomColors = (num) => {
    let arr = [];
    for(let i=0; i < num; i++) {
        arr.push(makeColor());
    }
    return arr;
}

function chooseColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//changes the background color of each square to match the 'color''input
const changeColors = (color) => {
    for (let i=0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

const reset = () => {
    colors = genRandomColors(numSquares);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "#2C8E99";
    resetButton.textContent = 'New Colors';
    messageDisplay.textContent = '';
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
}

const setUpMode = () => {
    for (let i=0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            for(let i = 0; i < modeButtons.length; i++) {
                modeButtons[i].classList.remove('selected')
            }
            this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			}
			else {
				numSquares = 6;
			}
			reset();
        })
    }
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again";
				changeColors(pickedColor);
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "try again";
			}
		});
	}
}

function init() {
	colorDisplay.textContent = pickedColor;
	setupSquares();
	setupMode();
	reset();
}

init();