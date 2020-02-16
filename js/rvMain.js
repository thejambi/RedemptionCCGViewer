/* Redemption CCG Viewer Main */

var cardDataUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/master/RedemptionQuick/sets/carddata.txt";
var cardImageBaseUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/master/RedemptionQuick/sets/setimages/general/";

/* For Testing: */
var cardDataUrlPrev = "file:///Users/zach/Programming/GitHub/RedemptionLackeyCCG/RedemptionQuick/sets/carddata.txt";
var cardImageBaseUrlPrev = "file:///Users/zach/Programming/GitHub/RedemptionLackeyCCG/RedemptionQuick/sets/setimages/general/";
/* --- */

var cardListText = "";
var cardFilterTextBox;
var filterEchoDiv;
var resultList;
var searchLinkTag;
var baseUrl;
var localStorage;
var cardList = [];

window.requestAnimationFrame(function() {
	cardFilterTextBox = document.getElementById("cardFilterTextBox");
	resultList = document.getElementById("resultList");
	filterEchoDiv = document.getElementById("filterEcho");
	searchLinkTag = document.getElementById("searchLink");
	localStorage = new LocalStorage().storage;

	setBaseUrl();

	loadCardListText();

	prepareCardFilterTextBox();

	if (QueryString.f) {
		cardFilterTextBox.value = QueryString.f;
	}

	document.getElementById("siteHeading").onclick = function(e){
		window.location.href = baseUrl;
	};

	searchLinkTag.href = window.location.href;

	cardFilterChanged();
});

function setBaseUrl() {
	baseUrl = window.location.href.split(/[?#]/)[0];
}

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
		processCardList();
	});
}

function processCardList() {
	var lines = cardListText.split("\n");
	cardList = [];
	for (var i in lines) {
		var line = lines[i];
		if (i > 0 && line && line.trim() !== "") {
			cardList.push(new Card(line));
		}
	}
}

var timeoutId;
var filterTimeoutWait = 600;
function cardFilterChanged() {
	debug(cardFilterTextBox.value);
	clearTimeout(timeoutId);
	debug("timeout cleared");
	timeoutId = setTimeout(function() {
		updateSearchLinkTag();
		filterCards();
	}, filterTimeoutWait);
}

function updateSearchLinkTag() {
	var urlParams = "f=" + encodeURIComponent(cardFilterTextBox.value.trim());
	if (compressSearchForShareLink) {
		urlParams = LZString.compressToEncodedURIComponent(urlParams);
	}
	searchLinkTag.href = baseUrl + "?" + urlParams;
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
		if (!resultCards.includes(card)) {
			for (var filterTextIndex in filterTextList) {
				var filterText = filterTextList[filterTextIndex];
				if (filterText.length >= requiredFilterLength
						&& cardMatchesFilterText(card, filterText)) {
					resultCards.push(card);
					break;	// Break out of filters loop, skip to next card
				}
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

	if (resultCards.length === 0) {
		resultList.appendChild(getAboutDiv());
	}
}

function cardMatchesFilterText(card, filterText) {
	var filterTextChunks = filterText.trim().split(",");
	var chunkFound = false;
	for (var chunkIndex in filterTextChunks) {
		var filterTextChunk = filterTextChunks[chunkIndex].trim();
		if (filterTextChunk.includes(":")) {
			var colonIndex = filterTextChunk.indexOf(":");
			var cardPartStr = filterTextChunk.slice(0, colonIndex);
			if (filterTextChunk.length > colonIndex) {
				var matchValueStr = filterTextChunk.slice(colonIndex + 1);
				var cardPartValue = card.dataLine;
				switch (cardPartStr.toUpperCase()) {
					case "NAME":
					case "N":
						cardPartValue = card.name;
						break;
					case "SET":
					case "S":
						cardPartValue = card.set;
						break;
					case "IMGFILE":
					case "IF":
						cardPartValue = card.imgFile;
						break;
					case "TYPE":
					case "T":
						cardPartValue = card.type;
						break;
					case "BRIGADE":
					case "B":
						cardPartValue = card.brigade;
						break;
					case "STRENGTH":
					case "X/":
						cardPartValue = card.strength;
						break;
					case "TOUGHNESS":
					case "/X":
						cardPartValue = card.toughness;
						break;
					case "CLASS":
					case "C":
						cardPartValue = card.class;
						break;
					case "IDENTIFIER":
					case "I":
						cardPartValue = card.identifier;
						break;
					case "ABILITY":
					case "A":
						cardPartValue = card.specialAbility;
						break;
					case "RARITY":
					case "R":
						cardPartValue = card.rarity;
						break;
					case "REFERENCE":
					case "REF":
						cardPartValue = card.reference;
						break;
					default:
						break;
				}
				chunkFound = cardPartValue.toUpperCase().includes(matchValueStr);
			}
		} else {
			chunkFound = card.dataLine.toUpperCase().includes(filterTextChunk);
		}
		if (!chunkFound) {
			return false;
		}
	}
	return chunkFound;
}

function getAboutDiv() {
	var theDiv = document.createElement("div");
	theDiv.innerHTML = "Search for cards based on name, set, ability, and more. Use <strong>,</strong> to add another criteria (so, search for <strong>Adam,Fall of Man</strong> to find cards that match both \"Fall of Man\" and \"Adam\"). Use <strong>;</strong> to add another search."
		+ "<br /><p>You can also search certain parts of cards. Begin a part of your search with any of the following to search in that part of the card.</p><p>Name: (or N:) <br />Set: (or S:) <br />Type: (or T:) <br />Brigade: (or B:) <br />Strength: (or X/:) <br />Toughness: (or /X:) <br />Class: (or C:) <br />Identifier: (or I:) <br />Ability: (or A:) <br />Rarity: (or R:) <br />Reference: (or Ref:)</p><p>Some examples... <br />Type:Dominant,Brigade:Good <br />Type:Hero,Ability:Lost Soul <br />ref:Kings 19</p>";
	return theDiv;
}

function toggleLocalTesting() {
	var newCardDataUrl = cardDataUrlPrev;
	cardDataUrlPrev = cardDataUrl;
	cardDataUrl = newCardDataUrl;

	var newImageUrl = cardImageBaseUrlPrev;
	cardImageBaseUrlPrev = cardImageBaseUrl;
	cardImageBaseUrl = newImageUrl;

	debug("Card Data Url: " + cardDataUrl);
	debug("Card Image Url: " + cardImageBaseUrl);
	loadCardListText();
}
