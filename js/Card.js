
function Card(dataLine) {
	this.name = "";

	this.dataLine = dataLine;
	this.dataParts = dataLine.split("\t");

	var i = 0;
	this.name = this.dataParts[i++];
	this.set = this.dataParts[i++];
	this.imgFile = this.dataParts[i++];
	this.type = this.dataParts[i++];
	this.brigade = this.dataParts[i++];
	this.strength = this.dataParts[i++];
	this.toughness = this.dataParts[i++];
	this.class = this.dataParts[i++];
	this.identifier = this.dataParts[i++];
	this.specialAbility = this.dataParts[i++];
	this.rarity = this.dataParts[i++];
	this.reference = this.dataParts[i++];

	if (this.imgFile.includes(".jpg")) {
		this.imgFile = this.imgFile.replace(".jpg","");
	}

	this.decideTestament();
}

var otBooks = [
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

var ntBooks = [
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
				yepped = true;
				break;
			}
		}
	}
};

Card.prototype.getResultListDiv = function() {
	var theDiv = document.createElement("div");
	theDiv.classList.add("resultCard");

	var nameDiv = document.createElement("div");
	if (debugOn) {
		nameDiv.style["font-weight"] = "bold";
	}
	nameDiv.innerText = this.name;
	theDiv.appendChild(nameDiv);

	var theImg = document.createElement("img");
	theImg.src = cardImageBaseUrl + this.imgFile + ".jpg";
	theImg.alt = this.name;
	theImg.title = this.name;
	theDiv.appendChild(theImg);

	if (debugOn) {
		theDiv.appendChild(this.buildCardInfoElement());
	}

	this.addDoubleClickToCardDiv(theDiv);

	return theDiv;
};

Card.prototype.buildCardInfoElement = function() {
	var cardInfo = document.createElement("div");
	cardInfo.style["font-style"] = "italic";
	cardInfo.innerText = this.allPropertiesStringForDisplay();
	return cardInfo;
};

Card.prototype.getNameOnlyDiv = function() {
	var self = this;

	var theDiv = document.createElement("div");
	theDiv.classList.add("resultCard");
	theDiv.classList.add(nameOnlyClass);

	var nameDiv = document.createElement("div");
	if (debugOn) {
		nameDiv.style["font-weight"] = "bold";
	}
	nameDiv.innerText = this.name;
	theDiv.appendChild(nameDiv);

	theDiv.onclick = function(e) {
		var theImg = document.createElement("img");
		theImg.src = cardImageBaseUrl + self.imgFile + ".jpg";
		theImg.alt = self.name;
		theImg.title = self.name;
		this.appendChild(theImg);

		if (debugOn) {
			this.appendChild(self.buildCardInfoElement());
		}

		this.onclick = null;
		this.classList.remove(nameOnlyClass);
	};

	this.addDoubleClickToCardDiv(theDiv);

	return theDiv;
};

Card.prototype.addDoubleClickToCardDiv = function(theDiv) {
	theDiv.ondblclick = function(e) {
		revealMoreCards();
	};
};

Card.prototype.toString = function() {
	return JSON.stringify(this);
};

Card.prototype.allPropertiesString = function() {
	return this.name 
			+ this.set 
			+ this.imgFile 
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
	return "Name: " + this.name + " | "
			+ "Set: " + this.set + " | "
			+ "Image Name: " + this.imgFile + " | "
			+ "Type: " + this.type + " | "
			+ "Brigade: " + this.brigade + " | "
			+ "Strength: " + this.strength + " | "
			+ "Toughness: " + this.toughness + " | "
			+ "Class: " + this.class + " | "
			+ "Identifier: " + this.identifier + " | "
			+ "Special Ability: " + this.specialAbility + " | "
			+ "Rarity: " + this.rarity + " | "
			+ "Reference: " + this.reference;
};
