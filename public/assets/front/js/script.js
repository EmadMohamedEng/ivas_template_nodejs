/* global $, window, document */

//to back 
$(document).on('click', '.back', function () {
    'use strict';
    parent.history.back();
});


//loading screen
$(window).on('load', function () {
    'use strict';
    $('.loading-overlay .spinner').fadeOut(800, function () {
        $(this).parent().fadeOut(500, function () {
            $('body').css('overflow', 'auto');
            $(this).remove();
        });
    });
});


// play and pause
$('.np-play').click(function (e) {
    var audio = document.getElementById('audio_test');
    $('#audioSource').attr('src', $(this).find('.fa').attr('data-src'));
    if ($(this).find('.fa').hasClass('fa-play')) {
        audio.load();
        audio.play();
        $('.np-play').find('.fa').removeClass('fa-pause').addClass('fa-play');
        $(this).find('.fa').addClass('fa-pause').removeClass('fa-play');
    } else {
        $('.np-play').find('.fa').addClass('fa-play');
        $(this).find('.fa').removeClass('fa-pause').addClass('fa-play');
        audio.pause();
    }
});


// wow
new WOW().init();


// accordion
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    };

    var accordion = new Accordion($('#accordion'), false);
});


//owl carousel {team, testimonial}
$('.owl-carousel').owlCarousel({
    center: true,
    rtl: true,
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});
$(".owl-prev").html('<i class="fas fa-chevron-circle-left fa-2x"></i>');
$(".owl-next").html('<i class="fas fa-chevron-circle-right fa-2x"></i>');


//after video show modal
var v = document.getElementById("myVideo");
if(v){
   v.onended = function () {
        $('#exampleModal').modal();
    };
}
//after audio show modal
$('#player').on('ended', function() {
  $('#exampleModal').modal();
});



// x
$('#phone').keyup(function () {
    'use strict';
    $('.validity').css('display', 'block');
    if ($(this).val() == '') {
        $('.validity').css('display', 'none');
    }
});

/* Hidden Logo Img In Foucs */
$('#phone').focusin(function () {
    'use strict';
    $('#image').css('display', 'none');
    $('.strip').css('margin-top', 20);
});

$('#phone').blur(function () {
    'use strict';
    $('#image').css('display', 'block');
    $('.strip').css('margin-top', -45);

    var phone = $("#phone").val();
    if (phone != "" && phone.length == 8) {
        $("#form").submit()
    }

});

