function anchors(){
    let anchors = document.querySelectorAll('a[href*="#"]');

    anchors.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let coordContextY = document.querySelector(item.hash).offsetTop;
            if (anchors[anchors.length - 1] == event.target) {
                coordContextY -= 90;
            }
            let scrollingBy = Math.trunc(Math.abs(coordContextY - document.documentElement.scrollTop) / 50);
            
            if (coordContextY - document.documentElement.scrollTop < 0){
                scrollingBy *= -1;
            }

            let scrolling = setInterval(() => {
                if (scrollingBy < 0){
                    if (document.documentElement.scrollTop > coordContextY) {
                        window.scrollBy(0, scrollingBy);
                    } else {
                        window.scrollTo(0, coordContextY);
                        clearInterval(scrolling);
                    }
                } else {
                    if (document.documentElement.scrollTop < coordContextY) {
                        window.scrollBy(0, scrollingBy);
                    } else {
                        window.scrollTo(0, coordContextY);
                        clearInterval(scrolling);
                    }
                }
            }, 10);


        });
    });
}
module.exports = anchors;
