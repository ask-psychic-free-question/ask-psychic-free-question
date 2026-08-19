/**
 * Main JS — misc interactions
 *
 * @package Ask_Psychic_Free_Question
 */

(function () {
	'use strict';

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Lazy load images (native + fallback)
	if ('loading' in HTMLImageElement.prototype) {
		document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
			img.src = img.dataset.src || img.src;
		});
	}

})();
