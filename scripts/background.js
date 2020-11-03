function $(id) {
	return document.getElementById(id);
}

// window.addEventListener('resize', () => {
// 	console.log(window.visualViewport.width, window.visualViewport.height);
// });

window.addEventListener('load', () => {
	if ('scrollRestoration' in window.history) {
		window.history.scrollRestoration = 'manual';
	}
	window.scroll(0, 0);
	$('music').volume = 0.2;
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

$('volume-control').addEventListener('mouseenter', () => {
	$('audio-slider').style.setProperty('display', 'initial');
});

$('volume-control').addEventListener('mouseleave', () => {
	$('audio-slider').style.setProperty('display', 'none');
});