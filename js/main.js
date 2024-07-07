// start Game 
var inputName = document.querySelector(".control h2");
var playerName = document.querySelector(".name span");

inputName.onclick = function () {
    var name = prompt("What is your name ?");
    if (name == "" || name == null) {
        playerName.innerHTML = "Unknown";
    } else {
        playerName.innerHTML = name;
    }
    document.querySelector(".control").remove();
}

// main selector & variables

var duration = 1000;
var counter = 0;
var blocksContainer = document.querySelector(".memory-game-block");

// convert blocksContainer to array of blocks
var blocks = Array.from(blocksContainer.children);

// Shuffle the array using the Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (array.length));
        var temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;

    }
    return array;
}

var shuffledBlocks = shuffle(blocks);


shuffledBlocks.forEach((block, index) => {

    // use order with shuffle
    block.style.order = index;

    // using flip function with click event

    block.addEventListener('click', function () {
        flipBlock(block)
    }
    );

});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    // collect flipped blocks

    var allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //select 2 blocks

    if (allFlippedBlocks.length == 2) {
        // stop function
        stopClicking();

        // match function
        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}

function stopClicking() {
    // add noclicking class to blocks to no flipp more 2 blocks
    blocksContainer.classList.add('no-clicking');

    // remove noclicking after the duration

    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// check matched block



function checkMatched(firstBlock, secondBlock) {
    var triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('is-matched');
        secondBlock.classList.add('is-matched');

        document.querySelector('#success').play();

        


    } else {
        counter++;
        triesElement.innerHTML = counter;

        setTimeout(()=>{
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

    },duration);

    document.querySelector('#failed').play();


    }
    checkAllMatched();

}

function checkAllMatched() {
    var allMatched = blocks.every(block => block.classList.contains('is-matched'));

    if (allMatched) {
        clearTimeout(gameOverTimeout);
        alert("Congratulations! You've matched all the blocks.");
        
    }
}


var gameOverTimeout = setTimeout(() => {
    alert("Game Over");
    resetGame();
}, 300000); 

function resetGame() {
    blocks.forEach(block => {
        block.classList.remove('is-flipped', 'is-matched');
    });
    counter = 0;
    document.querySelector('.tries span').innerHTML = counter;
}




