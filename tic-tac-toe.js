window.addEventListener("DOMContentLoaded", () => {
	var board = document.getElementById("board");
	for (var i = 0; i < board.children.length; i++) {
		board.children[i].className += "square";
	}
});
