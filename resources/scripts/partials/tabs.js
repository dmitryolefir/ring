const tabs = document.querySelectorAll('.tabs__item'),
	tabsWrap = document.querySelector('.profile-page__tabs');

if (tabsWrap) {
	tabsWrap.addEventListener('click', function(e){
		for(let i = 0; i < tabs.length; i++) {
			tabs[i].classList.remove('tabs__item-active');
		}
		e.target.parentNode.classList.add('tabs__item-active');
	})
}

const tags = document.querySelectorAll('.search-page__tag'),
	tagsWrap = document.querySelector('.search-page__tags'),
	tagsAll = document.querySelector('.search-page__tag--all')

if (tagsWrap) {
	tagsWrap.addEventListener('click', function(e){
		if(e.target.classList.contains('search-page__tag') && !e.target.classList.contains('search-page__tag--all')) {
			tagsAll.classList.remove('search-page__tag--active');
			e.target.classList.toggle('search-page__tag--active');
		} else if (e.target.classList.contains('search-page__tag--all')) {
			for(let i = 0; i < tags.length; i++) {
				tags[i].classList.remove('search-page__tag--active');
			}
			e.target.classList.toggle('search-page__tag--active');
		}
	})


}