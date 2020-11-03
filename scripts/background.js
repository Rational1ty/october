let canvas;
let ctx;

function $(id) {
	return document.getElementById(id);
}

// window.addEventListener('resize', () => {
// 	console.log(window.visualViewport.width, window.visualViewport.height);
// });

window.addEventListener('load', () => {
	// Set viewport scroll to top- and left-most position
	if ('scrollRestoration' in window.history) {
		window.history.scrollRestoration = 'manual';
	}
	window.scroll(0, 0);

	// TODO: make this use previous setting or user setting
	$('music').volume = 0.2;

	// Initialize canvas and drawing context
	canvas = $('audio-slider');
	ctx = canvas.getContext('2d');
});

$('audio-toggle').addEventListener('click', e => toggleAudio(e.target));

$('volume-control').addEventListener('mouseenter', () => {
	$('audio-slider').style.setProperty('display', 'initial');
});
$('volume-control').addEventListener('mouseleave', () => {
	$('audio-slider').style.setProperty('display', 'none');
});

function toggleAudio(element) {
	if (element.getAttribute('src') === './assets/music-note.png') {
		element.setAttribute('src', './assets/music-note-disabled.png');
		$('music').pause();
	} else {
		element.setAttribute('src', './assets/music-note.png');
		$('music').play();
	}
}