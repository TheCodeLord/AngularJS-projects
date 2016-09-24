(function () {
    var menuBtn = $('#menuBtn'),
        navigation = $('#navigation'),
        menuDiv = $('#menuDiv'),
        menuHeader = $('#menuHeader');

    if ($(window).width() < 700) {
        navigation.hide();
        menuDiv.css('padding-bottom', '60px');
        menuBtn.show();
        $('#menuHeader').addClass('bottom-line');
    }

    $(window).on('resize', function () {
        if ($(window).width() > 689) {
            navigation.show();
            navigation.children().css('display', 'inline-block');
            menuDiv.css('padding-bottom', '0');
            menuBtn.hide();
            $('#menuHeader').removeClass('bottom-line');
        } else {
            navigation.hide();
            menuDiv.css('padding-bottom', '60px');
            menuBtn.show();
            $('#menuHeader').addClass('bottom-line');
        }
    });

    menuBtn.on('click', function () {
        navigation.toggle();
        navigation.children().css('display', 'block');
    });

    $('.menu-link').on('click', function () {
        if ($(window).width() < 690) {
            navigation.hide();
        }
    });
})();