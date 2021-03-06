(function($) {

  $(function() {

    let searchForm = $('.search-form');


    $('.search-form__autocomplete-item', searchForm).on('click', function() {

      $('.search-form__input', searchForm).val($(this).text().replace(/\s{2,}/g,' ').trim());
      $('.search-form__autocomplete', searchForm).hide();
    });

    $('.search-form__input', searchForm)
    .on('input', function() {
      $('.search-form__autocomplete', searchForm).show();
    });

    $(document).on('click', function(e){
      if ( !$(e.target).parents('.search-form__input-wrap').length ) {
        $('.search-form__autocomplete', searchForm).hide();
      }
    });

    /*Open/close Deep Search by click Start*/

    $('.search-form__deep-search', searchForm).on('click', function(e) {
      e.preventDefault();
      $('.deep-search').toggleClass('opened');
    });

    /*Open/close Deep Search by click End*/



    /**/
    if ($(window).width() < 1024) {
      searchForm.on('click', '.deep-search__filter-title', function() {
        $(this).parents('.deep-search__filter').toggleClass('opened');
      });
    }



    /*Сounting selected filters Start*/

    searchForm.on('change', '.n-checkbox__input', function() {
      let filterCount = $('.n-checkbox__input:checked:not(.uncountable)', searchForm).length;
      $('.deep-search__count-block .filter-count', searchForm).text(filterCount);
      setCountFilterInBtn(filterCount);

      $('.deep-search__filter', searchForm).each(function() {
        let countSelectedFilter = $('.n-checkbox__input:checked', this).length;
        $('.filter-count', this).remove();
        // if(countSelectedFilter) {
        //   let countBlock = '<div class="filter-count">' + countSelectedFilter + '</div>';
        //   $('.deep-search__filter-title', this).append(countBlock);
        // }
      });

    });

    /*Сounting selected filters End*/



    /*Reset filter Start*/

    $('.deep-search__reset', searchForm).on('click', function(e) {
      e.preventDefault();
      $('.n-checkbox__input', searchForm).prop('checked', false);
      $('.deep-search__count-block .filter-count', searchForm).text(0);
      setCountFilterInBtn(0);
      $('.deep-search__filter-title .filter-count', searchForm).remove();
    });

    /*Reset filter End*/

    /*Select All*/

    $('.n-checkbox__input#all', searchForm).on('change', function(e) {

      if ($(this).is(':checked')) {
        $('.n-checkbox__input:not(#all)', searchForm).prop('checked', true);
      } else {
        $('.n-checkbox__input:not(#all)', searchForm).prop('checked', false);
      }
    });

    /*Select All*/

    /*Select Column*/

    $('.deep-search__column').on('change', function(e) {
      const column = e.target.value;

      console.log(column);

      if ($(this).is(':checked')) {
        $('.' + column, searchForm).prop('checked', true);
      } else {
        $('.' + column, searchForm).prop('checked', false);
      }

    });

    /*Select Column*/


    /*Region Mobile Select Start*/

    $('.region-filter__title', searchForm).on('click', function() {
      if(view === getView()) {
        $('.region-filter__items-wrap', searchForm).toggle();
      }
    });

    $(document).on('click', function(e){
      if ( !$(e.target).parents('.region-filter').length ) {
        $('.region-filter__items-wrap', searchForm).hide();
      }
    });

    /*Region Mobile Select End*/


    /*Rebuild filter Desktop - Mobile Start*/

    let view = getView();
    if(view === 'mobile') {
      rebuildDesktopToMobile();
    }

    window.addEventListener("resize", function () {
      let newView = getView();
      if (newView === 'mobile' && view === 'desktop') {
        rebuildDesktopToMobile();
      }
      if (newView === 'desktop' && view === 'mobile') {
        rebuildMobileToDesktop();
      }
      view = newView;
    });

    function getView() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        return 'desktop';
      }
      else {
        return 'mobile'
      }
    }

    function rebuildDesktopToMobile() {
      let documentFilter = $('.filter__document-position', searchForm);

      let positionFilter = documentFilter.clone();
      positionFilter.find('.position-filter__document').remove();
      positionFilter.addClass('secondary-position-filter');
      let positionFilterTitle = $('.position-filter__param-title', positionFilter).text();
      $('.mobile', positionFilter).text(positionFilterTitle);
      positionFilter.insertAfter(documentFilter);

      documentFilter.find('.position-filter__position').remove();
      documentFilter.addClass('main-position-filter');
    }

    function rebuildMobileToDesktop() {
      let documentFilter = $('.main-position-filter', searchForm);
      let positionFilter = $('.secondary-position-filter', searchForm);
      $('.position-filter__position', positionFilter).insertAfter($('.position-filter__document', documentFilter));
      positionFilter.remove();
      documentFilter.removeClass('main-position-filter');
    }

    /*Rebuild filter Desktop - Mobile End*/

    function setCountFilterInBtn(filterCount) {
      let filterCountBlock = $('.search-form__deep-search-count', searchForm);
      filterCountBlock.text(filterCount);
      if(filterCount) {
        filterCountBlock.removeAttr('style');
      }
      else {
        filterCountBlock.css('width', 0);
        filterCountBlock.css('overflow', 'auto');
      }
    }

    $('.mobile-search').click(function () {
      const searchInput = document.querySelector('.search-form__input');
      if (searchInput) {
        console.log(searchInput);
        searchInput.focus();
      }
    });

  });

})(jQuery);