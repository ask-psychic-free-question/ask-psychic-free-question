/**
 * Navigation — Mobile menu toggle and keyboard support
 *
 * @package Ask_Psychic_Free_Question
 */

(function () {
	'use strict';

	const toggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.site-header__nav');

	if (!toggle || !nav) return;

	toggle.addEventListener('click', function () {
		const expanded = this.getAttribute('aria-expanded') === 'true';
		this.setAttribute('aria-expanded', String(!expanded));
		nav.classList.toggle('is-open');

		if (!expanded) {
			const firstLink = nav.querySelector('a');
			if (firstLink) firstLink.focus();
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && nav.classList.contains('is-open')) {
			toggle.setAttribute('aria-expanded', 'false');
			nav.classList.remove('is-open');
			toggle.focus();
		}
	});

	document.addEventListener('click', function (e) {
		if (
			nav.classList.contains('is-open') &&
			!nav.contains(e.target) &&
			!toggle.contains(e.target)
		) {
			toggle.setAttribute('aria-expanded', 'false');
			nav.classList.remove('is-open');
		}
	});

	let resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			if (window.innerWidth > 1023 && nav.classList.contains('is-open')) {
				toggle.setAttribute('aria-expanded', 'false');
				nav.classList.remove('is-open');
			}
		}, 150);
	});
})();
