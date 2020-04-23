const acc = document.querySelectorAll('.load-more');

if (acc) {
	for(let i = 0; i < acc.length; i++) {
		const id = acc[i].dataset.btn,
			content = document.querySelector("[data-content='" + id + "']");

		acc[i].addEventListener('click', function(){
			content.classList.toggle('load-more-content--active');

			if(content.style.maxHeight) {
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
		})
	}
}

$('.full-card__collapse').on('click', '.full-card__header', function() {
	$(this).parents('.full-card').toggleClass('opened');
});

$('.full-card__print').on('click', function () {
	window.print();
});