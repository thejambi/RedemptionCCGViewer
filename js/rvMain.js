/* Redemption Card Viewer Main */

var cardDataUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/master/RedemptionQuick/sets/carddata.txt";
// var cardImageBaseUrl = "http://www.redemptionquick.com/lackey/sets/setimages/general/";
var cardImageBaseUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/master/RedemptionQuick/sets/setimages/general/";

var cardListText = "";
var cardFilterTextBox;
var filterEchoDiv;
var resultList;

window.requestAnimationFrame(function () {
	cardFilterTextBox = document.getElementById("cardFilterTextBox");
	resultList = document.getElementById("resultList");
	filterEchoDiv = document.getElementById("filterEcho");

	loadCardListText();

	prepareCardFilterTextBox();

	document.getElementById("filterNowButton").onclick = function(e){
		cardFilterChanged();
	};
});

function prepareCardFilterTextBox() {
	cardFilterTextBox.oninput = function(e){
		cardFilterChanged();
	};
	cardFilterTextBox.onkeypress = function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		 if(code == 13) {
		   cardFilterChanged();
		 }
	};
}

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

var requiredFilterLength = 3;
function filterCards() {
	var filterTextFull = cardFilterTextBox.value.trim().toUpperCase();
	filterEchoDiv.innerText = filterTextFull;
	
	var filterTextList = filterTextFull.split(";");
	debug(filterTextList);

	var resultCards = [];

	for (var i in cardList) {
		var card = cardList[i];
		for (var filterTextIndex in filterTextList) {
			var filterText = filterTextList[filterTextIndex];
			if (filterText.length >= requiredFilterLength
					&& cardMatchesFilterText(card, filterText)) {
				resultCards.push(card);
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
			resultList.appendChild(card.getResultListDiv());
		} else {
			resultList.appendChild(card.getNameOnlyDiv());
		}
	}
}

function cardMatchesFilterText(card, filterText) {
	var filterTextChunks = filterText.trim().split(",");
	var chunkFound = false;
	for (var chunkIndex in filterTextChunks) {
		var filterTextChunk = filterTextChunks[chunkIndex].trim();
		if (card.dataLine.toUpperCase().includes(filterTextChunk)) {
			chunkFound = true;
		} else {
			chunkFound = false;
		}
		if (!chunkFound) {
			return false;
		}
	}
	return chunkFound;
}


