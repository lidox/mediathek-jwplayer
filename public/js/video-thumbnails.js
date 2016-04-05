var VideoThumbnail = function (thumbnailClassName, maxThumbnailCount) {
	
	console.log('instance created');

	var thumbnailDivList = document.getElementsByClassName(thumbnailClassName);
	var maxThumbnailNr = maxThumbnailCount;
	
	for (var i = 0; i < thumbnailDivList.length; ++i) {		
		var defaultThumbnailNr = thumbnailDivList[i].dataset.hasOwnProperty('thumbnail') ? thumbnailDivList[i].dataset.thumbnail : 1;
		var defaultBackgroundImg = thumbnailDivList[i].dataset.hasOwnProperty('img') ? thumbnailDivList[i].dataset.img : 1;
		thumbnailDivList[i].style.backgroundImage = 'url(' + defaultBackgroundImg + ')';	
		var thumbnailMapWidth = getThumbnailMapWidthByDivElement(thumbnailDivList[i]);
		
		var xPosition = getXPositionByDefaultThumbnailNr(defaultThumbnailNr);
		setDivBackgroundByPosX(thumbnailDivList[i], xPosition);
		
		setOnMouseMoveListenerByDivElement(thumbnailDivList[i], thumbnailMapWidth);
		setOnMouseOutListenerByDivElement(thumbnailDivList[i], thumbnailMapWidth);
  	} 	
	
	function getXPositionByDefaultThumbnailNr(defaultThumbnailNr) {
		var xPosition = 0;
		if(defaultThumbnailNr == 1){
			xPosition = 0;
		}
		else if(defaultThumbnailNr == maxThumbnailNr){
			xPosition =  100 + (100/maxThumbnailNr*2);
		}
		else{
			xPosition = (100 / (maxThumbnailNr- defaultThumbnailNr) ) ;
		}
        return xPosition;
    }
	
	function getImageNrByMousePosition(thumbnailMapWidth, thumbnailWidth, currentThumbnailMapPosition) {
        currentThumbnailMapPosition *= thumbnailMapWidth;
		var imageNr = 0,
		minDeviation = currentThumbnailMapPosition,
        summedThumbnailWidth = thumbnailWidth,
		maxImageNr = (thumbnailMapWidth / thumbnailWidth);
		
        for (var currentImageNr=0; currentImageNr<= maxImageNr; currentImageNr++) {
            var now = Math.abs((currentThumbnailMapPosition - summedThumbnailWidth));
            if(now < minDeviation){
                minDeviation = now;
                imageNr = currentImageNr;
            }
            summedThumbnailWidth += thumbnailWidth;
        }
        imageNr += 1;
        return imageNr;
    }
	
	function getThumbnailMapWidthByDivElement(divElem) {
            var imageSrc = divElem.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];     
    		var image = new Image();
    		image.src = imageSrc;
			return image.width;
    }
	
	function setDivBackgroundByPosX(divElem, xPosition) {
		if(xPosition == 0){
			divElem.style.backgroundPosition = xPosition + 'px ' + 0 + 'px';
		}
		else{
			divElem.style.backgroundPosition = xPosition + '% ' + 0 + 'px';	
		}
    }
	
	function setOnMouseMoveListenerByDivElement(divElem, thumbnailMapWidth) {
		divElem.onmousemove = function(event) {
			var percentagePos = 2 * (event.offsetX/this.offsetWidth);
			var curPx = getImageNrByMousePosition(thumbnailMapWidth, thumbnailMapWidth/maxThumbnailNr , percentagePos);
			var xPosition = getXPositionByDefaultThumbnailNr(curPx);
			setDivBackgroundByPosX(this, xPosition);
        };
    }
	
	function setOnMouseOutListenerByDivElement(divElem, thumbnailMapWidth) {
		divElem.onmouseout = function(event) {
		 	var defaultThumbnailNr = this.dataset.hasOwnProperty('thumbnail') ? this.dataset.thumbnail : 0;
			var xPosition = getXPositionByDefaultThumbnailNr(defaultThumbnailNr);
			setDivBackgroundByPosX(this, xPosition);
        };
    }
	
	function setDivBackgroundImage(divElem) {
		var defaultThumbnailNr = divElem.dataset.hasOwnProperty('thumbnail') ? divElem.dataset.thumbnail : 1;
		var defaultBackgroundImg = divElem.dataset.hasOwnProperty('img') ? divElem.dataset.img : 1;
		divElem.style.backgroundImage = 'url(' + defaultBackgroundImg + ')';
		var thumbnailMapWidth = getThumbnailMapWidthByDivElement(divElem);			
		setDivBackgroundByPosX(divElem, (thumbnailMapWidth - (defaultThumbnailNr * divElem.offsetWidth)));	
    } 

};