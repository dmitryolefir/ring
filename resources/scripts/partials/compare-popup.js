(function($) {

  $(function() {

    $('.compare-popup__open-link').on('click', function() {
      $(this).parents('.compare-popup').find('.compare-card__dropdown').trigger('click');
    });

  });

})(jQuery);