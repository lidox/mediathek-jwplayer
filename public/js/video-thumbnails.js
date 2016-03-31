
window.onload = function () {
	
	var thumbnailDivList = document.getElementsByClassName('video-thumbnail2');
	
	for (var i = 0; i < thumbnailDivList.length; ++i) {		
		var defaultThumbnailNr = thumbnailDivList[i].dataset.hasOwnProperty('thumbnail') ? thumbnailDivList[i].dataset.thumbnail : 1;
		var defaultBackgroundImg = thumbnailDivList[i].dataset.hasOwnProperty('img') ? thumbnailDivList[i].dataset.img : 1;
		thumbnailDivList[i].style.backgroundImage = 'url(' + defaultBackgroundImg + ')';	
		var thumbnailMapWidth = getThumbnailMapWidthByDivElement(thumbnailDivList[i]);			
		setDivBackgroundByPosX(thumbnailDivList[i], (thumbnailMapWidth - (defaultThumbnailNr * thumbnailDivList[i].offsetWidth)));			
			
		setOnMouseMoveListenerByDivElement(thumbnailDivList[i], thumbnailMapWidth);
		setOnMouseOutListenerByDivElement(thumbnailDivList[i], thumbnailMapWidth);
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
		divElem.style.backgroundPosition = xPosition + 'px ' + 0 + 'px';
    }
	
	function setOnMouseMoveListenerByDivElement(divElem, thumbnailMapWidth) {
		divElem.onmousemove = function(event) {
			var curPx = getImageNrByMousePosition(thumbnailMapWidth, this.offsetWidth, 1-(event.offsetX/this.offsetWidth));
			setDivBackgroundByPosX(this, curPx * this.offsetWidth);
        };
    }
	
	function setOnMouseOutListenerByDivElement(divElem, thumbnailMapWidth) {
		divElem.onmouseout = function(event) {
		 	var defaultThumbnailNr = this.dataset.hasOwnProperty('thumbnail') ? this.dataset.thumbnail : 0;
		 	setDivBackgroundByPosX( this, thumbnailMapWidth - (defaultThumbnailNr * this.offsetWidth));
        };
    }
	
	function setDivBackgroundImage(divElem) {
		var defaultThumbnailNr = divElem.dataset.hasOwnProperty('thumbnail') ? divElem.dataset.thumbnail : 1;
		var defaultBackgroundImg = divElem.dataset.hasOwnProperty('img') ? divElem.dataset.img : 1;
		divElem.style.backgroundImage = 'url(' + defaultBackgroundImg + ')';	
		var thumbnailMapWidth = getThumbnailMapWidthByDivElement(divElem);			
		setDivBackgroundByPosX(divElem, (thumbnailMapWidth - (defaultThumbnailNr * divElem.offsetWidth)));	
    }
}