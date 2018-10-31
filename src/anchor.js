function anchors() {
    let anchors = document.querySelectorAll('a[href*="#"]');

    anchors.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let b = document.documentElement.offsetHeight;
            let a = document.documentElement.clientHeight;
            let coordContextY = document.querySelector(item.hash).offsetTop;
            // console.log(`contacts = ${coordContextY}px `);
            if (anchors[anchors.length - 1] == event.target) {

                // let tmp = document.querySelector(item.hash).scrollHeight;
                // console.log(tmp);
                // coordContextY -= tmp;
            }
            let scrollingBy = Math.trunc(Math.abs(coordContextY - document.documentElement.scrollTop) / 50);

            if (coordContextY - document.documentElement.scrollTop < 0) {
                scrollingBy *= -1;
            }
            let scrolling = setInterval(() => {
                if (scrollingBy < 0) {
                    if (document.documentElement.scrollTop > coordContextY) {
                        window.scrollBy(0, scrollingBy);
                    } else {
                        window.scrollTo(0, coordContextY);
                        clearInterval(scrolling);
                    }
                } else {
                    if (document.documentElement.scrollTop >= b - a) {
                        console.log('end');
                        window.scrollTo(0, coordContextY);
                        clearInterval(scrolling);
                        return;
                    } else if (document.documentElement.scrollTop < coordContextY) {
                        window.scrollBy(0, scrollingBy);
                    } else {
                        console.log('end2');
                        window.scrollTo(0, coordContextY);
                        clearInterval(scrolling);
                    }
                }
            }, 10);


        });
    });
}
anchors();
// module.exports = anchors;