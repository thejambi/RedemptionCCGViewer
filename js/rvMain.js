import { compressToEncodedURIComponent } from 'lz-string';

import { Card } from './Card.js';
import { LocalStorage } from './LocalStorage.js';
import { QueryString, compressSearchForShareLink, copyTextToClipboard, debug, setDebugOn } from './rvData.js';
import { debugOn } from './rvData';
import { versionNumber } from './version.js';

/* Redemption CCG Viewer Main */

export var cardDataUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/latest/RedemptionQuick/sets/carddata.txt";
export var cardImageBaseUrl = "https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/latest/RedemptionQuick/sets/setimages/general/";

/* For Testing: */
var cardDataUrlPrev = "file:///Users/zach/Programming/GitHub/RedemptionLackeyCCG/RedemptionQuick/sets/carddata.txt";
var cardImageBaseUrlPrev = "file:///Users/zach/Programming/GitHub/RedemptionLackeyCCG/RedemptionQuick/sets/setimages/general/";
/* --- */

export var nameOnlyClass = "nameOnly";

var cardListText = "";
var cardFilterTextBox;
var filterEchoDiv;
var resultList;
var baseUrl;
var localStorage;
var cardList = [];
var currentlyFiltering = false;

var cardsPerPage = 20; // Number of cards to load per scroll
var loadedCards = 0; // Counter to track how many cards are loaded so far

var copyLinkButton;
var searchLinkUrl;

window.requestAnimationFrame(function() {
	cardFilterTextBox = document.getElementById("cardFilterTextBox");
	resultList = document.getElementById("resultList");
	filterEchoDiv = document.getElementById("filterEcho");
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

	copyLinkButton = document.getElementById("copyLinkButton");

	copyLinkButton.onclick = function() {
		copyTextToClipboard(searchLinkUrl, copyLinkButton);
	};

	populateDropdowns();

	document.getElementById("toggleFilterMenuButton").onclick = function() {
		toggleFilterMenu();
	};

	document.getElementById("addFilterButton").onclick = function() {
		addAdditionalFilter();
	};

	document.getElementById("clearFiltersButton").onclick = function() {
		clearFilters();
	};

	// Add event listeners to filter inputs to apply filters automatically
	document.querySelectorAll('.filterInput').forEach(input => {
		input.addEventListener('input', applyFilter);
	});

	cardFilterChanged();
});

// Function to display the version number
function showVersionNumber() {
	var versionDiv = document.createElement("div");
	versionDiv.id = "versionNumber";
	versionDiv.style.position = "fixed";
	versionDiv.style.bottom = "10px";
	versionDiv.style.right = "10px";
	versionDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	versionDiv.style.color = "white";
	versionDiv.style.padding = "5px";
	versionDiv.style.borderRadius = "5px";
	versionDiv.innerText = "Version: " + versionNumber;
	document.body.appendChild(versionDiv);
}

// Function to hide the version number
function hideVersionNumber() {
	var versionDiv = document.getElementById("versionNumber");
	if (versionDiv) {
		versionDiv.remove();
	}
}

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
	debug("Loading card list text...");
	fetch(cardDataUrl)
		.then(response => response.text())
		.then(data => {
			cardListText = data;
			processCardList();
			populateDropdowns(); // Populate dropdowns after processing card list
		})
		.catch(error => {
			console.error('Error fetching card data:', error);
		});
}

function processCardList() {
	debug("Processing card list...");
	var lines = cardListText.split("\n");
	cardList = [];
	for (var i in lines) {
		var line = lines[i];
		if (i > 0 && line && line.trim() !== "") {
			cardList.push(new Card(line));
		}
	}

	if (applyDeckSort) {
		applyDeckSortToCardsList(cardList);
	} else if (applyAlphaSort) {
		applyAlphaSortToCardsList(cardList);
	}
}

var timeoutId;
var filterTimeoutWait = 600;
function cardFilterChanged() {
	clearTimeout(timeoutId);
	debug("timeout cleared");
	timeoutId = setTimeout(function() {
		if (!currentlyFiltering) {
			updateSearchLinkUrl();
			filterCards();
		}
	}, filterTimeoutWait);
}

function updateSearchLinkUrl() {
	var urlParams = "f=" + encodeURIComponent(cardFilterTextBox.value.trim());
	if (compressSearchForShareLink) {
		urlParams = compressToEncodedURIComponent(urlParams);
	}
	searchLinkUrl = baseUrl + "?" + urlParams;
}

var requiredFilterLength = 3;
var applyDeckSort = true;
function filterCards() {
	var filterTextOrig = cardFilterTextBox.value.trim();
	var filterTextFull = cardFilterTextBox.value.trim().toUpperCase();
	filterEchoDiv.innerText = filterTextFull;
	
	var filterTextList = filterTextFull.split(";");
	debug(filterTextList);

	var resultCards = [];

	/* Text Box Commands */
	for (var filterTextIndex in filterTextList) {
		var filterText = filterTextList[filterTextIndex];
		if ("SORT:DECK" === filterText) {
			applyDeckSort = true;
			applyAlphaSort = false;

			processCardList();
		}
		if ("SORT:ALPHA" === filterText) {
			applyAlphaSort = true;
			applyDeckSort = false;

			processCardList();
		}
		if ("SORT:OFF" === filterText) {
			applyDeckSort = false;
			applyAlphaSort = false;

			processCardList();
		}
		if ("DEBUG:ON" === filterText) {
			setDebugOn(true);
			showVersionNumber();
		} else if ("DEBUG:OFF" === filterText) {
			setDebugOn(false);
			hideVersionNumber();
		}
		if (filterText.includes("CARDDATA:")) {
			var newCardDataUrl = filterTextOrig.substring(filterTextOrig.indexOf(":") + 1);
			setCardDataLocation(newCardDataUrl);
		}
	}

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

	// Initialize the scroll loading
	loadedCards = 0;
	resultList.innerHTML = ''; // Clear the current list
	loadMoreCards(resultCards);

	// Set up infinite scrolling
	window.onscroll = function() {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			loadMoreCards(resultCards);
		}
	};
}

// Function to load more cards
function loadMoreCards(resultCards) {
	var end = loadedCards + cardsPerPage;
	for (var i = loadedCards; i < end && i < resultCards.length; i++) {
		var card = resultCards[i];
		resultList.appendChild(card.getResultListDiv(true));
	}
	loadedCards += cardsPerPage;

	// Stop scroll event listener if all cards are loaded
	if (loadedCards >= resultCards.length) {
		window.onscroll = null;
	}

	// Show about text when no search results
	if (resultCards.length === 0 && !document.getElementById("aboutDiv")) {
		const aboutDiv = getAboutDiv();
		aboutDiv.id = "aboutDiv";
		resultList.appendChild(aboutDiv);
	}
}

// Define custom orders for .type within .set and .brigade
const typeOrderWithinSet = [
	"Dominant", "Artifact", "Covenant", "Curse", "City", "Fortress", "Site",
	"Lost Soul", "DAC", "Hero/Evil Character", "DAE", "GE/EE", "Hero/GE"
];

const typeOrderWithinBrigade = [
	"Hero", "GE", "Evil Character", "EE"
];

const goodTypes = [ "Hero", "GE" ];
const evilTypes = [ "Evil Character", "EE" ];

function applyDeckSortToCardsList(cardList) {
	debug("SORTING!");
	// Sorting function
	cardList.sort((a, b) => {
		// Sort rotation cards to top
		if (a.legality > b.legality) return -1;
		if (a.legality < b.legality) return 1;

		// 1. Sort by .set (alphabetical)
		if (a.set < b.set) return -1;
		if (a.set > b.set) return 1;

		// 2. Sort by .type within .set (based on custom priority)
		let aTypeSetOrder = typeOrderWithinSet.indexOf(a.type);
		let bTypeSetOrder = typeOrderWithinSet.indexOf(b.type);
		if (aTypeSetOrder === -1) {
			aTypeSetOrder = 99;
		}
		if (bTypeSetOrder === -1) {
			bTypeSetOrder = 99;
		}
		if (aTypeSetOrder !== bTypeSetOrder) {
			// Sort according to the custom order
			return aTypeSetOrder - bTypeSetOrder;
		}

		// Next sort Good before bad
		let aGood = goodTypes.indexOf(a.type) >= 0 ? 1 : 2;
		let bGood = goodTypes.indexOf(b.type) >= 0 ? 1 : 2;
		if (aGood !== bGood) {
			return aGood - bGood;
		}

		// 3. Sort by .brigade (alphabetical)
		if (a.brigade < b.brigade) return -1;
		if (a.brigade > b.brigade) return 1;

		// 4. Sort by .type within .brigade (based on custom priority)
		const aTypeBrigadeOrder = typeOrderWithinBrigade.indexOf(a.type);
		const bTypeBrigadeOrder = typeOrderWithinBrigade.indexOf(b.type);
		if (aTypeBrigadeOrder !== bTypeBrigadeOrder) {
			// If either is not in the custom order, they will be treated as having lower priority
			return aTypeBrigadeOrder - bTypeBrigadeOrder;
		}

		// Sort by name last
		if (a.name < b.name) return -1;
		if (b.name < a.name) return 1;
		
		return 0;
	});
}

function applyAlphaSortToCardsList(cardList) {
	debug("SORTING!");
	// Sorting function
	cardList.sort((a, b) => {
		// Sort by name
		if (a.name < b.name) return -1;
		if (b.name < a.name) return 1;
		return 0;
	});
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
					case "SETNAME":
						cardPartValue = card.officialSet;
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
					case "TESTAMENT":
					case "TST":
					case "TEST":
						cardPartValue = card.testament;
						break;
					case "ALIGNMENT":
						cardPartValue = card.alignment;
						break;
					case "LEGALITY":
					case "L":
						cardPartValue = card.legality;
						if (matchValueStr === "R") {
							matchValueStr = "ROTATION";
						} else if (matchValueStr === "B") {
							matchValueStr = "BANNED";
						}
						break;
					default:
						break;
				}
				if (cardPartValue === undefined) {
					debug("No value to match on for card: ");
					debug(card);
				} else {
					chunkFound = cardPartValue.toUpperCase().includes(matchValueStr);
				}
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
		+ "<br /><p>You can also search certain parts of cards. Begin a part of your search with any of the following to search in that part of the card.</p><p>Name: (or N:) <br />Set: (or S:) <br />Type: (or T:) <br />Brigade: (or B:) <br />Strength: (or X/:) <br />Toughness: (or /X:) <br />Class: (or C:) <br />Identifier: (or I:) <br />Ability: (or A:) <br />Rarity: (or R:) <br />Reference: (or Ref:) <br />Alignment: <br />Legality (or L:) (r, rotation, b, banned) - see rotation legal cards with l:r<br />[Special filter] Testament: (or tst:) <i>OT</i> or <i>NT</i> ";
		// + "<br />[Special sort] Sort:deck (Sort cards by type for a deck listing) "
		+ "</p>";
		+ "<p>Some examples... <br />Type:Dominant,Brigade:Good <br />Type:Hero,Ability:Lost Soul <br />ref:Kings 19</p>";
	return theDiv;
}

function toggleLocalTesting() {
	setDebugOn(true);
	
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

function setCardDataLocation(newCardDataUrl) {
	currentlyFiltering = true;
	if (newCardDataUrl.endsWith('carddata.txt') && cardDataUrl !== newCardDataUrl) {
		debug("Loading new card data...");
		cardDataUrlPrev = cardDataUrl;
		cardDataUrl = newCardDataUrl;

		newImageUrl = newCardDataUrl.replace('carddata.txt', 'setimages/general/');
		cardImageBaseUrlPrev = cardImageBaseUrl;
		cardImageBaseUrl = newImageUrl;

		loadCardListText();
	}
	currentlyFiltering = false;
}

// Function to toggle the filter menu visibility
function toggleFilterMenu() {
	var filterMenu = document.getElementById("filterMenu");
	if (filterMenu.classList.contains("show")) {
		filterMenu.classList.remove("show");
		setTimeout(() => {
			filterMenu.style.display = "none";
		}, 500); // Match the transition duration
	} else {
		filterMenu.style.display = "block";
		setTimeout(() => {
			filterMenu.classList.add("show");
		}, 10); // Small delay to trigger the transition
	}
}

// Function to apply filters from the filter menu
function applyFilter() {
	var filterName = document.getElementById("filterName").value.trim();
	var filterIdentifier = document.getElementById("filterIdentifier").value.trim();
	var filterAbility = document.getElementById("filterAbility").value.trim();
	var filterSetName = document.getElementById("filterSetName").value.trim();
	var filterType = document.getElementById("filterType").value.trim();
	var filterBrigade = document.getElementById("filterBrigade").value.trim();
	var filterRarity = document.getElementById("filterRarity").value.trim();
	var filterLegality = document.getElementById("filterLegality").value.trim();

	var filters = [];
	if (filterName) filters.push("NAME:" + filterName);
	if (filterIdentifier) filters.push("IDENTIFIER:" + filterIdentifier);
	if (filterAbility) filters.push("ABILITY:" + filterAbility);
	if (filterSetName) filters.push("SETNAME:" + filterSetName);
	if (filterType) filters.push("TYPE:" + filterType);
	if (filterBrigade) filters.push("BRIGADE:" + filterBrigade);
	if (filterRarity) filters.push("RARITY:" + filterRarity);
	if (filterLegality) filters.push("LEGALITY:" + filterLegality);

	var currentFilters = cardFilterTextBox.value.trim();
	var lastSemiColonIndex = currentFilters.lastIndexOf(";");
	if (lastSemiColonIndex !== -1) {
		currentFilters = currentFilters.substring(0, lastSemiColonIndex + 1);
	} else {
		currentFilters = "";
	}

	if (filters.length > 0) {
		cardFilterTextBox.value = currentFilters + filters.join(",");
	} else {
		cardFilterTextBox.value = currentFilters;
	}
	cardFilterChanged();
}

// Function to add additional filters from the filter menu
function addAdditionalFilter() {
	var filterName = document.getElementById("filterName").value.trim();
	var filterIdentifier = document.getElementById("filterIdentifier").value.trim();
	var filterAbility = document.getElementById("filterAbility").value.trim();
	var filterSetName = document.getElementById("filterSetName").value.trim();
	var filterType = document.getElementById("filterType").value.trim();
	var filterBrigade = document.getElementById("filterBrigade").value.trim();
	var filterRarity = document.getElementById("filterRarity").value.trim();
	var filterLegality = document.getElementById("filterLegality").value.trim();

	var filters = [];
	if (filterName) filters.push("NAME:" + filterName);
	if (filterIdentifier) filters.push("IDENTIFIER:" + filterIdentifier);
	if (filterAbility) filters.push("ABILITY:" + filterAbility);
	if (filterSetName) filters.push("SETNAME:" + filterSetName);
	if (filterType) filters.push("TYPE:" + filterType);
	if (filterBrigade) filters.push("BRIGADE:" + filterBrigade);
	if (filterRarity) filters.push("RARITY:" + filterRarity);
	if (filterLegality) filters.push("LEGALITY:" + filterLegality);

	if (filters.length > 0) {
		var currentFilters = cardFilterTextBox.value.trim();
		if (currentFilters) {
			cardFilterTextBox.value = currentFilters + ";" + filters.join(",");
		} else {
			cardFilterTextBox.value = filters.join(",");
		}
		cardFilterChanged();
	}

	// Clear the filter builder fields
	document.getElementById("filterName").value = "";
	document.getElementById("filterIdentifier").value = "";
	document.getElementById("filterAbility").value = "";
	document.getElementById("filterSetName").value = "";
	document.getElementById("filterType").value = "";
	document.getElementById("filterBrigade").value = "";
	document.getElementById("filterRarity").value = "";
	document.getElementById("filterLegality").value = "Rotation";
}

// Function to clear all filters
function clearFilters() {
	document.getElementById("filterName").value = "";
	document.getElementById("filterIdentifier").value = "";
	document.getElementById("filterAbility").value = "";
	document.getElementById("filterSetName").value = "";
	document.getElementById("filterType").value = "";
	document.getElementById("filterBrigade").value = "";
	document.getElementById("filterRarity").value = "";
	document.getElementById("filterLegality").value = "Rotation";
	cardFilterTextBox.value = "";
	cardFilterChanged();
}

// Function to populate dropdowns with options
function populateDropdowns() {
	const sets = [...new Set(cardList.map(card => card.set))].sort();
	const setNames = [...new Set(cardList.map(card => card.officialSet))].sort();
	const types = [...new Set(cardList.map(card => card.type))].sort();
	const brigades = [...new Set(cardList.map(card => card.brigade))].sort();
	const rarities = [...new Set(cardList.map(card => card.rarity))].sort();

	populateDropdown("filterSetName", setNames);
	populateDropdown("filterType", types);
	populateDropdown("filterBrigade", brigades);
	populateDropdown("filterRarity", rarities);
}

function populateDropdown(elementId, options) {
	const dropdown = document.getElementById(elementId);
	options.forEach(option => {
		const opt = document.createElement("option");
		opt.value = option;
		opt.innerText = option;
		dropdown.appendChild(opt);
	});
}
