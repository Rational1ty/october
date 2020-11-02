function $(id) {
	return document.getElementById(id);
}

$('search').addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		const query = e.target.value.replace(/\s+/g, '+');
		window.location.replace(`https://www.google.com/search?q=${query}`);
	}
});