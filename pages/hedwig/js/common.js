$(document).ready(function () {

    var jbOffset = $('#header').offset();
    $(window).scroll(function () {
        if ($(document).scrollTop() > jbOffset.top) {
            $('#header').addClass('#header');
        } else {
            $('#header').removeClass('#header');
        }
    });

    var menu = $('.gnb');
    var navLink = $('ul li a');
    var content = $('.content');

    navLink.on('click', function (event) {
        event.preventDefault();
        var target = $(this).attr('href');
        var top = $(target).offset().top;
        $('html,body').animate({
            scrollTop: top
        }, 500);
    });

    content.click(function () {
        menu.toggleClass('menu_active');
    });
    
    // 클립 비디오 썸네일 슬라이더
    $('.clip').bxSlider({
        auto: true,
        touchEnabled : false,
        maxSlides: 4,
        moveSlides: 1,
        slideWidth: 231,
        slideMargin: 26, //타블렛사이즈일때 마진 조정 우째하는지
        pager: false
    });
    
    
    
       $('.mgnb_wrap').hide();
    
    $('.mgnb').click(function(){
    $('.mgnb_wrap').fadeIn();
    });
    
    //
    $('.close').click(function(){
    $('.mgnb_wrap').fadeOut();
    });

    
     $('.mcast').bxSlider({
         auto:true,
         pager: false,
         controls: false
     });
    
    $('.most').bxSlider({
       auto:true,
        pager: false,
        controls: false,
        speed: 500
    });

    
    
   
    
    
    
});
