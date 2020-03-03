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

  });

})(jQuery);