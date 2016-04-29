function VTTCreator() {
}

VTTCreator.prototype.getTextOfVTT = function(spriteFile, singleImageWidth, singleImageHeight, videoLenghtInSeconds, imageRepetitionInPercent) {
  		console.log('WEBVTT');
		console.log('');
		
		var onePercentInSeconds = videoLenghtInSeconds / 100;
		var secondsPerImage = onePercentInSeconds * imageRepetitionInPercent;
		var xPosition = 0;
		
		var creator = new VTTCreator();
		for (i = 0; i < (videoLenghtInSeconds) ;) { 
			
			console.log(creator.secondsTohhmmss(i) + ' --> ' + creator.secondsTohhmmss( (i + secondsPerImage) ) );
			console.log(spriteFile + '#xywh=' + xPosition + ',0,' + singleImageWidth + ',' + singleImageHeight);
			console.log('');
			
			xPosition += singleImageWidth;
			i += secondsPerImage;
		}
};

VTTCreator.prototype.secondsTohhmmss = function(totalSeconds) {
		var hours   = Math.floor(totalSeconds / 3600);
		var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  		var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  		// round seconds
  		seconds = Math.round(seconds * 100) / 100

  		var result = (hours < 10 ? "0" + hours : hours);
    	result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    	result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
    	result += "." + ("000");
  		return result;
};