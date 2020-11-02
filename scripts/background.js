function $(id) {
	return document.getElementById(id);
}

window.addEventListener('resize', () => {
	console.log(window.visualViewport.width, window.visualViewport.height);
});

$('audio-toggle').addEventListener('click', e => toggleAudio(e.target));

window.addEventListener('load', () => {
	$('music').volume = 0.2;
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