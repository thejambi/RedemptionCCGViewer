
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

	this.buildResultListDiv();
}

Card.prototype.buildResultListDiv = function() {
	var theDiv = document.createElement("div");
	theDiv.classList.add("resultCard");

	var theImg = document.createElement("img");
	theImg.src = cardImageBaseUrl + this.imgFile + ".jpg";
	theDiv.appendChild(theImg);

	this.resultListDiv = theDiv;
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
