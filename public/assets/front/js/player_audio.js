$(function(){
    /*=====================================================================================
     Audio Player Script
     *====================================================================================*/
    /* Playlist script*/
    var playList = $('.audio-play-list');
    var playListItems = $('.audio-play-list li');
    var firstItem = playListItems.first();
    var audioPlayer = $('#player');
    var jsaudio = document.getElementById('player');
    var playBtn = $('.play-btn');
    var playBtnIcon  = $('.play-btn span');
    var trackTitle = $('.track-title');
    var rewindBtn = $('.rewind-btn');
    var forwardBtn = $('.forward-btn');
    var buyBtn = $('.buy-rbt');
    var rotatingLogo = $('.rotatingLogo');


// set the source of player initially to the first
// item in the playlist
   // audioPlayer.attr('src',firstItem.attr('data-src'));
   // jsaudio.src = firstItem.attr('data-src');

//set the player's track title to the first track in
// the playlist
 // trackTitle.html('<p>'+firstItem.find('p').html()+'</p>');
 // firstItem.addClass('active');



// Player controls========================================================//

    // change the source of player when user clicks on
// a specific track
    var duration;
    $(document).on('click','.play-btn',function(){
       // var sameSource = $('.audio-play-list li[data-src="'+audioPlayer.attr('src')+'"] span');
        if(jsaudio.paused == true){
            jsaudio.play();
            //change play icon to pause icon
            playBtnIcon.removeClass('fa-play');
            playBtnIcon.addClass('fa-pause');
            //sameSource.removeClass('fa-play');
            //sameSource.addClass('fa-pause');
            rotatingLogo.addClass('RotateLogo');
            duration = jsaudio.duration;

        }else{
            jsaudio.pause();
            //change play icon to pause icone
            playBtnIcon.removeClass('fa-pause');
            playBtnIcon.addClass('fa-play');
            //sameSource.addClass('fa-play');
            //sameSource.removeClass('fa-pause');
            rotatingLogo.removeClass('RotateLogo');
        }

        jsaudio.addEventListener('ended',function(){
            //change play icon to pause icone
            playBtnIcon.removeClass('fa-pause');
            playBtnIcon.addClass('fa-play');
            //sameSource.addClass('fa-play');
            //sameSource.removeClass('fa-pause');
            rotatingLogo.removeClass('RotateLogo');
        });
    });
    if(jsaudio) {

        var progressBar = document.querySelector('.seek-bar-thumb');
        var progressHead = document.querySelector('.seek-bar-head');

        jsaudio.addEventListener("canplaythrough", function () {

        }, false);
        //Play Progress =====================================//
        jsaudio.addEventListener('timeupdate', function () {
            var timePercent = (this.currentTime / this.duration) * 100;
            progressBar.style.width = timePercent + '%';
            //progressHead.style.left = timePercent + '%';

        });

        // Seek timeline ==================================//
        var seekTrack = document.querySelector('.seek-bar');

        //get width of track
        var seekTrackWidth = seekTrack.offsetWidth;
        seekTrack.addEventListener('click',function(e){
            //get position of the click
            var clickX = e.pageX - e.target.offsetLeft;
            var clickPositionPercentage = (clickX/seekTrackWidth)*100;

            // set progress to the new values
            progressBar.style.width = clickPositionPercentage + '%';
            jsaudio.currentTime = (clickPositionPercentage/100)* duration;
        },false);


        //Time Display =====================================//
        jsaudio.addEventListener('timeupdate', function () {
            var timeDisplay = document.querySelector('.current-time');
            timeDisplay.innerHTML = formatTime(this.currentTime);
        });
        jsaudio.addEventListener('durationchange', function () {
            var durationDisplay = document.querySelector('.duration');
            durationDisplay.innerHTML = formatTime(this.duration);
        });
        function formatTime(seconds) {
            var seconds = Math.round(seconds);
            var minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
            seconds = (seconds >= 10) ? seconds : "0" + seconds;
            return minutes + ":" + seconds;
        }
    }

//Forward Button =====================================//
    var forwardBtn = $('#forward-btn');
    var activeTrack = $('.active');
    var nextTrack = $('.active').next();
    var nextTrackSrc = nextTrack.attr('data-src');
    forwardBtn.click(function(){
        console.log(nextTrackSrc);
        audioPlayer.attr('src',nextTrackSrc);
    });


});//end ready
