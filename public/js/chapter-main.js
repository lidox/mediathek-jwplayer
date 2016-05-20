var playerInstance = jwplayer('container');
playerInstance.setup({		

sources: [{
   file: "//content.jwplatform.com/videos/C4lp6Dtd-1280.mp4",
   label: "720p HD"
},{
   file: "//content.jwplatform.com/videos/C4lp6Dtd-640.mp4",
   label: "360p SD",
   "default": "true"
},{
	file: "//content.jwplatform.com/videos/C4lp6Dtd-640.mp4",
	label: "180p Web"
}],

image: "//content.jwplatform.com/thumbs/3XnJSIm4-640.jpg",
width: 1200,
height: 860,

// thumbnails + captions
tracks: [
{
	//chapters
	file: '/assets/chapters.vtt',
	kind: 'chapters' 
},{ 
	// thumbnails
	file: "/assets/thumbnails.vtt", 
	kind: "thumbnails"
},{ 
	// captions
	file: "/assets/captions-en.vtt", 
	label: "English",
	kind: "captions"
},{ 
	// captions
	file: "/assets/captions-de.vtt", 
	label: "Deutsch",
	kind: "captions", 
	//"default": true 

}],

// html5 with fallback to flash
modes: [
	{ type: "html5" },
	{ type: "flash", src: "player.swf" }
],

logo: {
	file: "//mediathek.hhu.de/images/uni_duesseldorf_logo.png",
	link: "//mediathek.hhu.de"
},
abouttext: 'Video Available at the hhu mediathek',
aboutlink: 'http://mediathek.hhu.de',

plugins:{
	  "http://dev.powered-by-haiku.co.uk/solutions/tracky/code/tracky.js":{}
},

 width:"50%",
"aspectratio":"16:9"

  });

/*
playerInstance.addButton(
//This portion is what designates the graphic used for the button
"//icons.jwplayer.com/icons/white/download.svg",
//This portion determines the text that appears as a tooltip
"Download Video",
//This portion designates the functionality of the button itself
function() {
//With the below code, we're grabbing the file that's currently playing
window.location.href = playerInstance.getPlaylistItem()['file'];
},
//And finally, here we set the unique ID of the button itself.
"download"
);
*/

$( document ).ready(function() {
  	editTextById('chapter1');
	editTextById('chapter2');
	editTextById('chapter3');
	makePanelsDraggable();
});

function editTextById(textId) {
	var superCoolId = 'txt_fullname' + textId;
	$('#'+textId).click(function(){
		var name = $(this).text();
		$(this).html('');
		$('<input></input>')
			.attr({
				'type': 'text',
				'name': 'fname',
				'id': superCoolId,
				'size': '30',
				'value': name
			})
			.appendTo('#'+textId);
		$('#'+superCoolId).focus();
	});
	$(document).on('blur','#'+superCoolId, function(){
		var name = $(this).val();
		//alert('Make an AJAX call and pass this parameter >> name=' + name);
		$('#'+textId).text(name);
	});	
}

function makePanelsDraggable(){
	jQuery(function ($) {
	var panelList = $('#draggablePanelList');

	panelList.sortable({
			// Only make the .panel-heading child elements support dragging.
			// Omit this to make then entire <li>...</li> draggable.
			handle: '.panel-heading'
			, update: function () {
				$('.panel', panelList).each(function (index, elem) {
					var $listItem = $(elem)
						, newIndex = $listItem.index();

					// Persist the new indices.
				});
			}
		});
	});
}

function addChapter(seconds){
	addListItem(seconds);
	addCueToPlayer(seconds);
}

function addListItem(seconds) {
	//list-unstyled ui-sortable
    var chapter = document.createElement("li");
	chapter.setAttribute('class','panel panel-info');
	
	var title = document.createElement("div");
	title.setAttribute('class','panel-heading ui-sortable-handle');
	title.innerHTML = "Kapitel X"
	// set title default text
	title.setAttribute('onclick','playerInstance.seek('+ seconds +');');
	
	chapter.appendChild(title);
	
	var panel = document.createElement("div");
    var d = new Date();
	var panelId =  "chapter" + d.getTime();
	panel.id = panelId;
	panel.setAttribute('class','panel-body');
	panel.innerHTML = "panel"
	var span = document.createElement("span");
	span.setAttribute('class','chapters-time');
	span.innerHTML = seconds;
	panel.appendChild(span);
	editTextById(panelId);
	chapter.appendChild(panel);
	document.getElementsByClassName('list-unstyled ui-sortable')[0].appendChild(chapter);
}

function addCueToPlayer(seconds) {
	var cue = document.createElement("div");
	cue.setAttribute('class','jw-cue jw-reset');
	var videoLength = playerInstance.getDuration();
	var percentage =  (100 / videoLength ) * seconds;
	cue.setAttribute('style','left: '+ percentage +'%;');
	document.getElementsByClassName('jw-slider-container jw-reset')[0].appendChild(cue);
	//jw-slider-container jw-reset
}
