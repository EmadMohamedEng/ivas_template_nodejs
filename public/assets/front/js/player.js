$(function(){
    //console.log("clicked");
	$('body').on('click','.np-play',function(e){
		var songName = e.target.getAttribute('data-src');
        var audioPlayer = document.querySelector('#player');
        var self = $(this);

		
		  if (audioPlayer) {
		
		    if (songName===audioPlayer.getAttribute('src')) {
		      if (audioPlayer.paused) {
		        audioPlayer.play();
		        e.target.id = 'paused';
		      } else {
		        audioPlayer.pause();
		        e.target.id = 'play';


		      }
		    } else {
		    	//if the clicked song name isnt the one currently playing
		      audioPlayer.src = songName;
		      audioPlayer.play();
		      e.target.id = 'paused';
		      if (document.querySelector('#playing')) {
		        document.querySelector('#playing').id='';
		      } else {
		        document.querySelector('#paused').id='';
		      }
		        e.target.id = 'playing';
		    }
		
		
		
		  } else {
		    var audioPlayer = document.createElement('audio');
		    audioPlayer.id = 'player';
		    e.target.id = 'playing';
		    audioPlayer.src = songName;
		    document.body.appendChild(audioPlayer);
		    audioPlayer.play();
		
		
		    audioPlayer.addEventListener('ended', function() {
		      audioPlayer.parentNode.removeChild(audioPlayer);
		      e.target.id='';
		    }, false);
		  }


	});

});