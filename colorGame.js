var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var menu = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function() {
    reset();
})

// Sets up event listeners and resets colors to initialize game
function init() {
    initModeListeners();
    initSquareListeners();
    reset();
}

// Changes all squares to match provided color
function changeAllColors(color) {
    // Loop through all squares
    for(var i = 0; i < colors.length; i++) {
        // Change each color to match picked color
        squares[i].style.backgroundColor = color;
    }
}

// Picks a random color from the colors array
function pickColor() {
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

// Creates an array of random colors
function generateColors(numOfColors) {
    var arr = [];
    for(var i = 0; i < numOfColors; i++) {
        arr[i] = randomColor();
    }
    return arr;
}

// Returns a string representing a random rgb value
function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + blue + ", " + green + ")";
}

function reset() {
    // Generate new colors
    colors = generateColors(numSquares);
    // Pick new random color
    pickedColor = pickColor();
    // Change color display to match pickedColor
    colorDisplay.textContent = pickedColor;
    // Reset message display
    messageDisplay.textContent = "";
    // Reset button display
    resetButton.textContent = "New Game"
    // Change colors of squares
    for(var i = 0; i < squares.length; i++) {
        // Check if color exists
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

// Initializes mode event listeners
function initModeListeners() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected")
            modeButtons[1].classList.remove("selected")
            this.classList.add("selected");
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

// Initializes square event listeners
function initSquareListeners() {
    for(var i = 0; i < squares.length; i++) {
        // Add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            var currentColor = this.style.backgroundColor;
            // compare color to picked color
            if(currentColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeAllColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again";
            } else {
                this.style.backgroundColor = "#212121";
                messageDisplay.textContent = "Try again!"
            }
        });
    }
}
