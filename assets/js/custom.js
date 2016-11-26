'use strict';

// Toggle navigation
//-------------------------------------------------------------
(function () {

    var navToggleButton = document.getElementsByClassName('nav__toggle landscape')[0];
    var mobNav = document.getElementsByClassName('header__navigation landscape')[0];

    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) {
            mobNav.style.display = 'none';
        }
    });


    navToggleButton.addEventListener('click', function () {
        if (mobNav.style.display !== 'flex') {
            mobNav.style.display = 'flex';
        } else {
            mobNav.style.display = 'none';
        }

    });
    /*   window.addEventListener('resize', function () {
     if (window.innerWidth > 991) {
     mobNav.style.display = 'none';
     }
     });*/

    /*window.addEventListener('resize', function () {
     if (window.innerWidth > 991) {
     mobNav.style.display = 'none';
     } else if (window.innerWidth < 991) {
     navToggleButton.addEventListener('click', function () {
     if (mobNav.style.display !== 'flex') {
     mobNav.style.display = 'flex';
     } else {
     mobNav.style.display = 'none';
     }

     })
     }
     });*/
}());


//Hover procedures
//-------------------------------------------------------------
if (!document.getElementsByClassName('home')[0]) {
    document.getElementsByClassName('nav__procedures--link')[0].addEventListener('mouseover', function () {
        document.getElementsByClassName('header')[0].style.height = '200px';
    }, false);

    document.getElementsByClassName('nav__procedures--link')[0].addEventListener('mouseleave', function () {
        document.getElementsByClassName('header')[0].style.height = '74px';
    }, false);
}


//Appointment modal
//-------------------------------------------------------------
(function () {

    var modalBoxElement = document.getElementsByClassName('modalBox');
    for (var i = 0; i < modalBoxElement.length; i++) {
        modalBoxElement[i].addEventListener('click', function () {
            var modalBackdrop = document.createElement('div');
            modalBackdrop.className = 'modal__backdrop';
            modalBackdrop.id = 'modal__backdrop';
            document.body.appendChild(modalBackdrop);

            document.getElementsByClassName('modal__appointment')[0].style.display = 'block';
        });
    }

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;

        if ("key" in evt) {
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
            isEscape = (evt.keyCode == 27);
        }
        if (isEscape) {
            document.getElementsByClassName('modal__appointment')[0].style.display = 'none';
            document.body.removeChild(document.getElementById('modal__backdrop'));
        }
    };

    document.addEventListener('click', function (e) {
        var target = e.target || e.srcElement;
        if (hasClass(target, 'modalBox')) {
        } else if (target.className == 'modal__backdrop') {
            document.getElementsByClassName('modal__appointment')[0].style.display = 'none';
            document.body.removeChild(document.getElementById('modal__backdrop'));
        }
    });

    var submit = document.getElementsByClassName('modal__appointment')[0].getElementsByClassName('button__group button2')[0];
    var closeModal = document.getElementById('close__modal');

    closeModal.addEventListener('click', function () {
        document.getElementsByClassName('modal__appointment')[0].style.display = 'none';
        document.body.removeChild(document.getElementById('modal__backdrop'));
    });

}());


function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

// Contact Form
//-------------------------------------------------------------

$("#contact-form-gmap").submit(function () {

    $('#contact-form-gmap-msg').addClass('hidden');
    $('#contact-form-gmap-msg').removeClass('alert-success');
    $('#contact-form-gmap-msg').removeClass('alert-danger');

    $('#contact-form-gmap .btn-submit').attr('disabled', 'disabled');

    $.ajax({
        type: "POST",
        url: "php/index.php",
        data: $("#contact-form-gmap").serialize(),
        dataType: "json",
        success: function (data) {

            if ('success' == data.result) {
                $('#contact-form-gmap-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                $('#contact-form-gmap-msg').html(data.msg[0]);
                $('#contact-form-gmap .btn-submit').removeAttr('disabled');
                $('#contact-form-gmap')[0].reset();
            }

            if ('error' == data.result) {
                $('#contact-form-gmap-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                $('#contact-form-gmap-msg').html(data.msg[0]);
                $('#contact-form-gmap .btn-submit').removeAttr('disabled');
            }

        }
    });

    return false;
});


// Appointment Form
//-------------------------------------------------------------

$("#appointment-form").submit(function () {

    $('#appointment-form-msg').addClass('hidden');
    $('#appointment-form-msg').removeClass('alert-success');
    $('#appointment-form-msg').removeClass('alert-danger');

    $('#appointment-form .btn-submit').attr('disabled', 'disabled');

    $.ajax({
        type: "POST",
        url: "php/index.php",
        data: $("#appointment-form").serialize(),
        dataType: "json",
        success: function (data) {

            if ('success' == data.result) {
                $('#appointment-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                $('#appointment-form-msg').html(data.msg[0]);
                $('#appointment-form .btn-submit').removeAttr('disabled');
                $('#appointment-form')[0].reset();
            }

            if ('error' == data.result) {
                $('#appointment-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                $('#appointment-form-msg').html(data.msg[0]);
                $('#appointment-form .btn-submit').removeAttr('disabled');
            }

        }
    });

    return false;
});


// Newsletter Form
//-------------------------------------------------------------------------------

$("#newsletter-form").submit(function () {

    $('#newsletter-form-msg').addClass('hidden');
    $('#newsletter-form-msg').removeClass('alert-success');
    $('#newsletter-form-msg').removeClass('alert-danger');

    $('#newsletter-form input[type=submit]').attr('disabled', 'disabled');

    $.ajax({
        type: "POST",
        url: "php/index.php",
        data: $("#newsletter-form").serialize(),
        dataType: "json",
        success: function (data) {

            if ('success' == data.result) {
                $('#newsletter-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                $('#newsletter-form-msg').html(data.msg[0]);
                $('#newsletter-form input[type=submit]').removeAttr('disabled');
                $('#newsletter-form')[0].reset();
            }

            if ('error' == data.result) {
                $('#newsletter-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                $('#newsletter-form-msg').html(data.msg);
                $('#newsletter-form input[type=submit]').removeAttr('disabled');
            }

        }
    });

    return false;
});


// Initialize Datetimepicker
//-------------------------------------------------------------------------------
$('.datepicker').datepicker().on('changeDate', function () {
    $(this).datepicker('hide');
});


//Nav current
//-------------------------------------------------------------------------------
function setActive() {
    var aTags = document.getElementsByClassName('header__navigation')[0].getElementsByClassName('list')[0].getElementsByTagName('a');
    // var items = document.getElementsByClassName('header__navigation')[0].getElementsByClassName('list')[0].getElementsByClassName('item');
    for (var i = 0; i < aTags.length; i++) {
        if (document.location.href.indexOf(aTags[i].href) >= 0 && aTags[i].parentNode.className == "item2") {
            var navProceduresLink = document.getElementsByClassName('header__navigation')[0].getElementsByClassName('nav__procedures--link')[0];
            navProceduresLink.className += ' active'
        } else if (document.location.href.indexOf(aTags[i].href) >= 0) {
            aTags[i].className += 'active';
        }
    }
}

setActive();


//Nav current
//-------------------------------------------------------------------------------

function setActiveMobile() {
    var aTags = document.getElementsByClassName('header__navigation landscape')[0].getElementsByClassName('list')[0].getElementsByTagName('a');
    // var items = document.getElementsByClassName('header__navigation')[0].getElementsByClassName('list')[0].getElementsByClassName('item');
    for (var i = 0; i < aTags.length; i++) {
        if (document.location.href.indexOf(aTags[i].href) >= 0) {
            aTags[i].className += 'active';
        }
    }
}

setActiveMobile();



