$(document).ready(function () {
    console.log('jQuery is on')


    $('.infoblock__paragraph').addClass('dontsplit');
    $('.infoblock__text').columnize({
        columns: 2
    });


    $('.sidebar__filter__item-trigger').on("click", function (el) {
        el.preventDefault();

        var $this = $(this),
            item = $this.closest('.sidebar__filter__item'),
            list = $this.closest('.sidebar__filter__list'),
            items = list.find('.sidebar__filter__item'),
            content = item.find('.sidebar__filter__inner__list'),
            otherContent = list.find('.sidebar__filter__inner__list'),
            duration = 300;

        if (!item.hasClass('sidebar__filter__item-active')) {
            items.removeClass('sidebar__filter__item-active');
            item.addClass('sidebar__filter__item-active');
//            otherContent.stop(true, true).slideUp(duration);
            content.stop(true, true).slideDown(duration);
        } else {
            content.stop(true, true).slideToggle(duration);
            item.stop(true, true).removeClass('sidebar__filter__item-active');
        }

    });








});