
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
}

Card.prototype.getResultListDiv = function() {
	if (!this.resultListDiv) {
		var self = this;

		var theDiv = document.createElement("div");
		theDiv.classList.add("resultCard");

		var nameDiv = document.createElement("div");
		nameDiv.innerText = this.name;
		theDiv.appendChild(nameDiv);

		var theImg = document.createElement("img");
		theImg.src = cardImageBaseUrl + this.imgFile + ".jpg";
		theImg.alt = this.name;
		theImg.title = this.name;
		theDiv.appendChild(theImg);

		// theDiv.onclick = function(e){
		// 	cardFilterTextBox.value = self.imgFile;
		// 	cardFilterChanged();
		// };

		this.resultListDiv = theDiv;
	}
	return this.resultListDiv;
};

Card.prototype.getNameOnlyDiv = function() {
	if (!this.nameOnlyDiv) {
		var self = this;

		var theDiv = document.createElement("div");
		theDiv.classList.add("resultCard");
		theDiv.classList.add("nameOnly");

		var nameDiv = document.createElement("div");
		nameDiv.innerText = this.name;
		theDiv.appendChild(nameDiv);

		theDiv.onclick = function(e){
			// cardFilterTextBox.value = self.imgFile;
			// cardFilterChanged();
			var theImg = document.createElement("img");
			theImg.src = cardImageBaseUrl + self.imgFile + ".jpg";
			theImg.alt = self.name;
			theImg.title = self.name;
			this.appendChild(theImg);
		};

		this.nameOnlyDiv = theDiv;
	}
	return this.nameOnlyDiv;
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
