(function($) {

  $(function() {

    addEventOnRequestBlock();


    let requestBtn = document.getElementsByClassName('profile-page__request-btn')[0];

    if(requestBtn) {
      requestBtn.addEventListener('popupLoad', function() {
        addEventOnRequestBlock();
      });
    }


    function addEventOnRequestBlock(){

      let requestBlock = $('.add-request-block');

      $('.add-request-block__input', requestBlock).keyup(function(e){
        let requestVal = $(this).val();
        if(e.keyCode === 13 && requestVal)
        {
          addRequest(requestVal);
        }
      });

    }


    function addRequest(request, requestBlock) {
      request = '<div class="add-request-block__item">' + request + '</div>';
      $('.add-request-block__items-inner', requestBlock).append(request);
      $('.add-request-block__input', requestBlock).val('');
      let requestCount = $('.add-request-block__item', requestBlock).length;
      $('.add-request-block__count-number', requestBlock).text(requestCount);
    }

  });

})(jQuery);