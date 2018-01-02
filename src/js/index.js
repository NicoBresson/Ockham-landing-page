(function ($) {
    "use strict"; 

    // Scroll doux
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 50)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Fermeture du menu lors d'un scroll
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Mise à jour de la section survolée dans la navbar
    $('body').scrollspy({
        target: '#mainNav',
        offset: 50
    });

    // Effondrement de navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Effondrement si la nabvar n'est pas tout en haut
    navbarCollapse();
    // Effondrement quand la page est scrollée
    $(window).scroll(navbarCollapse);

})(jQuery); 

