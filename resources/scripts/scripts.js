/*
 * Third party
 */
@@include('source/jquery.min.js');

/*
 * Custom
 */
@@include('partials/collapse.js');
@@include('partials/popup.js');
@@include('partials/mobile-menu.js');
@@include('partials/n-select.js');
@@include('partials/search-form.js');

@@include('partials/compare-card.js');

@@include('partials/sort-block.js');
@@include('partials/analytics-tabs.js');
@@include('partials/donate-form.js');


@@include('partials/tabs.js');
@@include('partials/hero-animation.js');

var tower = @@include('animation/tower.json');

var lottyContainer = document.querySelector('[data-lotty]');

if (lottyContainer) {
	lottie.loadAnimation({
		container: lottyContainer, // the dom element that will contain the animation
		renderer: 'svg',
		loop: true,
		autoplay: true,
		animationData: tower // the path to the animation json
	});
}