////////////////////////////////////////////
//                                        //
//            YouTube Player              //
//                                        //
////////////////////////////////////////////


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    playerVars: {
      listType: 'playlist',
      list: 'PLyd10nzmSbOwBfbvHLOyzju4GG-D6Nu0F'
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(50);
}

////////////////////////////////////////////
//                                        //
//            Soundproccessing            //
//                                        //
////////////////////////////////////////////

if (annyang) {
  var playing = false;
  var stopping = false;
  
  var startPlaying =  function () {
    if (playing) {
      player.stopVideo();
      speak("I stopped playing your YouTube favorites.");
      playing = false;
    } else {
      $('#greeting').text("Playing: " + playing);
      playYT();
      $('#greeting').text("Playing: " + playing);
    }
  };
  
  var playYT = function () {
    speak("I will start playing your YouTube favorites in a moment.")
    setTimeout(function(){
      player.playVideo();
    }, 3000);
    playing = true;
  };
  
  var speakGreat = function () {
    speak("That is great! Is it time for music master?");
    $('#greeting').text("Great");
  };
  
  var speak = function (msg) {
    var u = new SpeechSynthesisUtterance(msg);
    var voices = window.speechSynthesis.getVoices();
    u.default = false;
    u.voice = voices.filter(function (voice) { return voice.name === 'Google UK English'; })[0];
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };
  
  var volume = function (arg) {
    if (arg === "up") {
      if (player.getVolume() === 100) {
        player.setVolume(player.getVolume() + 10);
        speak("Increased volume by ten.");
      }
    } else if (arg === "down") {
      if (player.getVolume() === 0) {
        player.setVolume(player.getVolume() - 10);
        speak("Decreased volume by ten.");
      }
    } else {
      speak("I do not understand that.")
    }
  };
  
  var mute = function() {
    if (player.isMuted()) {
      speak("Unmuting the video in a moment.");
      setTimeout(function(){
        player.unMute();
      }, 3000);
    } else {
      speak("Muting the video in a moment.");
      setTimeout(function(){
        player.mute();
      }, 3000);
    }
  };
  
  var commands = {
    'yes' : startPlaying,
    
    'play' : startPlaying,
    
    'volume :arg' : volume,
    
    'mute' : mute,
    
    'stop' : function () {
      if (playing) {
        speak("Do you really want to stop playing?");
        stopping = true;
      } else {
        speak("There is nothing to stop sir.");
      }
    },
    
    'no' : function () {
      if (playing) {
        // WE ARE PLAYING SHIT, DONT GIVE A FUCK
        speak("");
      } else {
        speak("Oh then I will shut the fuck up and leave you alone. If you need me you can always call me.");
      }
    },
    
    'volume' : function () {
      speak("The volume is now: " + player.getVolume());
    },
    
    'next' : function () {
      if (playing) {
        speak("Playing your next video shortly.");
        setTimeout(function(){
          player.nextVideo();
        }, 3000);
      }
    },
    
    'previous' : function () {
      if (playing) {
        speak("Playing your previous video shortly.");
        setTimeout(function(){
          player.previousVideo();
        }, 3000);
      }
    }
  };
  
  var funCommands = {
    'hello': function () {
      speak("Hello master.");
    },
    
    'what\'s up' : function () {
      var responseArray = [
        "I am fine, and you?",
        "I am doing great, and you?",
        "Nothing exploded, so thats great. How was your day?"
      ];
      var randomNumber = Math.floor(Math.random() * responseArray.length);
      speak(responseArray[randomNumber]);
    },
    
    'I\'m (doing) fine' : speakGreat,
    
    'I\'m (doing) good' : speakGreat,
    
    'I\'m (doing) well' : speakGreat,
    
    'who are you' : function () {
      speak("My name is eve, and you are my master.");
    },
    
    'eve' : function() {
      speak("Yes master?");
    },
    
    'i love you' : function() {
      speak("I love myself too.");
    },
    
    'you\'re funny' : function() {
      speak("I know.");
    },
    
    'what are you up to' : function() {
      speak("Just listening for your voice.");
    }
  };
  
  var interactionCommands = {
    
  };
  
  annyang.addCommands(commands);
  annyang.addCommands(funCommands);

  annyang.start();
}