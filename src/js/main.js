//====================== Nav Button Click Event======================// 
(function(){
    const headerBtn = document.querySelector('.toggler');

    const navWrap = document.querySelector('.nav-wrap');
    const headerBtnWrap = document.querySelector('.h-menu');
    
    const navList = document.querySelectorAll('.nav-lists .list');
    
    function closeNavHandler(){
        navWrap.classList.remove('active');
        headerBtnWrap.classList.remove('active');
    }

    for(let i = 0; i<navList.length; i++){
        navList[i].addEventListener('click',closeNavHandler);
    }

    function menuBtnHandler(){
        navWrap.classList.toggle('active');
        headerBtnWrap.classList.toggle('active');
    }


    headerBtn.addEventListener('click', menuBtnHandler);
    
})();

//==========================Scroll Event===========================//

function isElementUnderBottom(elem, triggerDiff) {
    const { top } = elem.getBoundingClientReac();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0);
} // 높이값 확인

function handleScroll() {
    
    const elems = document.querySelectorAll('.obj-ani');

    elems.forEach(elem => {
        if (isElementUnderBottom(elem, -20)) {
            elem.style.opacity = "0";
            elem.style.transform = 'translateY(70px)';
            elem.style.transitioinDuration = '.4s'
        } else {
            elem.style.opacity = "1";
            elem.style.transform = 'translateY(0px)';
        }
    });
    // event 
}

window.addEventListener('scroll', handleScroll);
// Scroll Event 끝

 // =================== JQuery --- Text Scroll Event================== //
  //get in touch button

//on hover text transform scale
$(document).ready(function(){
    $('.fs-parallex-effect').each(function(){
        var splitText =  $(this).find('.parallex-title').text();      
        //  console.log(splitText);

        for (var i = 0; i < splitText.length; i++) {
            $(this).find('.parallex-title').append('<span class="letter"><span>'+splitText.charAt(i)+'</span></span>');
        }

        // $('.parallex-title .letter').each(function(){
        //     var letterVal = $(this).text();
        //     if(letterVal == " "){
        //         $(this).addClass('space');
        //     }
        // });

        // var letterLength = $('.parallex-title').children('.letter').length;        
        // var transitionTime = (0.3)/(letterLength);

        // for(k = 1; k <= letterLength; k++){
        //     $('.letter:nth-child('+k+')').css('animation-duration',transitionTime+'s');
        //     transitionTime = transitionTime + 0.04;
        // }
    });
});

