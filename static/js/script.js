window.onload = function(){
	const primaryNav = document.querySelector('.primary-navigation');
	const navToggle = document.querySelector('.mobile-nav-toggle');
	
	navToggle.addEventListener('click', (e) => {
		const visbility = primaryNav.getAttribute('data-visible');
		if (visbility === "false") {
			primaryNav.setAttribute('data-visible', true);
			navToggle.setAttribute('aria-expanded', true);
		} else {
			primaryNav.setAttribute('data-visible', false);
			navToggle.setAttribute('aria-expanded', false);
		}
	});

	document.addEventListener('dblclick', function(event) {
		event.preventDefault();
	}, { passive: false });

}