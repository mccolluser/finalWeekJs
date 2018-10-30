function modal() {
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
            overlay.style.top = 0;

            document.body.style.overflow = 'hidden';
            overlay.style.display = 'block';
            let speed = 0;
            popup.style.left = 0 + "px";
            let stopAnimateWidth = Math.trunc(document.documentElement.clientWidth / 2);
            let timer = setInterval(() => {
                speed += 20;
                popup.style.left = speed + "px";
                if (popup.offsetLeft > stopAnimateWidth) {
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
        document.querySelectorAll('.status').forEach(function(item){
            item.style.display = 'none';
        })
    });


}
module.exports = modal;