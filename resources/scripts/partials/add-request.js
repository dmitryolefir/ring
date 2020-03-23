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

      $('.add-request-block__add-input', requestBlock).on('keyup', function(e){
        console.log('add');
        let requestVal = $(this).val();
        if(e.keyCode === 13 && requestVal)
        {
          addRequest(requestVal);
        }
      });

      $(requestBlock).on('click', '.add-request-block__item-text', function() {
        let $this = $(this);
        let parent = $this.parents('.add-request-block__item');
        let input = renderEditInput($this.text());

        resetRequest(requestBlock);

        parent.append(input);
        $this.hide();
        $('.add-request-block__edit-input', parent).focus();

        $('.add-request-block__edit-input', parent).on('keyup', function(e){
           if(e.keyCode === 13)
           {
             editRequest($(this));
             setCountRequest(requestBlock);
           }
        });

      });

      $('.add-request-block__btn', requestBlock).on('click', function() {
        let editInput = $('.add-request-block__edit-input', requestBlock);
        if(editInput.length) {
          editRequest(editInput);
          setCountRequest(requestBlock);
        }
        else {
          let requestVal = $('.add-request-block__add-input', requestBlock).val();
          if(requestVal)
          {
            addRequest(requestVal);
          }
        }
      });

    }

    function renderEditInput(value){
      let classes = 'add-request-block__input add-request-block__edit-input';
      return '<input type="text" value="' + value + '" class="' + classes + '">';
    }

    function addRequest(request, requestBlock) {
      request = '<div class="add-request-block__item-text">' + request + '</div>';
      request = '<div class="add-request-block__item">' + request + '</div>';
      $('.add-request-block__items-inner', requestBlock).append(request);
      $('.add-request-block__input', requestBlock).val('');
      setCountRequest(requestBlock);
    }

    function setCountRequest(requestBlock) {
      let requestCount = $('.add-request-block__item', requestBlock).length;
      $('.add-request-block__count-number', requestBlock).text(requestCount);
    }
    
    function editRequest(editInput) {

      let requestVal = editInput.val();
      let requestRow = editInput.parents('.add-request-block__item');
      let requestItemText = $('.add-request-block__item-text', requestRow);

      if(requestVal) {
        requestItemText.text(requestVal);
        requestItemText.show();
        editInput.remove();
      }
      else {
        requestRow.remove();
      }
    }

    function resetRequest(requestBlock) {
      $('.add-request-block__item', requestBlock).each(function() {
        $('.add-request-block__item-text', this).show();
        $('.add-request-block__edit-input', this).remove();
      });
    }

  });

})(jQuery);