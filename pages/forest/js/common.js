$(document).ready(function () {
    
    var jbOffset = $('#header').offset();
    $(window).scroll(function(){
       if($(document).scrollTop() > jbOffset.top){
           $('#header').addClass('#header');
       } 
        else{
            $('#header').removeClass('#header');
        }
    });
    
  

    $('.dp2').hide();

    $('#gnb>li').mouseover(function () {
        $(this).find('.dp2').stop().fadeIn(600);
    });

    $('#gnb>li').mouseout(function () {
        $(this).find('.dp2').stop().fadeOut(500);
    });


    $('.visual').bxSlider({
        auto: true,
        pager: true,
    });

    $('.tabmenu>li>a').click(function () {
        $(this).parent().addClass("active").siblings().removeClass("active");
        return false;
    });
    


    $('.md_product').bxSlider({
        auto: true,
        maxSlides: 3,
        moveSlides: 1,
        slideWidth: 400,
        pager: false
    });





    $('.insta_img').bxSlider({
        auto: true,
        maxSlides: 5,
        moveSlides: 1,
        slideWidth: 240,
        pager: false
    });
    
  


$( window ).scroll( function() {
	if ( $( this ).scrollTop() > 200 ) {
		$( '.go_top' ).fadeIn();
	} else {
		$( '.go_top' ).fadeOut();
	}
} );
    
    $( '.go_top' ).click( function() {
	$( 'html, body' ).animate( { scrollTop : 0 }, 400 );
	return false;
} );


        $('.ranking').bxSlider({
        auto: true,
        pager: false
    });



 $('.banner_event').bxSlider({
        auto: true
    });

});


