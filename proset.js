function drawCard(x, y, r, a, b, dots) {
    //x and y are upper-left of card, r is curvature of corners, a and b are width, length
    //dots = the actual colored dots
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI, 3/2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x+a, y, r, 3/2*Math.PI, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x+a, y+b, r, 0, 1/2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y+b, r, 1/2*Math.PI, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y-r);
    ctx.lineTo(x+a, y-r);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y+r+b);
    ctx.lineTo(x+a, y+r+b);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x-r, y);
    ctx.lineTo(x-r, y+b);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+a+r, y);
    ctx.lineTo(x+a+r, y+b);
    ctx.stroke();
}
drawCard(50, 350, 40, 140, 200);
drawCard(290, 350, 40, 140, 200);
drawCard(530, 350, 40, 140, 200);
drawCard(170, 50, 40, 140, 200);
drawCard(410, 50, 40, 140, 200);
drawCard(170, 650, 40, 140, 200);
drawCard(410, 650, 40, 140, 200);

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function binConvert(int) {
    var x = int.toString(2).split('');
    while (x.length != 6) {
        x.unshift('0');
    }
    var y = [];
    for (var i = 0; i < 6; i++) {
        y.push(parseInt(x[i]));
    }
    return y;
}

function addCards(cards) {
    var sum = 0;
    for (var i = 0; i < cards.length; i++) {
        sum = sum ^ cards[i];
    }
    return sum;
}

let currcards = [];
//the "binary" values of each of the current cards
let cardsRemaining = 63;
let w = false; 
let e = false;
let a = false; 
let s = false; 
let d = false; 
let z = false; x = false;
let selected = [];
let deck = arrayRange(1,63,1);
let coordinates = [[125,5],[365,5],[5,305],[245,305],[485,305],[125,605],[365,605]];
let colorcodes = [[127, 0, 255], [51, 153, 255], [0, 204, 0], [235, 235, 20],[255, 128, 0],[255,51,51]].reverse();
let realdeck = arrayRange(1,63,1);
let currcard = 0;

function highlightCard(int, state) {
    //input the card you are highlighting
    if (state == true) {
        var cardx = coordinates[int][0];
        var cardy = coordinates[int][1];
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = `rgba(128, 229, 255, 0.75)`
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cardx, cardy);
        ctx.lineTo(cardx+230, cardy);
        ctx.lineTo(cardx+230, cardy+290);
        ctx.lineTo(cardx, cardy+290);
        ctx.lineTo(cardx, cardy);
        ctx.stroke();
    } else {
        var cardx = coordinates[int][0];
        var cardy = coordinates[int][1];
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = `rgb(255, 255, 255)`
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cardx, cardy);
        ctx.lineTo(cardx+230, cardy);
        ctx.lineTo(cardx+230, cardy+290);
        ctx.lineTo(cardx, cardy+290);
        ctx.lineTo(cardx, cardy);
        ctx.stroke();
    }
}

document.getElementById("remaining").innerHTML = cardsRemaining.toString();
document.addEventListener("keypress", function(event) {
    if (event.key == "w"){
        w = !w;
        if (w == true) {
            highlightCard(0, true);
        } else {
            highlightCard(0, false);
        }
    } else if (event.key == "e") {
        e = !e;
        if (e == true) {
            highlightCard(1, true);
        } else {
            highlightCard(1, false);
        }
    } else if (event.key == "a") {
        a = !a;
        console.log(a);
        if (a == true) {
            highlightCard(2, true);
        } else {
            highlightCard(2, false);
        }
    } else if (event.key == "s") {
        s = !s;
        if (s == true) {
            highlightCard(3, true);
        } else {
            highlightCard(3, false);
        }
    } else if (event.key == "d") {
        d = !d;
        if (d == true) {
            highlightCard(4, true);
        } else {
            highlightCard(4, false);
        }
    } else if (event.key == "z") {
        z = !z;
        if (z == true) {
            highlightCard(5, true);
        } else {
            highlightCard(5, false);
        }
    } else if (event.key == "x") {
        x = !x;
        if (x == true) {
            highlightCard(6, true);
        } else {
            highlightCard(6, false);
        }
    } else if (event.key == "Enter") {
        var cardsinset = [];
        var indices = [];
        if (w == true) {
            cardsinset.push(currcards[0]);
            indices.push(0);
        }
        if (e == true) {
            cardsinset.push(currcards[1]);
            indices.push(1);
        } 
        if (a == true) {
            cardsinset.push(currcards[2]);
            indices.push(2);
        }
        if (s == true) {
            cardsinset.push(currcards[3]);
            indices.push(3);
        }
        if (d == true) {
            cardsinset.push(currcards[4]);
            indices.push(4);
        }
        if (z == true) {
            cardsinset.push(currcards[5]);
            indices.push(5);
        } 
        if (x == true) {
            cardsinset.push(currcards[6]);
            indices.push(6);
        }
        if (addCards(cardsinset) == 0 && indices.length > 0) {
            for (var i = 0; i < indices.length; i++) {
                drawDotsClear(indices[i], [1,1,1,1,1,1]);
                if (cardsRemaining >= 1) {
                    currcards[indices[i]] = deck[currcard];
                    drawDotsColored(indices[i], realdeck[currcard]);
                    currcard += 1;
                    cardsRemaining -= 1;
                }
            } 
            if (cardsRemaining <= 0) {
                endGame();
            }
            w = false; e = false; a = false; s = false; d = false; z = false; x = false;
            for (var j = 0; j < 7; j++) {
                highlightCard(j, false);
            }
            document.getElementById("remaining").innerHTML = cardsRemaining.toString();
        } 
    } 
}
);

function endGame() {
    clearInterval(interval);
}

function drawDotsClear(card, colors) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cardx = coordinates[card][0];
    var cardy = coordinates[card][1];
    var dots = [];
    ctx.fillStyle = 'rgb(255, 255, 255)';
    for (var j = 1; j < 4; j++) {
        for (var i = 1; i < 3; i++) {
            dots.push([cardx-20+90*i, cardy-5+75*j]);
        }
    }
    for (var k = 0; k < 6; k++) {
        if (colors[k] == 1) {
            ctx.beginPath();
            ctx.arc(dots[k][0], dots[k][1], 27, 0, 2*Math.PI);
            ctx.fill();
        }
    }
}

function drawDotsColored(card, colors) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cardx = coordinates[card][0];
    var cardy = coordinates[card][1];
    var dots = [];
    for (var j = 1; j < 4; j++) {
        for (var i = 1; i < 3; i++) {
            dots.push([cardx-20+90*i, cardy-5+75*j]);
        }
    }
    for (var k = 0; k < 6; k++) {
        if (colors[k] == 1) {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${colorcodes[k][0]}, ${colorcodes[k][1]}, ${colorcodes[k][2]})`;
            ctx.arc(dots[k][0], dots[k][1], 25, 0, 2*Math.PI);
            ctx.fill();
        }
    }

}
let startTime = 0;
let time = 0;

function initializeGame() {
    document.getElementById("stopwatch").innerHTML = 0;
    clearInterval(interval);
    currcards = [];
    //the "binary" values of each of the current cards
    cardsRemaining = 63;
    w = false; e = false; a = false; s = false; d = false; z = false; x = false;
    selected = [];
    deck = arrayRange(1,63,1);
    realdeck = [];
    shuffleArray(deck);
    for (var i = 0; i < deck.length; i++) {
        realdeck.push(binConvert(deck[i]));
    }
    document.getElementById("remaining").innerHTML = cardsRemaining.toString();
    for (var b = 0; b < coordinates.length; b++) {
        arr = coordinates[b];
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = `rgb(255, 255, 255)`
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(arr[0], arr[1]);
        ctx.lineTo(arr[0]+230, arr[1]);
        ctx.lineTo(arr[0]+230, arr[1]+290);
        ctx.lineTo(arr[0], arr[1]+290);
        ctx.lineTo(arr[0],arr[1]);
        ctx.stroke();
    }
    for (var i = 0; i < 7; i++) {
        drawDotsClear(i, [1,1,1,1,1,1]);
    }
}

let interval = 0;
initializeGame();

function updateStopwatch() {
    da = new Date();
    document.getElementById("stopwatch").innerHTML = (da.getTime() - startTime)/1000;
}


function startGame() {
    initializeGame();
    currcard = 0;
    de = new Date();
    startTime = de.getTime();
    interval = setInterval(updateStopwatch, 15);
    //what card we are currently on
    for (var i = 0; i < 7; i++) {
        currcards.push(deck[currcard]);
        drawDotsColored(i, realdeck[currcard]);
        currcard += 1;
        cardsRemaining -= 1;
    }
    document.getElementById("remaining").innerHTML = cardsRemaining.toString();
}