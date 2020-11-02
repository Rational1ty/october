function $(id) {
	return document.getElementById(id);
}

$('search-field').addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		submitSearch();
	}
});
$('search-submit').addEventListener('click', submitSearch);

function submitSearch() {
	const query = $('search-field').value.replace(/\s+/g, '+').replace(/\?+/g, '');
	window.location.replace(`https://www.google.com/search?q=${query}`);
}