var isStream = false ;

function __log(e, data) {
    console.log(e);
}

  var audio_context;
  var recorder;

  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.');

    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    __log('Recorder initialised.');

    isStream = stream ;

    startRecording() ;
  }

  function startRecording(button) {
    recorder && recorder.record();
    // button.disabled = true;
    // button.nextElementSibling.disabled = false;
    __log('Recording...');
  }

  function stopRecording(handle) {
    recorder && recorder.stop();
    // button.disabled = true;
    // button.previousElementSibling.disabled = false;
    __log('Stopped recording.');

    if(isStream){
      isStream.getAudioTracks().forEach(function(track){
        track.stop() ;
      }) ;
      isStream = false ;
   }
    
    // create WAV download link using audio data blob
    createDownloadLink(handle);
    
    recorder.clear();
  }

  function createDownloadLink(handle) {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;

      var R = new FileReader() ;
          R.readAsDataURL(blob) ;
          R.onload = function(){
            if(handle) handle(R.result) ;
          } ;
    });
  }

  function commencer(handle){
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, function(stream){
      startUserMedia(stream) ;
      handle() ;
    },
    /* error case */
    function(e) {
      __log('No live audio input: ' + e);
    });
  }

  window.addEventListener('load', function(){
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext|| window.mozAudioContext;
      window.URL = window.URL || window.webkitURL, window.mozURL;
      
      audio_context = new AudioContext ;

      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
  });