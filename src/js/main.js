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