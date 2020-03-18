(function($) {

  $(function() {

    let cardActionBlock = $('.card-actions');

    $('.card-actions__action-link', cardActionBlock).on('click', function() {
      let parent = $(this).parents('.card-actions');
      $('.card-actions').not(parent).find('.card-actions__items').hide();
      $('.card-actions__items', parent).toggle();
    });

    $('.card-actions__action').on('click', function() {
      console.log('333');
      $(this).parents('.card-actions').find('.card-actions__items').hide();
    });

    /*Клик вне элемента*/
    $(document).on('click', function(e){
      if ( !$(e.target).parents('.card-actions').length ) {
        $('.card-actions__items', cardActionBlock).hide();
      }
    });

  });

})(jQuery);