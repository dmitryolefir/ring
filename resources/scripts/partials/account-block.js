(function($) {

  $(function() {

    let accountBlock = $('.account-block');

    $('.account-block__login', accountBlock).on('click', function() {
      $('.account-block__dropdown', accountBlock).toggle();
    });

    /*Клик вне элемента*/
    $(document).on('click', function(e){
      if ( !$(e.target).parents('.account-block').length ) {
        $('.account-block__dropdown', accountBlock).hide();
      }
    });

  });

})(jQuery);