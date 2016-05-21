jQuery(function($){
    "use strict";

	var N10 = window.N10 || {};

    // Main functionality
    N10.mainFunctionality = function() {

        var header_height = $('header').height();
        var tabBtn_height = $('.tab-search .nav-tabs .tab-btn-wrapper').height();
        $('.page-banner').css('top',header_height*(-1));
        $('.page-banner').css('margin-bottom',header_height*(-1) - tabBtn_height);

        // banner homepage default
        var width_boder = $('.homepage-default .title').width() - $('.homepage-default .text').width() - 10;
        $('.homepage-default .text .boder').width(width_boder);

        // Slick slider for homepage banner
        $('.homepage-banner-slider').slick({
            centerMode: true,
			centerPadding: '0px',
			slidesToShow: 3,
			responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '0px',
		        slidesToShow: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '0px',
		        slidesToShow: 1
		      }
		    }
		  ]
        });

        // slide section for course teasers
	    $('.courses-list').slick({
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [{
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            }, {
                breakpoint: 601,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    speed: 600
                }
            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    speed: 600
                }
            }]
        });

	    // Slide section for course banner
	    $('.course-banner-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            speed: 2000,
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
            dots: true
        });

        //Smooth Scroll jQuery - see https://css-tricks.com/snippets/jquery/smooth-scrolling/
/*        $(function() {
          $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
              }
            }
          });
        });*/

        ////Responsive for Tab search
        $(window).on('resize load', function(event) {
            //Responsive slider for Tab search default
            if ($(window).width() <= 480) {
                if (!$('.tab-search-default .nav-tabs').hasClass('slick-slider')) {
                    $('.tab-search-default .nav-tabs').slick({
                        fade: true,
                        mobileFirst: true,
                        swipe: false,
                        responsive: [{
                            breakpoint: 480,
                            settings: "unslick"
                        }]
                    });
                    $('.tab-search-default .slick-prev, .tab-search-default .slick-next').on('click', function(event) {
                        console.log($('.tab-search-default .nav-tabs li.slick-current a').attr('href'));
                        $('.tab-search-default .nav-tabs li.slick-current a').tab('show');
                    });
                }
                $('.tab-search-condensed .nav-tabs, .tab-search-transparent .nav-tabs').each(function() {
                    var height = $(this).height();
                    $(this).css('margin-bottom', height * (-1));
                });
            } else {
                $('.tab-search-condensed .nav-tabs, .tab-search-transparent .nav-tabs').removeAttr('style');
            }
        });

        // JS for section Videos bg
        var gurl = $(".video-embed")[0].src;
        $(".video-button-play ").on('click', function(event) {
            $(".video-embed").addClass('show-video');
            $(".video-button-close").addClass('show-video');
            $(".video-embed")[0].src += "&autoplay=1";
            event.preventDefault();
        });

        $(".video-button-close").on('click', function(event) {
            $(".video-embed")[0].src = gurl;
            $(".video-embed").removeClass('show-video');
            $(".video-button-close").removeClass('show-video');
        });

        if($(".input-daterange").length || $(".date .tb-input").length) {
            // jQuery Date Picker
            $('.input-daterange, .date .tb-input').datepicker({
                format: 'mm/dd/yy',
                maxViewMode: 0,
                autoclose: true
            });
        }

        // ----------------------- WOW-JS --------------------------- //
        new WOW().init();

        // ----------------------- SELECTBOX --------------------------- //
        $(".selectbox").selectbox();

        $('#back-top .link').on('click', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 900);
            return false;
        });

        var temp = $(window).height();
        $(window).on('scroll load', function (event) {
            if ($(window).scrollTop() > temp){
                $('#back-top .link').addClass('show-btn');
            }
            else {
                $('#back-top .link').removeClass('show-btn');
            }
        });

        if ($(window).width() > 768){
             // Add class fixed for menu when scroll
            var window_height = $(window).height();

            $(window).on('scroll load', function (event) {
                if ($(window).scrollTop() > window_height) {
                    $(".header-main").addClass('header-fixed');
                }
                else {
                    $(".header-main").removeClass('header-fixed');
                }
            });

            // Show menu when scroll up, hide menu when scroll down
            var lastScroll = 50;
            $(window).on('scroll load', function (event) {
                var st = $(this).scrollTop();
                if (st > lastScroll) {
                    $('.header-main').addClass('hide-menu');
                    if ($('.nav-search').hasClass('hide') === false) {
                        $('.nav-search').toggleClass('hide');
                    }
                }
                else if (st < lastScroll) {
                    $('.header-main').removeClass('hide-menu');
                }

                if ($(window).scrollTop() <= 200 ){
                    $('.header-main').removeClass('.header-fixed').removeClass('hide-menu');
                }
                else if ($(window).scrollTop() < window_height && $(window).scrollTop() > 0) {
                    $('.header-main').addClass('hide-menu');
                }
                lastScroll = st;

            });
        }

        // Show hamburger menu when screen < 1024px
        $('.hamburger-menu').on('click', function(){
            $('.hamburger-menu-wrapper').toggleClass('open');
            $('body').toggleClass('show-nav');
        });

        if ($(window).width() <= 768) {
            // Show/hide dropdown menu
            $('.menu-mobile>.nav-links>.dropdown>.icons-dropdown').on('click', function(){
                if ($(this).parent().find('.dropdown-menu').hasClass('dropdown-focus') === true) {
                    $(this).parent().find('.dropdown-menu').removeClass('dropdown-focus');
                    $(this).removeClass('active');
                }
                else {
                    $('.menu-mobile .dropdown .dropdown-menu').removeClass('dropdown-focus');
                    $('.icons-dropdown').removeClass('active');
                    $(this).parent().find('.dropdown-menu:first').addClass('dropdown-focus');
                    $(this).addClass('active');
                }
            });
            $('.dropdown-submenu .icons-dropdown').on('click', function(){
                $(this).parent().find('.dropdown-menu-2:first').toggleClass('dropdown-focus');
                $(this).toggleClass('active');
            });
        }

        // Please wait stuff
        if ($(window).width() >= 768) {
	        window.loading_screen = window.pleaseWait({
	            logo: "assets/images/logoLarge.png",
	            backgroundColor: '#222',
	            loadingHtml: "<div class='spinner sk-spinner-wave'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
	        });
	        window.loading_screen.finish();
	    }
    };

    $(document).ready(function(){
        N10.mainFunctionality();
    });

    $(window).on('load', function() {
    	//Offset the course tabs to fit inside header container
        if($(window).width() < 768) {
            setTimeout(function () {
                var header_height = $('header').height();
                var tabBtn_height = $('.tab-search .nav-tabs .tab-btn-wrapper').height();
                console.log(tabBtn_height);
                $('.page-banner').css('top',header_height*(-1));
                $('.page-banner').css('margin-bottom',header_height*(-1) - tabBtn_height);
            }, 100);
        };
        //Reload window when resized
        if ($(window).width() >= 768 && $(window).width() <= 1024) {
            $(window).on('resize', function(){
                location.reload();
            });
        }
    });

});
