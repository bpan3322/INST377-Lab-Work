let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const slidesArray = Array.from(slides);
const totalSlides = slidesArray.length;
const next = document.querySelector('button.next');
const prev = document.querySelector('button.prev');

next.addEventListener("click", function(){
    moveToNextSlide();
});

prev.addEventListener("click",function(){
    moveToPrevSlide();
});

function updateSlidePosition(slides_position){
    slides_position.forEach((slide)=>{
        slide.classList.remove('carousel_item_visible');
        slide.classList.add('carousel_item_hidden');
    })

    slides[slidePosition].classList.add('carousel_item_visible');
}

function moveToNextSlide(){
    if(slidePosition === totalSlides - 1){
        slidePosition = 0;
    }else{
        slidePosition++;
    }
    updateSlidePosition(slides);
}

function moveToPrevSlide(){
    if(slidePosition === 0){
        slidePosition = totalSlides - 1;
    }else{
        slidePosition--;
    }
    updateSlidePosition(slides);
}