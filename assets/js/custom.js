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
            document.getElementById('appointment-form-msg').className = 'alert hidden';
            document.getElementsByClassName('emailValidation modal__appointment--group')[0].className = 'emailValidation modal__appointment--group';
            document.getElementsByClassName('phoneValidation modal__appointment--group')[0].className = 'phoneValidation modal__appointment--group';
            document.getElementById('modalresultEmail').style.display = 'none';
            document.getElementById('modalresultPhone').style.display = 'none';
        }
    };

    document.addEventListener('click', function (e) {
        var target = e.target || e.srcElement;
        if (hasClass(target, 'modalBox')) {
        } else if (target.className == 'modal__backdrop') {
            document.getElementsByClassName('modal__appointment')[0].style.display = 'none';
            document.body.removeChild(document.getElementById('modal__backdrop'));
            document.getElementById('appointment-form-msg').className = 'alert hidden';
            document.getElementsByClassName('emailValidation modal__appointment--group')[0].className = 'emailValidation modal__appointment--group';
            document.getElementsByClassName('phoneValidation modal__appointment--group')[0].className = 'phoneValidation modal__appointment--group';
            document.getElementById('modalresultEmail').style.display = 'none';
            document.getElementById('modalresultPhone').style.display = 'none';
        }
    });

    var submit = document.getElementsByClassName('modal__appointment')[0].getElementsByClassName('button__group button2')[0];
    var closeModal = document.getElementById('close__modal');

    closeModal.addEventListener('click', function () {
        document.getElementsByClassName('modal__appointment')[0].style.display = 'none';
        document.body.removeChild(document.getElementById('modal__backdrop'));
        document.getElementById('appointment-form-msg').className = 'alert hidden';
        document.getElementsByClassName('emailValidation modal__appointment--group')[0].className = 'emailValidation modal__appointment--group';
        document.getElementsByClassName('phoneValidation modal__appointment--group')[0].className = 'phoneValidation modal__appointment--group';
        document.getElementById('modalresultEmail').style.display = 'none';
        document.getElementById('modalresultPhone').style.display = 'none';
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

    if (arrProcSelected.length > 0) {
        for (var i = 0; i < arrProcSelected.length; i++) {
            arrProcSelectedName.push(arrProcSelected[i].innerHTML.replace(/\<\/?span\>/g, ' '));
        }
    }

    var proceduresObject = {
        procedures: arrProcSelectedName
    };

    var strOfProcedures = "";
    for (var key in proceduresObject) {
        if (strOfProcedures != "") {
            strOfProcedures += "&";
        }
        strOfProcedures += key + "=" + proceduresObject[key];
    }

    $('#appointment-form-msg').addClass('hidden');
    $('#appointment-form-msg').removeClass('alert-success');
    $('#appointment-form-msg').removeClass('alert-danger');

    $('#appointment-form .btn-submit').attr('disabled', 'disabled');

    $.ajax({
        type: "POST",
        url: "php/index.php",
        data: $("#appointment-form").serialize() + '&' + strOfProcedures,
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

//Modal Form Validation
//-------------------------------------------------------------------------------


var appointmentForm = document.getElementById('appointment-form');
var validate = document.getElementById('validateModal');
var modalValidateEmail = true,
    emailErr = appointmentForm.getElementsByClassName('emailValidation')[0];


var modalValidatePhone = true,
    phoneErr = appointmentForm.getElementsByClassName('phoneValidation')[0];


validate.addEventListener('click', function () {
    validateEmail(document.getElementById('email').value);
    if (modalValidateEmail === false) {
        emailErr.className = 'emailValidation modal__appointment--group err ';
        document.getElementById('modalresultEmail').style.display = 'block';
    } else if (modalValidateEmail === true) {
        emailErr.className = 'emailValidation modal__appointment--group';
        document.getElementById('modalresultEmail').style.display = 'none';
    }

    validatePhone(document.getElementById('appointment-phone').value);
    if (modalValidatePhone === false) {
        phoneErr.className = 'phoneValidation modal__appointment--group err ';
        document.getElementById('modalresultPhone').style.display = 'block';
    } else if (modalValidatePhone === true) {
        phoneErr.className = 'phoneValidation modal__appointment--group';
        document.getElementById('modalresultPhone').style.display = 'none';
    }

});


//Contacts Form Validation
//-------------------------------------------------------------------------------

var contactFormGmap = document.getElementById('contact-form-gmap');
var validateContacts = document.getElementById('validateContacts');
var contactsValidateEmail = true,
    contactsEmailErr = contactFormGmap.getElementsByClassName('contactsEmailValidation')[0];


var contactsValidatePhone = true,
    contactsPhoneErr = contactFormGmap.getElementsByClassName('contactsPhoneValidation')[0];


validateContacts.addEventListener('click', function () {
    validateEmail(document.getElementById('email_address').value);
    if (contactsValidateEmail === false) {
        contactsEmailErr.className = 'contactsEmailValidation contact__form--group err ';
        document.getElementById('contactsResultEmail').style.display = 'block';
    } else if (contactsValidateEmail === true) {
        contactsEmailErr.className = 'contactsEmailValidation contact__form--group';
        document.getElementById('contactsResultEmail').style.display = 'none';
    }

    validatePhone(document.getElementById('contact-form-phone').value);
    if (contactsValidatePhone === false) {
        contactsPhoneErr.className = 'contactsPhoneValidation contact__form--group err ';
        document.getElementById('contactsResultPhone').style.display = 'block';
    } else if (contactsValidatePhone === true) {
        contactsPhoneErr.className = 'contactsPhoneValidation contact__form--group';
        document.getElementById('contactsResultPhone').style.display = 'none';
    }

});


//FUNCTIONS
//-------------------------------------------------------------------------------
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    modalValidateEmail = re.test(email);
    contactsValidateEmail = re.test(email);
}

function validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    modalValidatePhone = re.test(phone);
    contactsValidatePhone = re.test(phone);
}
