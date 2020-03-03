(function($) {

  $(function() {

    let menuBtn = $('.mobile-menu-link');
    let mobileMenu = $('.mobile-menu');
    let body = $('body');

    menuBtn.on('click', function (e) {
      e.preventDefault();
      mobileMenu.addClass('mobile-menu_open');
      body.addClass('menu-is-open');
    });

    $('.mobile-menu__close-btn', mobileMenu).on('click', function (e) {
      e.preventDefault();
      mobileMenu.removeClass('mobile-menu_open');
      body.removeClass('menu-is-open');
    });

  });

})(jQuery);