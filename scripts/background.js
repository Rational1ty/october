function $(id) {
	return document.getElementById(id);
}

// Get element references
const audioToggle = $('audio-toggle')
const volumeControl = $('volume-control');
const audioVolume = $('audio-volume');
const audioSlider = $('audio-slider');
	const w = audioSlider.width;
	const h = audioSlider.height;
	const min = (w - 100) / 2;
	const max = w - min;
const music = $('music');

// Initialize canvas and drawing context
const ctx = audioSlider.getContext('2d');
ctx.fillStyle = '#fff';
ctx.strokeStyle = '#fff';
ctx.lineWidth = 5;
ctx.lineCap = 'round';

const localStorageAvailable = (function() {
	if ( !('localStorage' in window) ) return false;
	try {
		window.localStorage.setItem('_tempkey', '_tempval');
		window.localStorage.removeItem('_tempkey');
	} catch (ex) {
		console.error('Local storage is not supported by the current browser configuration');
		return false;
	}
	return true;
})();

// Set viewport scroll to top- and left-most position
if ('scrollRestoration' in window.history) {
	window.history.scrollRestoration = 'manual';
}
window.scroll(0, 0);

if (localStorageAvailable) {
	music.volume = Number.parseFloat( window.localStorage.getItem('volume') ?? 0.5 );
} else {
	music.volume = 0.5;
}

updateAudioVolumeIcon();

window.addEventListener('beforeunload', () => {
	// Check if localStorage exists and is available to use
	if (!localStorageAvailable) return;

	// Store page settings
	window.localStorage.setItem('volume', music.volume);
});

audioToggle.addEventListener('click', e => {
	const el = e.target;
	if (el.getAttribute('src') === './assets/music-note.png') {
		el.setAttribute('src', './assets/music-note-disabled.png');
		music.pause();
	} else {
		el.setAttribute('src', './assets/music-note.png');
		music.play();
	}
});

// Volume icon + volume slider
volumeControl.addEventListener('mouseenter', () => {
	audioSlider.style.setProperty('display', 'initial');
	drawVolumeBar();
});
volumeControl.addEventListener('mouseleave', () => {
	audioSlider.style.setProperty('display', 'none');
});

// Audio slider only
audioSlider.addEventListener('mousedown', e => {
	adjustVolume(e);
	updateAudioVolumeIcon();
	drawVolumeBar();

	audioSlider.onmousemove = ev => {
		adjustVolume(ev);
		updateAudioVolumeIcon();
		drawVolumeBar();
	};
});
audioSlider.addEventListener('mouseup', () => {
	audioSlider.onmousemove = null;
});

function adjustVolume(e) {
	const x = 
		e.offsetX < min ? min :
		e.offsetX > max ? max : 
		e.offsetX;

	music.volume = (x - min) / 100;
}

function updateAudioVolumeIcon() {
	if (music.volume === 0) {
		audioVolume.setAttribute('src', './assets/volume-mute.png');
	} else if (music.volume < 0.33) {
		audioVolume.setAttribute('src', './assets/volume-low.png');
	} else if (music.volume < 0.66) {
		audioVolume.setAttribute('src', './assets/volume-med.png');
	} else {
		audioVolume.setAttribute('src', './assets/volume-high.png');
	}
}

function drawVolumeBar() {
	const x = (music.volume * 100) + min;

	ctx.clearRect(0, 0, w, h);
	ctx.beginPath();
	ctx.moveTo(min, h / 2);
	ctx.lineTo(x, h / 2);
	ctx.ellipse(x, h / 2, ctx.lineWidth, ctx.lineWidth, 0, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}