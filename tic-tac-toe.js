class Turn {
	constructor() {
		this.count = 0;
	}

	isO() {
		return this.count % 2 != 0;
	}

	isX() {
		return this.count % 2 == 0;
	}

	next() {
		this.count++;
	}

	reset() {
		this.count = 0;
	}
}

var turn = new Turn();

var tracker;

window.addEventListener("DOMContentLoaded", () => {
	initBoard();
	var btn = document.getElementsByClassName("btn");
	btn[0].addEventListener("click", newGame);
});

var move = function(s) {
	makeMove(s.toElement, s.toElement.id);
};

function initBoard() {
	var board = document.getElementById("board");
	for (var i = 0; i < board.children.length; i++) {
		board.children[i].className = "square";
		board.children[i].id = i + 1;

		board.children[i].addEventListener("mouseover", (s) => {
			s.toElement.className += " hover";
		});
		board.children[i].addEventListener("mouseout", (s) => {
			s.fromElement.className = s.fromElement.className.replace(
				" hover",
				""
			);
		});

		board.children[i].addEventListener("click", move);
	}

	tracker = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
}

function placeX(square, position) {
	square.className = "square X";
	square.innerHTML = "X";
	var arrPos = calcArrPos(position);
	tracker[arrPos.row][arrPos.col] = "X";
}

function placeO(square, position) {
	square.className = "square O";
	square.innerHTML = "O";
	var arrPos = calcArrPos(position);
	tracker[arrPos.row][arrPos.col] = "O";
}

function makeMove(square, position) {
	if (isEmpty(square)) {
		if (turn.isO()) {
			placeO(square, position);
		} else {
			placeX(square, position);
		}
		if (declareWinner(checkWinner())) {
			turn.reset();
		} else {
			turn.next();
		}
	}
}

function isEmpty(square) {
	return square.innerHTML == "";
}

function calcArrPos(boardPosition) {
	var r, c;
	if (boardPosition < 4) {
		r = 0;
	} else if (boardPosition < 7) {
		r = 1;
	} else {
		r = 2;
	}

	if (boardPosition == 1 || boardPosition == 4 || boardPosition == 7) {
		c = 0;
	} else if (boardPosition == 2 || boardPosition == 5 || boardPosition == 8) {
		c = 1;
	} else {
		c = 2;
	}

	return { row: r, col: c };
}

function checkWinner() {
	//check if any rows in the tracker have a winning combination first
	var filledRows = 0;
	var filledCol = 0;
	var filledDiag = 0;
	for (var row of tracker) {
		if (row[0]!= null && row[1]!= null && row[2]!=null) {
			filledRows++;
			if (row[0] == row[1] && row[0] == row[2]) {
				return row[0];
			}
		}
	}

	//check the colums next
	for (var col = 0; col < 3; col++) {
		//check if the column has a winning combination
		if (
			tracker[0][col] != null &&
			tracker[1][col] != null &&
			tracker[2][col] != null
		) {
			filledCol++;
			if (
				tracker[0][col] == tracker[1][col] &&
				tracker[0][col] == tracker[2][col]
			) {
				return tracker[0][col];
			}
		}
	}

	//check the diagonals for winning combinations
	if (
		tracker[0][0] != null &&
		tracker[2][2] != null &&
		tracker[1][1] != null
	) {
		filledDiag++;
		if (tracker[0][0] == tracker[2][2] && tracker[0][0] == tracker[1][1]) {
			return tracker[0][0];
		}
	}

	if (
		tracker[0][2] != null &&
		tracker[1][1] != null &&
		tracker[2][0] != null
	) {
		filledDiag++;
		if (tracker[0][2] == tracker[1][1] && tracker[2][0] == tracker[0][2]) {
			return tracker[0][2];
		}
	}

	if (filledRows == 3 && filledCol == 3 && filledDiag == 2) {
		return "Neither";
	}
}

function declareWinner(winner) {
	if (winner != null) {
		if(winner=='X' || winner=='O'){
		document.getElementById("status").innerHTML =
			"Congratulations! " + winner + " is the Winner!";
		document.getElementById("status").className = "you-won";}
		else{
			document.getElementById("status").innerHTML =
			"It's a draw!";
		}
		deactivateBoard();
		return true;
	}
	return false;
}

function newGame() {
	var board = document.getElementById("board");
	for (var i = 0; i < board.children.length; i++) {
		board.children[i].className = "square";
		board.children[i].innerHTML = "";
		board.children[i].addEventListener("click", move);
	}

	document.getElementById("status").innerHTML =
		"Move your mouse over a square and click to play an X or an O.";
	document.getElementById("status").className = "";


	tracker = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

}

function deactivateBoard() {
	var board = document.getElementById("board");
	for (var i = 0; i < board.children.length; i++) {
		board.children[i].removeEventListener("click", move);
	}
}
