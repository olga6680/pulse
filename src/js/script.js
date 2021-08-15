/* $(document).ready(function() {
    $('.carousel__inner').slick({
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
    autoplay: false
});


document.querySelector('.prev').addEventListener = function() {
    slider.goTo('prev');
};