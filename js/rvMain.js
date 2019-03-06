/* Redemption Card Viewer Main */

var cardDataUrl = "https://raw.githubusercontent.com/MattJBrinkman/RedemptionLackeyCCG/master/RedemptionQuick/sets/carddata.txt";
var cardImageBaseUrl = "http://www.redemptionquick.com/lackey/sets/setimages/general/";

var cardListText = "";
var cardFilterTextBox;
var resultList;

window.requestAnimationFrame(function () {
	cardFilterTextBox = document.getElementById("cardFilterTextBox");
	resultList = document.getElementById("resultList");

	loadCardListText();
});

function loadCardListText() {
	$.get(cardDataUrl, function(data) {
		cardListText = data;
		cardListLoaded();
	});
}

function cardListLoaded() {
	processCardList();
}

var cardList = [];
function processCardList() {
	var lines = cardListText.split("\n");
	debug(lines.length);
	cardList = [];
	for (var i in lines) {
		var line = lines[i];
		if (i > 0 && line && line.trim() !== "") {
			cardList.push(new Card(line));
		}
	}

	for (var i in cardList) {
		var card = cardList[i];
		if (i >= cardList.length - 5) {
			debug(card.toString());
		}
	}
}

var timeoutId;
function cardFilterChanged() {
	debug(cardFilterTextBox.value);
	clearTimeout(timeoutId);
	debug("timeout cleared");
	timeoutId = setTimeout(function() {
		filterCards();
	}, 400);
}

function filterCards() {
	var filterTextFull = cardFilterTextBox.value.toUpperCase();
	if (filterTextFull.length > 3) {
		var filterTextList = filterTextFull.split(";");
		debug(filterTextList);
		var resultCards = [];
		for (var i in cardList) {
			var card = cardList[i];
			for (var filterTextIndex in filterTextList) {
				var filterTextChunk = filterTextList[filterTextIndex];
				if (card.dataLine.toUpperCase().includes(filterTextChunk)) {
					resultCards.push(card);
					continue;
				}
			}
		}

		debug("--- Filter Results ---");
		// clear resultList
		while (resultList.lastChild) {
			resultList.removeChild(resultList.lastChild);
		}
		for (var i in resultCards) {
			var card = resultCards[i];
			if (i < 5) {
				debug(card);
			}
			resultList.appendChild(card.resultListDiv);
		}
	}
}
