$(document).ready(function() {
  console.log('jQuery is on');


  // module declaring
  var myModule = (function() {


    // Module initialization
    var init = function() {
      _setUpListener();
    };


    // Set up listerters
    var _setUpListener = function() {
      $('.goods_slideshow__link').on('click', _slideShow);
      $('.filter__title__link').on('click', _accordion);
      $('.filter__reset').on('click', _clearCheckboxes);
      $('.catalog__view__icons__link-list').on("click", _catalogListView);
      $('.catalog__view__icons__link-list-2').on("click", _catalogListView2);
      $('.catalog__view__icons__link-grid').on("click", _catalogGridView);
    };


    var _catalogGridView = function(e) {
      e.preventDefault();
      if (($('.goods__list')).hasClass('goods__list_list')) {
        $('.goods__list').removeClass('goods__list_list');
      }
        $('.goods__list').addClass('goods__list_grid');
    };

    var _catalogListView2 = function(e) {
      e.preventDefault();
      if (($('.goods__list')).hasClass('goods__list_grid') || ($('.goods__list')).hasClass('goods__list_list')) {
        $('.goods__list').removeClass('goods__list_grid');
        $('.goods__list').removeClass('goods__list_list');
      }
      };


    var _catalogListView = function(e) {
      e.preventDefault();
      if (($('.goods__list')).hasClass('goods__list_grid')) {
        $('.goods__list').removeClass('goods__list_grid');
      }
        $('.goods__list').addClass('goods__list_list');
    };



    // clear checkboxes
    var _clearCheckboxes = function(e) {
      e.preventDefault();
      $(this)
      .parent()
      .siblings()
      .find('input:checkbox')
      .removeProp('checked');
    };


    // accordion
    var _accordion = function(e) {
      e.preventDefault();
      var $this = $(this),
        arrow = $(this).children('.arrow'),
        item = $this.closest('.filter__item'),
        list = $this.closest('.sidebar__filter__list'),
        items = list.find('.sidebar__filter__item'),
        content = item.find('.filter__content'),
        otherContent = list.find('.sidebar__filter__inner__list'),
        duration = 200;
      content.stop(true, true).slideToggle(duration);
      arrow.toggleClass("arrow_down arrow_up");
    };


    // slideshow for catalog section
    var _slideShow = function(e) {
      e.preventDefault();
      var $this = $(this),
        item = $this.closest('.goods_slideshow__item'),
        container = $this.closest('.goods__item-inner'),
        display = container.find('.goods_slideshow-display'),
        path = item.find('img').attr('src'),
        duration = 300;
      if (!item.hasClass('active')) {
        item.addClass('active').siblings().removeClass('active');
        display.find('img').fadeOut(duration, function() {
          $(this).attr('src', path).fadeIn(duration);
        });
      }
    };


    // Columnizer
    $('.infoblock__text').columnize({
      columns: 2
    });


    // select menu for catalog header
    $(".select-by__list").select2({
      minimumResultsForSearch: 1 / 0
    });

    // price filter in accordeon
    $(".filter__slider__body").slider({
      max: 13000,
      min: 0,
      values: [0, 13000],
      range: true,
      orientation: 'horisontal',
      animate: "fast",
      stop: function(event, ui) {
        $(".filter__slider-input_from").val($(".filter__slider__body").slider('values', 0));
          $(".filter__slider-input_to").val($(".filter__slider__body").slider('values', 1));

      },
      slide: function(event, ui) {
       $(".filter__slider-input_from").val($(".filter__slider__body").slider('values', 0));
       $(".filter__slider-input_to").val($(".filter__slider__body").slider('values', 1));
      }
    });

    $(".filter__slider-input_from").on('change', function() {
      var minValue = $(".filter__slider-input_from").val();
      var maxValue = $(".filter__slider-input_to").val();
      if (parseInt(minValue) > parseInt(maxValue)) {
        minValue = maxValue;
        $(".filter__slider-input_from").val(minValue);
      }
      if (parseInt(minValue) > 13000) {
        $(".filter__slider-input_from").val(13000);
        $(".filter__slider-input_to").val(13000);
      }
      if (minValue.length === 0) {
        $(".filter__slider-input_from").val(0);
      }
      $(".filter__slider__body").slider("values", 0, minValue);
    });


    // prevent maxValue to be smaller than minValue,  or maxValue input to be empty, or maxValue to be bigger than 13 000
    $(".filter__slider-input_to").on('change', function() {
      maxDefault = 13000;
      var minValue = $(".filter__slider-input_from").val();
      var maxValue = $(".filter__slider-input_to").val();
      if (maxValue > maxDefault) {
        $(".filter__slider-input_to").val(maxDefault);
      }

      if (parseInt(minValue) > parseInt(maxValue)) {
        maxValue = minValue;
        $(".filter__slider-input_to").val(maxValue);
      }
      $(".filter__slider__body").slider("values", 1, maxValue);
    });



    $('.filter__slider-input').keypress(function(ev) {
      var key, keyChar;
      if (!ev) {
        var event = window.event;
      }
      if (ev.keyCode) {
        key = ev.keyCode;
      }
      else if (ev.which) {
        key = ev.which;
      }

      if (key === null || key === 0 || key === 8 || key === 13 || key === 9 || key === 46 || key === 37 || key === 39) {
        return true;
      }
      keyChar = String.fromCharCode(key);

      if (!/\d/.test(keyChar)) {
        return false;
      }


    });

    return {
      init: init
    };

  })();

  myModule.init();

});
