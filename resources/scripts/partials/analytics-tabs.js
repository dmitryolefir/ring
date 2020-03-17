(function($) {

  $(function() {

  $('.analytics-tabs__tab').on('click', function(e) {
    e.preventDefault();
    let $this = $(this);
    $this.parents('.analytics-tabs').find('.analytics-tabs__tab').removeClass('analytics-tabs__tab_active');
    $this.addClass('analytics-tabs__tab_active');
  });

  });

})(jQuery);