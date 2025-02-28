/* Keyboard shortcuts */

export function handleKeyUp(e) {
	// debug(e.which || e.keyCode);
	if (e.ctrlKey && (e.which || e.keyCode) == 77) {
		/* Ctrl + M */
		// revealMoreCards();
	}
}

document.onkeyup = handleKeyUp;