function modal(){
    let anchors = document.querySelectorAll('a[href*="#"]');

    anchors.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let coordContextY = document.querySelector(item.hash).offsetTop;

            let scrolling = setInterval(() => {
                let scrollingBy = 40;

                if (document.documentElement.scrollTop < coordContextY) {
                    // то скроллим на к-во пикселей, которое соответствует одному такту
                    window.scrollBy(0, scrollingBy);
                } else {
                    // иначе добираемся до элемента и выходим из интервала
                    window.scrollTo(0, coordContextY);
                    clearInterval(scrolling);
                }
            }, 10);


        });
    });


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        popup = document.querySelector('.popup'),
        close = document.querySelector('.popup-close');



    // Определение браузера пользователя
    let isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function detectBrowser() {
        let winNav = window.navigator;
        let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
        if (isIEedge) {
            return 'css';
        }
        if (isMobile.any()) {
            return 'no animation';
        }
        return 'js';
    }
    let answer = detectBrowser();

    // Выбор анимации
    if (answer == "css") {
        more.addEventListener('click', () => {
            overlay.style.display = 'block';
            overlay.classList.add('blur-anim');
            document.body.style.overflow = 'hidden';
        });
    } else if (answer == "js") {
        // Анимация на JS
        more.addEventListener('click', () => {
            overlay.style.left = 0;
            document.body.style.overflow = 'hidden';
            overlay.style.display = 'block';
            let speed = 0;
            popup.style.left = 0 + "px";
            let timer = setInterval(() => {
                speed += 20;
                popup.style.left = speed + "px";
                if (popup.offsetLeft == 700) {
                    clearInterval(timer);
                }
            }, 20);
        });
    } else {
        more.addEventListener('click', () => {
            overlay.classList.remove('fade');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

}
module.exports = modal;