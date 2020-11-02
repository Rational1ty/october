function $(id) {
	return document.getElementById(id);
}

// function setBackgroundDisplacement() {
// 	document.documentElement.style.setProperty('--max-disp-x', -window.visualViewport.width + '');
// 	document.documentElement.style.setProperty('--max-disp-y', -window.visualViewport.height + '');
// 	console.log(document.documentElement.style.getPropertyValue('--max-disp-x'));
// 	console.log(document.documentElement.style.getPropertyValue('--max-disp-y'));
// }

// window.addEventListener('load', setBackgroundDisplacement);
// window.addEventListener('resize', setBackgroundDisplacement);

$('audio-toggle').addEventListener('click', e => toggleAudio(e.target));

window.addEventListener('load', () => {
	$('music').volume = 0.5;
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