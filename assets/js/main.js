$(window).load(function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow': 'visible'});
})
$(document).ready(function () {

    
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-yellow',
        radioClass: 'iradio_square-yellow',
        increaseArea: '20%' // optional
    });


    $('.layout-grid').on('click', function () {
        $('.layout-grid').addClass('active');
        $('.layout-list').removeClass('active');

        $('#list-type').removeClass('proerty-th-list');
        $('#list-type').addClass('proerty-th');

    });

    $('.layout-list').on('click', function () {
        $('.layout-grid').removeClass('active');
        $('.layout-list').addClass('active');

        $('#list-type').addClass('proerty-th-list');
        $('#list-type').removeClass('proerty-th');

    });

});
$(document).ready(function () {
    $("#bg-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        autoPlay: 5000,
        paginationSpeed: 100,
        singleItem: true,
        mouseDrag: false,
        transitionStyle: "fade"
                // "singleItem:true" is a shortcut for:
                // items : 1, 
                // itemsDesktop : false,
                // itemsDesktopSmall : false,
                // itemsTablet: false,
                // itemsMobile : false 
    });
    $("#prop-smlr-slide_0").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        pagination: true,
        paginationSpeed: 100,
        items: 3

    });
    $("#testimonial-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        pagination: true,
        paginationSpeed: 100,
        items: 3
    });

    $('#price-range').slider();
    $('#property-geo').slider();
    $('#min-baths').slider();
    $('#min-bed').slider();

    var RGBChange = function () {
        $('#RGB').css('background', '#FDC600')
    };

    // Advanced search toggle
    var $SearchToggle = $('.search-form .search-toggle');
    $SearchToggle.hide();

    $('.search-form .toggle-btn').on('click', function (e) {
        e.preventDefault();
        $SearchToggle.slideToggle(300);
    });

    ['counter', 'counter1', 'counter2', 'counter3'].forEach(function (id, index) {
        var counter = document.getElementById(id);
        if (counter) {
            $(counter).prop('stepValue', 0).animate({stepValue: index + 1}, {
                duration: 700,
                step: function (value) { counter.textContent = Math.ceil(value); },
                complete: function () { counter.textContent = sdf_FTS(index + 1, 0, ' '); }
            });
        }
    });

    function sdf_FTS(_number, _decimal, _separator) {
        var decimal = typeof _decimal !== 'undefined' ? _decimal : 2;
        var separator = typeof _separator !== 'undefined' ? _separator : '';
        var factor = Math.pow(10, decimal);
        var rounded = Math.round(parseFloat(_number) * factor) / factor;
        var parts = Number(rounded).toFixed(decimal).split('.');
        var whole = parts[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.|\b)))/g, '$1' + separator);
        return parts[1] ? whole + '.' + parts[1] : whole;
    }

})

// Initializing WOW.JS

new WOW().init();
$(function () {
    var modal = $('#contact-modal');
    var form = document.getElementById('enquiry-form');

    function validateField(field) {
        field.setCustomValidity('');
        var value = field.value.trim();
        if (field.required && !value) {
            field.setCustomValidity('Заповніть це поле.');
        } else if (field.type === 'tel') {
            var digits = value.replace(/\D/g, '');
            if (!/^[+\d\s()\-]+$/.test(value) || !/^(?:0\d{9}|380\d{9})$/.test(digits)) {
                field.setCustomValidity('Введіть український номер: 099 999 99 99 або +380 99 999 99 99.');
            }
        } else if (field.type === 'email' && field.validity.typeMismatch) {
            field.setCustomValidity('Введіть коректну електронну адресу, наприклад name@example.com.');
        } else if (value && field.minLength > 0 && value.length < field.minLength) {
            field.setCustomValidity('Введіть щонайменше ' + field.minLength + ' символів.');
        }
        field.setAttribute('aria-invalid', field.validity.valid ? 'false' : 'true');
    }

    function validateForm(target) {
        var fields = target.querySelectorAll('input, textarea');
        Array.prototype.forEach.call(fields, validateField);
        return target.reportValidity();
    }

    if (form) {
        form.addEventListener('input', function (event) {
            if (event.target.matches('input, textarea')) {
                validateField(event.target);
            }
        });
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validateForm(form)) {
                modal.modal('hide');
            }
        });
        modal.on('show.bs.modal', function (event) {
            var footer = $(event.relatedTarget).closest('.news-letter');
            if (footer.length) {
                document.getElementById('enquiry-email').value = footer.find('input[type=email]').val().trim();
            }
        });
        $('.news-letter form').on('submit', function (event) {
            event.preventDefault();
            document.getElementById('enquiry-email').value = $(this).find('input[type=email]').val().trim();
            modal.modal('show');
        });
        modal.on('shown.bs.modal', function () {
            document.getElementById('enquiry-name').focus();
        });
        modal.on('hidden.bs.modal', function () {
            form.reset();
            Array.prototype.forEach.call(form.querySelectorAll('input, textarea'), function (field) {
                field.setCustomValidity('');
                field.removeAttribute('aria-invalid');
            });
        });
    }

    var contactForm = document.querySelector('.contact-enquiry');
    if (contactForm) {
        contactForm.addEventListener('input', function (event) {
            if (event.target.matches('input, textarea')) {
                validateField(event.target);
            }
        });
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            validateForm(contactForm);
        });
    }
});
