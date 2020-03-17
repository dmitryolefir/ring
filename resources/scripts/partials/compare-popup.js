(function($) {

  $(function() {

    $('.compare-popup__open-link').on('click', function() {
       let parent = $(this).parents('.compare-popup');
      parent.find('.compare-card').addClass('compare-card_opened');
      parent.find('.compare-card__dropdown').addClass('drop-down-btn_opened');
    });

  });

})(jQuery);