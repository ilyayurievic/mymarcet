$(function(){
    $('.header-slider').slick({
        dots: true,
        arrows: false,
    });
});

const tabItem = document.querySelectorAll('.products__tabs-btn');
const tabContent = document.querySelectorAll('.products__content');

Array.from(tabItem).forEach(function (element) {
    element.addEventListener('click', open);
});

function open(evt) {
    const tabTarget = evt.currentTarget;
    const button = tabTarget.dataset.button;
    
    Array.from(tabItem).forEach(function (item) {
        item.classList.remove('products__tabs-btn--active');
    });
    
    tabTarget.classList.add('products__tabs-btn--active');

    tabContent.forEach(function(item){
        item.classList.remove('products__content--active');
    });

    document.querySelector(`#${button}`).classList.add('products__content--active');
    
    // Добавьте здесь логику для отображения соответствующего контента
}


