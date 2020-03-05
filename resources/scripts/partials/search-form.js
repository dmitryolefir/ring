(function($) {

  $(function() {

    let searchForm = $('.search-form');

    $('.search-form__input', searchForm)
    .on('input', function() {
      $('.search-form__autocomplete', searchForm).show();
    })
    .on('focusout', function() {
      $('.search-form__autocomplete', searchForm).hide();
    });

    /*Open/close Deep Search by click Start*/

    $('.search-form__deep-search', searchForm).on('click', function(e) {
      e.preventDefault();
      $('.deep-search').toggleClass('opened');
    });

    $(document).on('click', function(e){
      if ( !$(e.target).parents('.search-form').length ) {
        $('.deep-search').removeClass('opened');
      }
    });

    /*Open/close Deep Search by click End*/



    /**/
    searchForm.on('click', '.deep-search__filter-title', function() {
      $(this).parents('.deep-search__filter').toggleClass('opened');
    });



    /*Сounting selected filters Start*/

    searchForm.on('change', '.n-checkbox__input', function() {
      let filterCount = $('.n-checkbox__input:checked', searchForm).length;
      $('.deep-search__count-block-count', searchForm).text(filterCount);
      setCountFilterInBtn(filterCount);

      $('.deep-search__filter', searchForm).each(function() {
        let countSelectedFilter = $('.n-checkbox__input:checked', this).length;
        $('.filter-count', this).remove();
        if(countSelectedFilter) {
          let countBlock = '<div class="filter-count">' + countSelectedFilter + '</div>';
          $('.deep-search__filter-title', this).append(countBlock);
        }
      });

    });

    /*Сounting selected filters End*/



    /*Reset filter Start*/

    $('.deep-search__reset', searchForm).on('click', function(e) {
      e.preventDefault();
      $('.n-checkbox__input', searchForm).prop('checked', false);
      $('.deep-search__count-block-count', searchForm).text(0);
      setCountFilterInBtn(0);
      $('.deep-search__filter-title .filter-count', searchForm).remove();
    });

    /*Reset filter End*/



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
    console.log(view);
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
      console.log('rebuildDesktopToMobile');
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
      console.log('rebuildMobileToDesktop');
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
      }
    }

  });

})(jQuery);