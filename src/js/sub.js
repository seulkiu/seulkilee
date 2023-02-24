//=========================Page Close button=========================//
const iconBackElem = document.querySelector('.h-menu');

iconBackElem.addEventListener('click', function (){
    window.history.back();
    // console.log('click');
});





lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: false,
    fitImagesInViewport:false
})