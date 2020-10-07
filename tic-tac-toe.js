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

var tracker = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

window.addEventListener("DOMContentLoaded", () => {
	var board = document.getElementById("board");
	for (var i = 0; i < board.children.length; i++) {
		board.children[i].className += "square";
		board.children[i].id += i + 1;

		board.children[i].addEventListener("mouseover", (s) => {
			s.toElement.className += " hover";
		});
		board.children[i].addEventListener("mouseout", (s) => {
			s.fromElement.className = s.fromElement.className.replace(
				" hover",
				" "
			);
		});

		board.children[i].addEventListener("click", (s) =>
			makeMove(s.toElement, s.toElement.id)
		);
	}
	var btn = document.getElementsByClassName("btn");
	btn[0].addEventListener("click", newGame);
});

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
	for (var row of tracker) {
		if (row[0] == row[1] && row[0] == row[2]) {
			if (row[0] != null) {
				return row[0];
			}
		}
	}

	//check the colums next
	for (var col = 0; col < 3; col++) {
		//check if the column has a winning combination
		if (
			tracker[0][col] == tracker[1][col] &&
			tracker[0][col] == tracker[2][col]
		) {
			if (tracker[0][col] != null) {
				return tracker[0][col];
			}
		}
	}

	//check the diagonals for winning combinations

	if (tracker[0][0] == tracker[2][2] && tracker[0][0] == tracker[1][1]) {
		if (tracker[0][0] != null) {
			return tracker[0][0];
		}
	}

	if (tracker[0][2] == tracker[1][1] && tracker[2][0] == tracker[0][2]) {
		if (tracker[0][2] != null) {
			return tracker[0][2];
		}
	}
}

function declareWinner(winner) {
	if (winner != null) {
		document.getElementById("status").innerHTML =
			"Congratulations! " + winner + " is the Winner!";
		document.getElementById("status").className = "you-won";
		return true;
	}
	return false;
}

function newGame() {
	var board = document.getElementById("board");
	for (var i = 0; i < board.children.length; i++) {
		board.children[i].className = "square";
		board.children[i].innerHTML = "";
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
