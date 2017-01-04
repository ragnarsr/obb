var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();

oscillator.connect(biquadFilter);
biquadFilter.connect(gainNode);
gainNode.connect(audioCtx.destination);

var initialFreq = 3000;
var initialVol = 0.04;
var initialCutoffFreq = 1000;

oscillator.type = 'sawtooth'; // 'sine, 'square', 'sawtooth', 'triangle' and 'custom'
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.start();

gainNode.gain.value = initialVol;

biquadFilter.type = "lowpass";
biquadFilter.frequency.value = initialCutoffFreq;
biquadFilter.Q.value = 1;

var mute = document.querySelector('.mute');

mute.onclick = function() {
  if(mute.id == "") {
    gainNode.disconnect(audioCtx.destination);
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.connect(audioCtx.destination);
    mute.id = "";    
    mute.innerHTML = "Mute";
  }
}

gainNode.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  gainNode.gain.value = fraction * fraction;
};

oscillator.changePitch = function(element) {
  oscillator.frequency.value = element.value;
};

biquadFilter.changeFreq = function(element) {
  biquadFilter.frequency.value = element.value;
};

biquadFilter.changeQ = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  biquadFilter.frequency.value = fraction;
};
