var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);function Card(dataLine){this.name="";this.dataLine=dataLine;this.dataParts=dataLine.split("\t");var i=0;this.name=this.dataParts[i++];this.set=this.dataParts[i++];this.imgFile=this.dataParts[i++];this.type=this.dataParts[i++];this.brigade=this.dataParts[i++];this.strength=this.dataParts[i++];this.toughness=this.dataParts[i++];this.class=this.dataParts[i++];this.identifier=this.dataParts[i++];this.specialAbility=this.dataParts[i++];this.rarity=this.dataParts[i++];this.reference=this.dataParts[i++];if(this.imgFile.includes(".jpg")){this.imgFile=this.imgFile.replace(".jpg","")}}Card.prototype.getResultListDiv=function(){var theDiv=document.createElement("div");theDiv.classList.add("resultCard");var nameDiv=document.createElement("div");nameDiv.innerText=this.name;theDiv.appendChild(nameDiv);var theImg=document.createElement("img");theImg.src=cardImageBaseUrl+this.imgFile+".jpg";theImg.alt=this.name;theImg.title=this.name;theDiv.appendChild(theImg);return theDiv};Card.prototype.getNameOnlyDiv=function(){var self=this;var theDiv=document.createElement("div");theDiv.classList.add("resultCard");theDiv.classList.add("nameOnly");var nameDiv=document.createElement("div");nameDiv.innerText=this.name;theDiv.appendChild(nameDiv);theDiv.onclick=function(e){var theImg=document.createElement("img");theImg.src=cardImageBaseUrl+self.imgFile+".jpg";theImg.alt=self.name;theImg.title=self.name;this.appendChild(theImg);this.onclick=null};return theDiv};Card.prototype.toString=function(){return JSON.stringify(this)};Card.prototype.allPropertiesString=function(){return this.name+this.set+this.imgFile+this.type+this.brigade+this.strength+this.toughness+this.class+this.identifier+this.specialAbility+this.rarity+this.reference};window.fakeStorage={_data:{},setItem:function(id,val){return this._data[id]=String(val)},getItem:function(id){return this._data.hasOwnProperty(id)?this._data[id]:undefined},removeItem:function(id){return delete this._data[id]},clear:function(){return this._data={}}};function LocalStorage(){var supported=this.localStorageSupported();this.storage=supported?window.localStorage:window.fakeStorage}LocalStorage.prototype.localStorageSupported=function(){var testKey="testRedemptionViewer";var storage=window.localStorage;try{storage.setItem(testKey,"1");storage.removeItem(testKey);return true}catch(error){return false}};var QueryString=function(){var query_string={};var query=window.location.search.substring(1);if(query.length>0&&!(query.includes("appType=")||query.includes("f="))){query=LZString.decompressFromEncodedURIComponent(query)}var vars=query.split("&");if(query.includes("&amp;")){vars=query.split("&amp;")}for(var i=0;i<vars.length;i++){var pair=vars[i].split("=");if(typeof query_string[pair[0]]==="undefined"){query_string[pair[0]]=decodeURIComponent(pair[1])}else if(typeof query_string[pair[0]]==="string"){var arr=[query_string[pair[0]],decodeURIComponent(pair[1])];query_string[pair[0]]=arr}else{query_string[pair[0]].push(decodeURIComponent(pair[1]))}}return query_string}();var debugOn=false;var ios=false;var runningOnAndroid=false;var compressSearchForShareLink=true;function debug(str){if(debugOn){if(ios||QueryString.appType==="ios"){try{webkit.messageHandlers.callbackHandler.postMessage("{debugMessage:"+str+"}")}catch(err){console.log("error")}}console.log(str)}}function arrayIncludesAll(array1,array2){for(var i=0;i<array2.length;i++){if(!array1.includes(array2[i])){return false}}return true}function copyArray(arr){var copyArr=[];for(var i=0;i<arr.length;i++){copyArr.push(arr[i].getCopy())}return copyArr}function shuffleArray(array){var i=0,j=0,temp=null;for(i=array.length-1;i>0;i-=1){j=Math.floor(Math.random()*(i+1));temp=array[i];array[i]=array[j];array[j]=temp}}if(!String.prototype.includes){String.prototype.includes=function(search,start){"use strict";if(typeof start!=="number"){start=0}if(start+search.length>this.length){return false}else{return this.indexOf(search,start)!==-1}}}if(!Array.prototype.includes){Array.prototype.includes=function(searchElement){"use strict";if(this==null){throw new TypeError("Array.prototype.includes called on null or undefined")}var O=Object(this);var len=parseInt(O.length,10)||0;if(len===0){return false}var n=parseInt(arguments[1],10)||0;var k;if(n>=0){k=n}else{k=len+n;if(k<0){k=0}}var currentElement;while(k<len){currentElement=O[k];if(searchElement===currentElement||searchElement!==searchElement&&currentElement!==currentElement){return true}k++}return false}}if(!String.prototype.startsWith){String.prototype.startsWith=function(searchString,position){position=position||0;return this.substr(position,searchString.length)===searchString}}if(!String.prototype.endsWith){String.prototype.endsWith=function(searchString,position){var subjectString=this.toString();if(typeof position!=="number"||!isFinite(position)||Math.floor(position)!==position||position>subjectString.length){position=subjectString.length}position-=searchString.length;var lastIndex=subjectString.lastIndexOf(searchString,position);return lastIndex!==-1&&lastIndex===position}}if(Array.prototype.equals)console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");Array.prototype.equals=function(array){if(!array)return false;if(this.length!=array.length)return false;for(var i=0,l=this.length;i<l;i++){if(this[i]instanceof Array&&array[i]instanceof Array){if(!this[i].equals(array[i]))return false}else if(this[i]!=array[i]){return false}}return true};Object.defineProperty(Array.prototype,"equals",{enumerable:false});var cardDataUrl="https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/master/RedemptionQuick/sets/carddata.txt";var cardImageBaseUrl="https://raw.githubusercontent.com/thejambi/RedemptionLackeyCCG/master/RedemptionQuick/sets/setimages/general/";var cardListText="";var cardFilterTextBox;var filterEchoDiv;var resultList;var searchLinkTag;var baseUrl;var localStorage;var cardList=[];window.requestAnimationFrame(function(){cardFilterTextBox=document.getElementById("cardFilterTextBox");resultList=document.getElementById("resultList");filterEchoDiv=document.getElementById("filterEcho");searchLinkTag=document.getElementById("searchLink");localStorage=(new LocalStorage).storage;setBaseUrl();loadCardListText();prepareCardFilterTextBox();if(QueryString.f){cardFilterTextBox.value=QueryString.f}document.getElementById("siteHeading").onclick=function(e){window.location.href=baseUrl};searchLinkTag.href=window.location.href;cardFilterChanged()});function setBaseUrl(){baseUrl=window.location.href.split(/[?#]/)[0]}function prepareCardFilterTextBox(){cardFilterTextBox.oninput=function(e){cardFilterChanged()};cardFilterTextBox.onkeypress=function(e){var code=e.keyCode?e.keyCode:e.which;if(code==13){cardFilterChanged()}}}function loadCardListText(){$.get(cardDataUrl,function(data){cardListText=data;processCardList()})}function processCardList(){var lines=cardListText.split("\n");cardList=[];for(var i in lines){var line=lines[i];if(i>0&&line&&line.trim()!==""){cardList.push(new Card(line))}}}var timeoutId;var filterTimeoutWait=600;function cardFilterChanged(){debug(cardFilterTextBox.value);clearTimeout(timeoutId);debug("timeout cleared");timeoutId=setTimeout(function(){updateSearchLinkTag();filterCards()},filterTimeoutWait)}function updateSearchLinkTag(){var urlParams="f="+encodeURIComponent(cardFilterTextBox.value.trim());if(compressSearchForShareLink){urlParams=LZString.compressToEncodedURIComponent(urlParams)}searchLinkTag.href=baseUrl+"?"+urlParams}var requiredFilterLength=3;function filterCards(){var filterTextFull=cardFilterTextBox.value.trim().toUpperCase();filterEchoDiv.innerText=filterTextFull;var filterTextList=filterTextFull.split(";");debug(filterTextList);var resultCards=[];for(var i in cardList){var card=cardList[i];for(var filterTextIndex in filterTextList){var filterText=filterTextList[filterTextIndex];if(filterText.length>=requiredFilterLength&&cardMatchesFilterText(card,filterText)){resultCards.push(card)}}}debug("--- Filter Results ---");while(resultList.lastChild){resultList.removeChild(resultList.lastChild)}for(var i in resultCards){var card=resultCards[i];if(i<5){debug(card);resultList.appendChild(card.getResultListDiv())}else{resultList.appendChild(card.getNameOnlyDiv())}}if(resultCards.length===0){resultList.appendChild(getAboutDiv())}}function cardMatchesFilterText(card,filterText){var filterTextChunks=filterText.trim().split(",");var chunkFound=false;for(var chunkIndex in filterTextChunks){var filterTextChunk=filterTextChunks[chunkIndex].trim();if(filterTextChunk.includes(":")){var colonIndex=filterTextChunk.indexOf(":");var cardPartStr=filterTextChunk.slice(0,colonIndex);if(filterTextChunk.length>colonIndex){var matchValueStr=filterTextChunk.slice(colonIndex+1);var cardPartValue=card.dataLine;switch(cardPartStr.toUpperCase()){case"NAME":case"N":cardPartValue=card.name;break;case"SET":case"S":cardPartValue=card.set;break;case"IMGFILE":case"IF":cardPartValue=card.imgFile;break;case"TYPE":case"T":cardPartValue=card.type;break;case"BRIGADE":case"B":cardPartValue=card.brigade;break;case"STRENGTH":case"X/":cardPartValue=card.strength;break;case"TOUGHNESS":case"/X":cardPartValue=card.toughness;break;case"CLASS":case"C":cardPartValue=card.class;break;case"IDENTIFIER":case"I":cardPartValue=card.identifier;break;case"ABILITY":case"A":cardPartValue=card.specialAbility;break;case"RARITY":case"R":cardPartValue=card.rarity;break;case"REFERENCE":case"REF":cardPartValue=card.reference;break;default:break}chunkFound=cardPartValue.toUpperCase().includes(matchValueStr)}}else{chunkFound=card.dataLine.toUpperCase().includes(filterTextChunk)}if(!chunkFound){return false}}return chunkFound}function getAboutDiv(){var theDiv=document.createElement("div");theDiv.innerHTML='Search for cards based on name, set, ability, and more. Use <strong>,</strong> to add another criteria (so, search for <strong>Adam,Fall of Man</strong> to find cards that match both "Fall of Man" and "Adam"). Use <strong>;</strong> to add another search.'+"<br /><p>You can also search certain parts of cards. Begin a part of your search with any of the following to search in that part of the card.</p><p>Name: (or N:) <br />Set: (or S:) <br />Type: (or T:) <br />Brigade: (or B:) <br />Strength: (or X/:) <br />Toughness: (or /X:) <br />Class: (or C:) <br />Identifier: (or I:) <br />Ability: (or A:) <br />Rarity: (or R:) <br />Reference: (or Ref:)</p><p>Some examples... <br />Type:Dominant,Brigade:Good <br />Type:Hero,Ability:Lost Soul <br />ref:Kings 19</p>";return theDiv}