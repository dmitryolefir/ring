(function($) {

  $(function() {

    let cardActionBlock = $('.card-actions');

    $('.card-actions__action-link', cardActionBlock).on('click', function() {
      let parent = $(this).parents('.card-actions');
      $('.card-actions__items', parent).toggle();
    });

    /*Клик вне элемента*/
    $(document).on('click', function(e){
      if ( !$(e.target).parents('.card-actions').length ) {
        $('.card-actions__items', cardActionBlock).hide();
      }
    });

  });

})(jQuery);