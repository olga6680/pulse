 $(document).ready(function() {
     /*  $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right.png"></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });
}); */

     const slider = tns({
         container: '.carousel__inner',
         items: 1,
         slideBy: 'page',
         autoplay: false,
         controls: false,
         nav: false
     });


     document.querySelector('.prev').addEventListener('click', function() {
         slider.goTo('prev');
     });

     document.querySelector('.next').addEventListener('click', function() {
         slider.goTo('next');
     });

     $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
         $(this)
             .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
             .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
     });



     function toggleSlide(item) {
         $(item).each(function(i) {
             $(this).on('click', function(e) {
                 e.preventDefault();
                 $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                 $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
             });
         });
     };

     toggleSlide('.catalog-item__link');
     toggleSlide('.catalog-item__back');

     //modal

     $('[data-modal=consultation]').on('click', function() {
         $('.overlay, #consultation').fadeIn('slow');
     });
     $('.modal__close').on('click', function() {
         $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
     });

     $('.button_mini').each(function(i) {
         $(this).on('click', function() {
             $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
             $('.overlay, #order').fadeIn('slow');
         });
     });

     //Form

     function validateForms(form) {
         $(form).validate({
             rules: {
                 name: {
                     required: true,
                     minlength: 2
                 },
                 phone: "required",
                 email: {
                     required: true,
                     email: true
                 }
             },
             messages: {
                 name: {
                     required: "Пожалуйста, введите своё имя",
                     minlength: jQuery.validator.format("Имя должно быть не меньше {0} символов!")
                 },

                 phone: "Пожалуйста введите свой номер телефона",
                 email: {
                     required: "Пожалуйста введите свой email",
                     email: "Неправильно ввведен адрес почты"
                 }
             }

         });
     };

     validateForms('#consultation-form');
     validateForms('#consultation form');
     validateForms('#order form');

     $('input[name=phone]').mask("+38(999) 999-99-99");

     $('form').submit(function(e) {
         e.preventDefault();
         $ajax({
             type: "POST",
             url: "mailer/smart.php",
             data: $(this).serialize()
         }).done(function() {
             $(this).find("input").val("");
             $('#consultation, #order').fadeOut();
             $('.overlay, #thenks').fadeIn('slow');
             $('form').trigger('reset');
         });
         return false;
     });
 });