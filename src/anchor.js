function anchors(){
    let anchors = document.querySelectorAll('a[href*="#"]');

    anchors.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let coordContextY = document.querySelector(item.hash).offsetTop;
            if (anchors[anchors.length - 1] == event.target) {
                coordContextY -= 90;
            }
            let scrolling = setInterval(() => {
                let scrollingBy = 10;

                if (document.documentElement.scrollTop < coordContextY) {
                    // то скроллим на к-во пикселей, которое соответствует одному такту
                    window.scrollBy(0, scrollingBy);
                } else {
                    // иначе добираемся до элемента и выходим из интервала
                    window.scrollTo(0, coordContextY);
                    // window.scrollBy(0, scrollingBy);
                    clearInterval(scrolling);
                    return;
                }
            }, 10);


        });
    });
}
module.exports = anchors;
