/* =================================
   LOADER                     
=================================== */
jQuery(window).load(function() {
	jQuery(".status").fadeOut();
	jQuery(".preloader").delay(1000).fadeOut("slow");
})

/* =================================
===  RESPONSIVE VIDEO           ====
=================================== */
$(".video-container").fitVids();

/* =================================
===  MAILCHIMP                 ====
=================================== */
/*
$('.mailchimp').ajaxChimp({
    callback: mailchimpCallback,
    url: "http://webdesign7.us6.list-manage.com/subscribe/post?u=9445a2e155b82208d73433060&amp;id=16dc80e353"
});
function mailchimpCallback(resp) {
     if (resp.result === 'success') {
        $('.subscription-success').html('<i class="icon_check_alt2"></i><br/>' + resp.msg).fadeIn(1000);
        $('.subscription-error').fadeOut(500);
        
    } else if(resp.result === 'error') {
        $('.subscription-error').html('<i class="icon_close_alt2"></i><br/>' + resp.msg).fadeIn(1000);
    }  
}
*/

/* =================================
===  STICKY NAV                 ====
=================================== */
$(document).ready(function() {
  $('.main-navigation').onePageNav({
    scrollThreshold: 0.2,
    filter: ':not(.external)',
    changeHash: true
  });
  
});

if (matchMedia('(max-width: 480px)').matches) {
    $('.main-navigation a').on('click', function () {
        $(".navbar-toggle").click();
    });
}


/* NAVIGATION VISIBLE ON SCROLL */
$(document).ready(function () {
    mainNav();
});

$(window).scroll(function () {
    mainNav();
});

if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
  function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

        else $('.sticky-navigation').stop().animate({"top": '-60'});
    }
}

if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
  function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

        else $('.sticky-navigation').stop().animate({"top": '-120'});
    }
}

/* =================================
===  DOWNLOAD BUTTON CLICK SCROLL ==
=================================== */
jQuery(function( $ ){
			$('#download-button').localScroll({
				duration:1000
			});
		});


/* =================================
===  FULL SCREEN HEADER         ====
=================================== */
function alturaMaxima() {
  var altura = $(window).height();
  $(".full-screen").css('min-height',altura); 
  
}

$(document).ready(function() {
  alturaMaxima();
  $(window).bind('resize', alturaMaxima);
});


/* VEX DIALOG INIT */
$(document).ready(function () {
    vex.defaultOptions.className = 'vex-theme-default';
});


/* =================================
===  SMOOTH SCROLL             ====
=================================== */
var scrollAnimationTime = 1200,
    scrollAnimation = 'easeInOutExpo';
$('a.scrollto').bind('click.smoothscroll', function (event) {
    event.preventDefault();
    var target = this.hash;
    $('html, body').stop().animate({
        'scrollTop': $(target).offset().top
    }, scrollAnimationTime, scrollAnimation, function () {
        window.location.hash = target;
    });
});

/* =================================
===  WOW ANIMATION             ====
=================================== */
wow = new WOW(
  {
    mobile: false
  });
wow.init();

/* =================================
===  OWL CROUSEL               ====
=================================== */
$(document).ready(function () {

    $("#feedbacks").owlCarousel({
        navigation: false,
        slideSpeed: 800,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true
    });
/*
    var owl = $("#screenshots");
    owl.owlCarousel({
        items: 4, //10 items above 1000px browser width
        itemsDesktop: [1000, 4], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 2], // betweem 900px and 601px
        itemsTablet: [600, 1], //2 items between 600 and 0
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
    });
*/
});

/* =================================
===  Nivo Lightbox              ====
=================================== */
/*
$(document).ready(function () {

    $('#screenshots a').nivoLightbox({
        effect: 'fadeScale',
    });

});
*/

/* =================================
===  SUBSCRIPTION FORM          ====
=================================== */
$("#subscribe").submit(function (e) {
    e.preventDefault();
    var email = $("#subscriber-email").val();
    var dataString = 'email=' + email;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email)) {
        $.ajax({
            type: "POST",
            url: "subscribe/subscribe.php",
            data: dataString,
            success: function () {
                $('.subscription-success').fadeIn(1000);
                $('.subscription-error').fadeOut(500);
                $('.hide-after').fadeOut(500);
            }
        });
    } else {
        $('.subscription-error').fadeIn(1000);
    }

    return false;
});


/* =================================
===  REGISTER FORM          ====
=================================== */
$("#contact").submit(function (e) {
    e.preventDefault();
    var username = $("#username").val();
    var email = $("#email").val();
    var pass1 = $("#pass1").val();
    var pass2 = $("#pass2").val();
    var text  = 'Mi first Pasting :)';   
    var dataString = 'username=' + username + '&email=' + email + '&pwd=' + pass1 + '&text=' + text;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email) && (username.length > 2)) {
        if ((pass1 == pass2) && (pass1.length > 1) && (pass2.length > 1)) {
            $.ajax({
                type: "POST",
                url: "http://api.pasting.io/registerUser",
                data: dataString,
                success: function (response) 
                {
                    if (response.st == 'ok') {
                        $('.success').fadeIn(1000);
                        $('.error').fadeOut(500);
                        $('.error2').fadeOut(500);

                        /*
                            mixpanel.track("First paste", {
                                "userName": response.attributes.username,
                                "userId": response.attributes.userId
                            });
                        */

                        $.cookie('v', response.v, {expires: 7, path: '/' });
                        $.cookie('uid', response.userId, {expires: 7, path: '/' });
                        $.cookie('u', response.u.toLowerCase(), {expires: 7, path: '/' });
                        location.href = '/' + username.toLowerCase();
                    } else {
                        $('#errorMsg').html(response.msg);
                        $('.error2').fadeIn(1000);
                        $('.error').fadeOut(500);
                        $('.success').fadeOut(500);
                    }
                }
            });
        } else {
            $('#errorMsg').html("Password don't match");
            $('.error2').fadeIn(1000);
            $('.error').fadeOut(500);
            $('.success').fadeOut(500);
        }
    } else {
        $('.error').fadeIn(1000);
        $('.error2').fadeOut(500);
        $('.success').fadeOut(500);
    }
    return false;
});


$('.pastingLogin').on('click', function(e) {

    e.preventDefault();
    
    vex.dialog.open({
      message: 'Enter your username and password',
      input: "<input name=\"username\" type=\"text\" placeholder=\"Username\" required />\n<input name=\"password\" type=\"password\" placeholder=\"Password\" required /> ",
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, {
          text: 'Login'
        }), $.extend({}, vex.dialog.buttons.NO, {
          text: 'Cancel'
        })
      ],
      callback: function(data) 
      {
        if (data) {  
            var dataString = 'username=' + data.username + '&pwd=' + data.password;
            $.ajax({
                type: "POST",
                url: "http://api.pasting.io/loginUser",
                data: dataString,
                success: function (response) 
                {
                    if (response.st == 'ok') {

                        /*
                            mixpanel.identify(response.attributes.userId + "_" + response.attributes.username.toLowerCase());
                            mixpanel.track("User Logged", {
                                "userId": response.attributes.userId,
                                "userName": response.attributes.username.toLowerCase()
                            });
                        */

                        $.cookie('v', response.v, {expires: 7, path: '/' });
                        $.cookie('uid', response.userId, {expires: 7, path: '/' });
                        $.cookie('u', response.username.toLowerCase(), {expires: 7, path: '/' });
                        location.href = '/' + response.username.toLowerCase();

                    } else {
                       
                        /*
                        mixpanel.track("Failed Login", {
                            "userName": data.username,
                            "password": data.password,
                            "msgError": response.attributes.msg
                        });
                        */

                        $.removeCookie('v', { path: '/' });
                        $.removeCookie('uid', { path: '/' });
                        $.removeCookie('u', { path: '/' });
                        vex.dialog.alert(response.msg);
                    }
                }
            });
        } 
      }
    });
});


/* =================================
===  EXPAND COLLAPSE            ====
=================================== */
$('.expand-form').simpleexpand({
    'defaultTarget': '.expanded-contact-form'
});

/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}