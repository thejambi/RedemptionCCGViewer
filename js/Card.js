
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

	this.buildResultListDivs();
}

Card.prototype.buildResultListDivs = function() {
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

	theDiv.onclick = function(e){
		cardFilterTextBox.value = self.imgFile;
		cardFilterChanged();
	};

	this.resultListDiv = theDiv;

	// --- //

	theDiv = document.createElement("div");
	theDiv.classList.add("resultCard");
	theDiv.classList.add("nameOnly");

	nameDiv = document.createElement("div");
	nameDiv.innerText = this.name;
	theDiv.appendChild(nameDiv);

	theDiv.onclick = function(e){
		cardFilterTextBox.value = self.imgFile;
		cardFilterChanged();
	};

	this.nameOnlyDiv = theDiv;
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
