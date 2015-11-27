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
  console.log("READY");
}

////////////////////////////////////////////
//                                        //
//            Soundproccessing            //
//                                        //
////////////////////////////////////////////

if (annyang) {
  var playing = false;
  var stopping = false;
  
  var commands = {
    'yes' : function () {
      if (playing) {
        player.stopVideo();
        speak("I stopped playing your YouTube favorites.");
        playing = false;
      } else {
        console.log("Playing: " + playing);
        YTPlay();
        console.log("Playing: " + playing);
      }
    },
    
    'play' : function () {
      YTPlay();
    },
    
    'stop' : function () {
      if (playing) {
        speak("Do you really want to stop playing?");
        stopping = true;
      } else {
        speak("There is nothing to stop sir.");
      }
    },
    
    'no' : function () {
      if (playing !== true) {
        speak("Oh then I will shut the fuck up and leave you alone. If you need me you can always call me.");
      } else {
        speak("Great to hear");
      }
    },
    
    'volume :arg' : function (arg) {
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
    },
    
    'volume' : function () {
      speak("The volume is now: " + player.getVolume());
    },
    
    'next' : function () {
      speak("Playing your next video shortly.");
      setTimeout(function(){
        player.nextVideo();
      }, 3000);
    },
    
    'previous' : function () {
      speak("Playing your previous video shortly.");
      setTimeout(function(){
        player.previousVideo();
      }, 3000);
    },
    
    'mute' : function() {
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
      
    }
  };
  
  var funCommands = {
    'hello': function () {
      speak("Hello Master");
    },
    
    'jarvis' : function () {
      speak("No I am not from that movie sir.");
    },
    
    'how are you (doing)': function () {
      var responseArray = [
        "I am fine, and you?",
        "I am doing great, and you?",
        "Nothing exploded, so thats great. How was your day?"
      ];
      var randomNumber = Math.floor(Math.random() * responseArray.length);
      speak(responseArray[randomNumber]);
    },
    
    'I am (doing) fine' : function () {
      speakGreat();
    },
    
    'I am (doing) good' : function () {
      speakGreat();
    },
    
    'I am (doing) well' : function () {
      speakGreat();
    },
    
    'who are you' : function () {
      speak("My name is EVE, and you are my master.");
    },
    
    'eve' : function() {
      speak("Hello master. What can I do for you?");
    }
  };
  
  var interactionCommands = {
    
  };
  
  annyang.addCommands(commands);
  annyang.addCommands(funCommands);

  annyang.start();
  
  var YTPlay = function () {
    speak("I will start playing your YouTube favorites in a moment.")
    setTimeout(function(){
      player.playVideo();
    }, 3000);
    playing = true;
  };
  
  var speakGreat = function () {
    speak("That is great! Is it time for music master?");
    console.log("Great")
  };
  
  var speak = function (msg) {
    var u = new SpeechSynthesisUtterance(msg);
    var voices = window.speechSynthesis.getVoices();
    u.default = false;
    u.voice = voices.filter(function (voice) { return voice.name === 'Google UK English'; })[0];
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };
}