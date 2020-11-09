function $(id) {
	return document.getElementById(id);
}

window.addEventListener('load', () => {
	const now = new Date();

	const month = now.getMonth() + 1;
	const year = now.getFullYear();

	const oct = new Date(month < 10 ? year - 1 : year, 9, 1);

	const MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
	const diffDays = Math.ceil((now - oct) / MILLIS_IN_DAY) + '';

	let suffix = 'th';

	// If date does not have a 1 in the tens place (11, 12, 13, etc)
	if (diffDays.charAt(diffDays.length - 2) !== '1') {
		// Check last number in date to determine suffix
		switch (diffDays.toString().slice(-1)) {
			case '1':
				suffix = 'st';
				break;
			case '2':
				suffix = 'nd';
				break;
			case '3':
				suffix = 'rd'
				break;
		}
	}

	$('date').innerHTML = `Today is October ${diffDays}${suffix}!`;
});