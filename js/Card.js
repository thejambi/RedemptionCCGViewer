import { cardImageBaseUrl, nameOnlyClass } from './rvMain.js';
import { copyTextToClipboard, debugOn } from './rvData';

export function Card(dataLine) {
	this.name = "";

	this.dataLine = dataLine;
	this.dataParts = dataLine.split("\t");

	if (this.dataParts.length !== 15 && this.dataParts.length !== 16) {
		debug("Card definition not complete: ");
		debug(this.dataLine);
	}

	this.includeOfficialSetField = false;
	if (this.dataParts.length === 16) {
		this.includeOfficialSetField = true;
	}

	var i = 0;
	this.name = this.dataParts[i++];
	this.set = this.dataParts[i++];
	this.imgFile = this.dataParts[i++];
	if (this.includeOfficialSetField) {
		this.officialSet = this.dataParts[i++];
	}
	this.type = this.dataParts[i++];
	this.brigade = this.dataParts[i++];
	this.strength = this.dataParts[i++];
	this.toughness = this.dataParts[i++];
	this.class = this.dataParts[i++];
	this.identifier = this.dataParts[i++];
	this.specialAbility = this.dataParts[i++];
	this.rarity = this.dataParts[i++];
	this.reference = this.dataParts[i++];
	this.unknownValue = this.dataParts[i++];
	this.alignment = this.dataParts[i++];
	this.legality = this.dataParts[i++];

	if (this.imgFile.includes(".jpg")) {
		this.imgFile = this.imgFile.replace(".jpg","");
	}

	this.decideTestament();
}

export var otBooks = [
	'genesis',
	'exodus',
	'leviticus',
	'numbers',
	'deuteronomy',
	'joshua',
	'judges',
	'ruth',
	'samuel',
	'kings',
	'chronicles',
	'ezra',
	'nehemiah',
	'esther',
	'job',
	'psalms',
	'proverbs',
	'ecclesiastes',
	'song of solomon',
	'isaiah',
	'jeremiah',
	'lamentations',
	'ezekiel',
	'daniel',
	'hosea',
	'joel',
	'amos',
	'obadiah',
	'jonah',
	'micah',
	'nahum',
	'habakkuk',
	'zephaniah',
	'haggai',
	'zechariah',
	'malachi'
];

export var ntBooks = [
	'matthew',
	'mark',
	'luke',
	'john',
	'acts',
	'romans',
	'corinthians',
	'galatians',
	'ephesians',
	'philippians',
	'colossians',
	'thessalonians',
	'timothy',
	'titus',
	'philemon',
	'hebrews',
	'james',
	'peter',
	'jude',
	'revelation'
];

Card.prototype.decideTestament = function() {
	this.testament = "";

	/** Assuming that a O.T. or N.T. reference in identifier text
	 * also matches the card's given testament identity.
	 * This seems to be the case currently but may not be future-proof.
	 */
	if (this.identifier.includes("O.T.")) {
		this.testament += " OT ";
	}
	if (this.identifier.includes("N.T.")) {
		this.testament += " NT ";
	}

	if (this.testament === "") {
		var ref = this.reference.toLowerCase();

		for (var i in otBooks) {
			var otBook = otBooks[i];
			if (ref.includes(otBook)) {
				this.testament += " OT ";
				break;
			}
		}

		for (var i in ntBooks) {
			var ntBook = ntBooks[i];
			if (ref.includes(ntBook)) {
				this.testament += " NT ";
				// yepped = true;
				break;
			}
		}
	}
};

Card.prototype.getResultListDiv = function(shouldBuildImageNow) {
	var imageUrl = cardImageBaseUrl + this.imgFile + ".jpg";

	var theDiv = document.createElement("div");
	theDiv.classList.add("resultCard");
	if (!shouldBuildImageNow) {
		theDiv.classList.add(nameOnlyClass);
	}

	var nameDiv = document.createElement("div");
	if (debugOn) {
		nameDiv.style["font-weight"] = "bold";
	}
	nameDiv.style["width"] = "95%";
	nameDiv.style["max-width"] = "346px";
	nameDiv.innerText = this.name;

	var copyImageLinkButton = document.createElement("button");
	copyImageLinkButton.style["float"] = "right";
	copyImageLinkButton.style["display"] = "none";
	copyImageLinkButton.innerText = "Copy Image Link";
	copyImageLinkButton.onclick = (e) => {
		copyTextToClipboard(imageUrl, copyImageLinkButton);
	};
	nameDiv.appendChild(copyImageLinkButton);

	theDiv.appendChild(nameDiv);

	if (shouldBuildImageNow) {
		var theImg = this.buildImageElement(imageUrl, copyImageLinkButton);
		theDiv.appendChild(theImg);
	} else {
		theDiv.onclick = (e) => {
			var theImg = this.buildImageElement(imageUrl, copyImageLinkButton);
			theDiv.appendChild(theImg);

			if (debugOn) {
				theDiv.appendChild(this.buildCardInfoElement());
			}

			theDiv.onclick = null;
			theDiv.classList.remove(nameOnlyClass);
		};
	}

	if (debugOn && shouldBuildImageNow) {
		theDiv.appendChild(this.buildCardInfoElement());
	}

	// this.addDoubleClickToCardDiv(theDiv);

	return theDiv;
};

Card.prototype.buildImageElement = function(imageUrl, copyImageLinkButton) {
	var theImg = document.createElement("img");
	theImg.src = imageUrl;
	theImg.alt = this.name;
	theImg.title = this.name;
	theImg.onclick = (e) => {
		copyImageLinkButton.style["display"] = "";
	};
	return theImg;
};

Card.prototype.buildCardInfoElement = function() {
	var cardInfo = document.createElement("div");
	cardInfo.style["font-style"] = "italic";
	cardInfo.innerHTML = this.allPropertiesStringForDisplay();
	return cardInfo;
};

// Card.prototype.addDoubleClickToCardDiv = function(theDiv) {
// 	theDiv.ondblclick = function(e) {
// 		revealMoreCards();
// 	};
// };

Card.prototype.toString = function() {
	return JSON.stringify(this);
};

Card.prototype.allPropertiesString = function() {
	return this.name 
			+ this.set 
			+ this.imgFile 
			+ this.includeOfficialSetField ? this.officialSet : ''
			+ this.type 
			+ this.brigade 
			+ this.strength 
			+ this.toughness 
			+ this.class 
			+ this.identifier 
			+ this.specialAbility 
			+ this.rarity 
			+ this.reference;
};

Card.prototype.allPropertiesStringForDisplay = function() {
	return "<strong>Name:</strong> " + this.name + " | "
			+ "<strong>Set:</strong> " + this.set + " | "
			+ "<strong>Image Name:</strong> " + this.imgFile + " | "
			+ "<strong>Set Name:</strong> " + this.officialSet + " | "
			+ "<strong>Type:</strong> " + this.type + " | "
			+ "<strong>Brigade:</strong> " + this.brigade + " | "
			+ "<strong>Strength:</strong> " + this.strength + " | "
			+ "<strong>Toughness:</strong> " + this.toughness + " | "
			+ "<strong>Class:</strong> " + this.class + " | "
			+ "<strong>Identifier:</strong> " + this.identifier + " | "
			+ "<strong>Special Ability:</strong> " + this.specialAbility + " | "
			+ "<strong>Rarity:</strong> " + this.rarity + " | "
			+ "<strong>Reference:</strong> " + this.reference + " | "
			+ "<strong>Legality:</strong> " + this.legality;
};
