(function($) {

  $(function() {

    let Contents = function (contentBlock) {

      this.contents = $('.contents');

      self = this;

      generateContentsItems(contentBlock);
      addEvents();


      function generateContentsItems(contentBlock) {
        setIdForTitles(contentBlock);
        let links = '';
        contentBlock.each(function() {
          let $this = $(this);
          let idBlock = '#' + $this.attr('id');
          let linkClass = 'contents__item ' + $this.data('empty');
          links += '<a class="' + linkClass + '" href="' + idBlock + '">' + $('h2', $this).html() + '</a>';
        });
        $('.contents__items', self.contents).append(links);
      }

      function setIdForTitles(contentBlock) {
        let counter = 1;
        contentBlock.each(function() {
          $(this).attr('id', 'declaration-title-' + counter);
          counter += 1;
        });
      }

      function closeContents() {
        self.contents.removeClass('opened');
        $('html').removeClass('contents-lock');
      }

      function addEvents() {

        $('.contents__close', self.contents).on('click', function() {
          closeContents();
        });

        $('.contents__open', self.contents).on('click', function() {
          self.contents.addClass('opened');
          $('html').addClass('contents-lock');
        });

        $('.contents__item', self.contents).on('click', function(e) {
          e.preventDefault();
          let scrollBlock = $(this).attr('href');
          scrollBlock = $(scrollBlock);
          closeContents();
          $('.nacp-section').removeClass('opened');
          $('html, body').animate({
            scrollTop: scrollBlock.offset().top
          }, 1000, 'swing', function() {
            scrollBlock.addClass('opened');
          });
        });

      }

    };


    let declarationBlock = $('.declaration-details');

    if(declarationBlock.length) {
      let declarationId = declarationBlock.data('id');
      downloadDeclarationContent(declarationId, function(declarationContent) {
        declarationBlock.append(declarationContent);
        prepareContent();
        addEvents();
        new Contents($('.nacp-section'));

      });
    }

    function prepareContent(){

      let declaration = $('.declaration-details');

      declaration.contents().filter(function() {
        return this.nodeType === 3; // get only the text nodes
      })
      .wrap( "<p></p>" );


      $('header', declaration).each(function(){
        $(this).nextUntil("header").addBack().wrapAll('<div class="nacp-section" />');
      });


      $('.nacp-section').each(function( index ) {

        let $this = $(this);
        let someInfo = $this.find('table, .personal-info, label');
        let dataEmpty = someInfo.length ? 'full' : 'empty';

        $this.find('header').children().not('h2').insertAfter($this.find('header'));
        $this.children().not('header').wrapAll('<div class="body" />');
        $this.attr('id', 'toc-id-' + index);
        $this.attr('data-empty', dataEmpty);

        if(index > 1 && index < 18) {
          let $body = $this.find('.body');
          $body.each(function() {
            $(this).find('p').nextUntil('div').addBack().wrapAll('<div class="help-block__text" />');
            $(this).find('.help-block__text').wrap('<div class="help-block"></div>');
            let helpText = $(this).find('.help-block');
            helpText.prepend(generateHelpBtn());
          });
        }

      });


    }

    function addEvents(){

      $('.help-block__btn').on('click', function() {
        $(this).next('.help-block__text').toggle();
      });

      $('.nacp-section header').on('click', function() {
        $(this).parents('.nacp-section').toggleClass('opened');
      });

    }


    $('.tenders__top').on('click', function() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        $('.tenders').toggleClass('opened');
      }
    });

    $('.tenders__description').on('click', function() {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        $('.tenders').toggleClass('opened');
      }
    });

    function downloadDeclarationContent(declarationId, callback) {
      let contentUrl = 'declaration/' + declarationId + '.html';
      jQuery.ajax({
        url: contentUrl,
        type: "get",
        data: [],
        success: function success(response, textStatus, jqXHR) {
          callback(response);
        } });
    }

    function generateHelpBtn(){
      let btn = '<div class="help-block__btn-dot"></div>';
      let title = 'Пояснення щодо цього розділу декларації';
      btn += '<div class="help-block__btn-dot"></div>';
      btn += '<div class="help-block__btn-dot"></div>';
      btn = '<div title="' + title + '" class="help-block__btn">' + btn + '</div>';
      return btn;
    }

  });

})(jQuery);