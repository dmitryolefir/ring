(function ($) {

  $(function () {

    let body = $('body');
    let html = $('html');

    $('.popup-btn').on('click', function (e) {

      e.preventDefault();

      let $this = $(this);
      let contentUrl = $this.attr('href');
      let popupWidth = $this.data('width');
      let popupBtn = this;

      downloadContent(contentUrl, function (response) {
        renderPopup(response, popupBtn, popupWidth);
      });

    });



    function downloadContent(contentUrl, callback) {
      jQuery.ajax({
        url: contentUrl,
        type: "get",
        data: [],
        success: function success(response, textStatus, jqXHR) {
          callback(response);
        } });
    }



    function renderPopup(content, popupBtn, popupWidth) {
      downloadContent('/popup/popup.html', function (popup) {
        popup = $(popup);
        $('.popup__content', popup).append(content);
        if(popupWidth) {
          $('.popup__wrap', popup).css('width', popupWidth);
        }
        openPopup(popup);
        let event = new Event('popupLoad');
        popupBtn.dispatchEvent(event);
      });

    }



    function openPopup(popup) {

      html.addClass('popup-lock');
      body.append(popup);

      $('.popup__content', popup).fadeTo(400, 1, function() {

        $('.popup__close', popup).on('click', function (e) {
          e.preventDefault();
          closePopup(popup);
        });

        popup.on('click', function(e) {
          if ( !$(e.target).parents('.popup__content').length ) {
            closePopup(popup);
          }
        });

      });

    }



    function closePopup(popup) {
      $('.popup__content', popup).fadeTo(400, 0, function() {
        popup.remove();
        html.removeClass('popup-lock');
      });
    }


  });

})(jQuery);