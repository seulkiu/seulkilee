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
    const { top } = elem.getBoundingClientRect();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0); 
}

function handleScroll() {
    
    const elems = document.querySelectorAll('.obj-ani');

    elems.forEach(elem => {
        if (isElementUnderBottom(elem, -20)) {
            elem.style.opacity = "0";
            elem.style.transform = 'translateY(70px)';
            elem.style.transitioinDuration = '.5s'
        } else {
            elem.style.opacity = "1";
            elem.style.transform = 'translateY(0px)';
        }
    });
    // event 
}

window.addEventListener('scroll', handleScroll);
// Scroll Event 끝

