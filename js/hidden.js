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
      listType:'playlist',
      list: 'PLyd10nzmSbOwBfbvHLOyzju4GG-D6Nu0F'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  //event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

if (annyang) {
  var commands = {
    'hello': function () {
      speak("Hello Master");
      console.log("Hello");
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
      speak("Thats great! Is it time for music master?");
    },
    'I am (doing) good' : function () {
      speak("Thats great! Is it time for music master?");
    },
    'I am (doing) well' : function () {
      speak("Thats great! Is it time for music master?");
    },
    'yes' : function () {
      speak("I will start playing your YouTube favorites, master.")
      player.playVideo();
    },
    'play' : function () {
      player.playVideo();
    },
    'stop' : function () {
      player.stopVideo();
      speak("Do you really want to stop playing?")
    },
    'jarvis' : function () {
      speak("No I am not from that movie sir.");
    }
  };
  
  annyang.addCommands(commands);

  annyang.start();
  
  var speakGreat = function() {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("That is great Time"));
    console.log("Great")
  };
  
  var speak = function(msg) {
    var u = new SpeechSynthesisUtterance(msg);
    var voices = window.speechSynthesis.getVoices();
    u.default = false;
    u.voice = voices.filter(function (voice) { return voice.name === 'Google UK English Female'; })[0];
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };
}