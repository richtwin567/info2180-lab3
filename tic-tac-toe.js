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

		board.children[i].addEventListener("click", (s) =>
			makeMove(s.toElement, s.toElement.id)
		);
	}
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
	if (turn.isO()) {
		placeO(square, position);
	} else {
		placeX(square, position);
	}
	turn.next();
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
