let canvas;
let ctx;

function $(id) {
	return document.getElementById(id);
}

window.addEventListener('load', () => {
	// Set viewport scroll to top- and left-most position
	if ('scrollRestoration' in window.history) {
		window.history.scrollRestoration = 'manual';
	}
	window.scroll(0, 0);

	// TODO: make this use previous setting or user setting
	$('music').volume = 0.2;

	// Initialize canvas and drawing context
	ctx = $('audio-slider').getContext('2d');
});

$('audio-toggle').addEventListener('click', e => toggleAudio(e.target));

function toggleAudio(element) {
	if (element.getAttribute('src') === './assets/music-note.png') {
		element.setAttribute('src', './assets/music-note-disabled.png');
		$('music').pause();
	} else {
		element.setAttribute('src', './assets/music-note.png');
		$('music').play();
	}
}

const volumeControl = $('volume-control');
const audioSlider = $('audio-slider');

volumeControl.addEventListener('mouseenter', () => {
	audioSlider.style.setProperty('display', 'initial');
});
volumeControl.addEventListener('mouseleave', () => {
	audioSlider.style.setProperty('display', 'none');
});

audioSlider.addEventListener('mousedown', () => {
	audioSlider.onmousemove = e => adjustVolume(e);
});
audioSlider.addEventListener('mouseup', () => {
	audioSlider.onmousemove = null;
});

function adjustVolume(e) {
	console.log(e.offsetX);
}