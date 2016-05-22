jQuery(function($){
    "use strict";    

    // Please wait stuff
    if ($(window).width() > 1024) {
        window.loading_screen = window.pleaseWait({
            logo: "assets/images/logoLarge.png",
            backgroundColor: '#222',
            loadingHtml: "<div class='spinner sk-spinner-wave'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
        });
        window.loading_screen.finish();
    }

});