
            var tag = document.querySelector('player');
			if (tag != null) {
				tag.defaultPlaybackRate = 1.0;
				tag.playbackRate = 1.0;
			}

			
			function changePlaybackRate() { 
				var tag = document.querySelector('player');
                if(tag.playbackRate != 2.0){
                    tag.playbackRate += 0.5;
                }
                else{
                    tag.playbackRate = 0.5;
                }
                playerInstance.seek(playerInstance.getPosition());
            }        
			
			function jumpBySeconds(seksToJump) {
				var time = playerInstance.getPosition() + seksToJump;
				if(time < 0) { 
					time = 0; 
				}
				playerInstance.seek(time);
            }
			
			function displayButtons() {
				var playButton = document.getElementsByClassName('jw-controls jw-reset')[0];
				playButton.style.display = "block";
            }
			
			function hideButtons() {
				var playButton = document.getElementsByClassName('jw-controls jw-reset')[0];
				playButton.style.display = "none";
            }
			
			function addControlbarListeners(){
				var timer;
				var player = document.getElementsByClassName('jwplayer')[0];
				player.onmouseover = function(){displayButtons();};	
				player.onmouseout = function(){hideButtons();};
				player.addEventListener("mousemove",function(){
					displayButtons();
					clearTimeout(timer);
					timer=setTimeout(mouseStopped,2000);
				});
				
				function mouseStopped(){                               
    				hideButtons();
				}
			}
			
			function addSpeedUpButton(){
                // add button to controlbar
				var myLogo = document.createElement("div");
				myLogo.id = "changeSpeed";
                myLogo.style.paddingLeft = "5px";
                myLogo.style.marginRight = "5px";
                myLogo.style.marginTop = "3px";
				myLogo.setAttribute('class','jw-icon jw-icon-inline jw-button-color jw-reset jw-icon-logo jw-icon-next');
				myLogo.setAttribute('onclick','changePlaybackRate()');
				document.getElementsByClassName('jw-controlbar-left-group')[0].appendChild(myLogo);
			}
			
			function addPlayForwardAndBackwardButtons(){
				// add play 5 sek back button 
				var playBack = document.createElement("img");
				playBack.id = "play10sekback";
                playBack.setAttribute('class','jw-icon jw-icon-display jw-button-color jumpBackward jw-reset');   
				playBack.setAttribute('onclick','jumpBySeconds(-10)');
				
                var middleBar = document.getElementsByClassName('jw-display-icon-container jw-reset')[0];
                middleBar.appendChild(playBack);
                middleBar.setAttribute('style',"background-color:rgba(0, 0, 0, 0.0); border: 0px; display: flex;");
                var playButton = middleBar.childNodes[1];
				middleBar.removeChild(playButton);
				middleBar.appendChild(playButton);

                // add play 5 sek forward button 
				var playForward = document.createElement("img");
				playForward.id = "play10sekforward";
                playForward.setAttribute('class','jw-icon jw-button-color jw-icon-display jw-reset jumpForward');
				playForward.setAttribute('onclick','jumpBySeconds(10)');
                
                var middleBar = document.getElementsByClassName('jw-display-icon-container jw-reset')[0];  
                middleBar.appendChild(playForward);					   	
				// set icon to center
				middleBar.style.width = "100%";
				middleBar.style.margin = "-1.0em auto 0";
			}
			
			playerInstance.onPause(function(){
				console.log("video stopped");
			});
			
			playerInstance.onPlay(function(){
				console.log("video playing...");
			});
            
			playerInstance.onReady(function(){
				//addSpeedUpButton();            
				//addPlayForwardAndBackwardButtons();
				//addControlbarListeners();	
				displayControlBar();
			 });

			function displayControlBar() {
				var controlBar = document.getElementsByClassName('jw-controlbar jw-background-color jw-reset')[0];
				controlBar.style.display = "block";
			}