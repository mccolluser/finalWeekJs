window.addEventListener("DOMContentLoaded", function () {
    'use strict';
    let infoHeader = document.querySelector('.info-header');
    let infoHeaderTabs = document.querySelectorAll('.info-header-tab');
    let infoTabContents = document.querySelectorAll('.info-tabcontent');


    function hideContentTabs(index) {
        for (let i = index; i < infoTabContents.length; ++i) {
            infoTabContents[i].classList.remove("show");
            infoTabContents[i].classList.add("hide");
        }
    }


    function showContentTab(index) {
        infoTabContents[index].classList.remove("hide");
        infoTabContents[index].classList.add("show");
    }

    hideContentTabs(1);

    infoHeader.addEventListener('click', event => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            console.log(infoTabContents);
            for (let i = 0; i < infoHeaderTabs.length; ++i) {
                if (target == infoHeaderTabs[i]) {
                    hideContentTabs(0);
                    showContentTab(i);
                    break;
                }
            }
        }
    });

    //timer
    let deadline = '2018-10-18 03:00:00';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60));

        return {
            'total': t,
            'hours': (t < 0) ? 0 : hours,
            'minutes': (t < 0) ? 0 : minutes,
            'seconds': (t < 0) ? 0 : seconds,
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
            hours.textContent = (-1 < t.hours && t.hours < 10) ? "0" + t.hours : t.hours;
            minutes.textContent = (-1 < t.minutes && t.minutes < 10) ? "0" + t.minutes : t.minutes;
            seconds.textContent = (-1 < t.seconds && t.seconds < 10) ? "0" + t.seconds : t.seconds;
        }

    }
    setClock('timer', deadline);

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

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!!!',
        failure: 'Что-то пошло не так'
    };
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let formData = new FormData(form);

        function postData(data) {
            return new Promise(function (resolv, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                let obj = {};
                data.forEach(function (value, key) {
                    obj[key] = value;
                });

                let jsonData = JSON.stringify(obj);

                request.send(jsonData);

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        resolv();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolv();
                    } else {
                        reject();
                    }
                });
            });

        }

        function clearInput() {
            for (let i = 0; i < input.length; ++i) {
                input[i].value = '';
            }
        }
        postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);
    });

    let myform = document.forms.myform,
        myformInputs = myform.getElementsByTagName('input');

    let tel = myform.getElementsByTagName('input')[1];
    tel.addEventListener('keypress', function (event) {
        event.preventDefault();
        if (/\d/.test(event.key) || /\+/.test(event.key)) {
            this.value += event.key;
        }
        return;

    });
    let newMessage = {
        loading: 'logo/ajax-loader.gif',
        success: 'logo/ok.png',
        failure: 'logo/neok.png'
    };
    let loadGif = document.getElementById('loadGif');

    myform.addEventListener('submit', function (event) {
        event.preventDefault();
        let formData = new FormData(myform);

        function postData(data) {
            return new Promise(function (resolv, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                let obj = {};
                data.forEach(function (value, key) {
                    obj[key] = value;
                });
                let jsonData = JSON.stringify(obj);

                request.send(jsonData);

                loadGif.style.display = 'block';

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        resolv();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolv();
                    } else {
                        reject();
                        loadGif.setAttribute('src', newMessage.failure);
                    }
                });
            });
        }

        function clearInput() {
            for (let i = 0; i < myformInputs.length; ++i) {
                myformInputs[i].value = '';
            }
        }
        postData(formData)
            .then(() => {
                loadGif.style.display = 'block';
                loadGif.setAttribute('src', newMessage.loading)
            })
            .then(() => {
                loadGif.style.display = 'block';
                loadGif.setAttribute('src', newMessage.success)
            })
            .catch(() => {
                loadGif.style.display = 'block';
                loadGif.setAttribute('src', newMessage.failure)
            })
            .then(clearInput);

    });
    //Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach(item => item.style.display = 'none');
        dots.forEach(item => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', () => plusSlides(-1));
    next.addEventListener('click', () => plusSlides(1));

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; ++i) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    function animate(total){
        let i = 0;
        setInterval(function(){
            if (i++ < total){
                totalValue.innerHTML = i;
            }


        },0.1);
    }
    //Калькулятор
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;
    totalValue.innerHTML = total;
    persons.addEventListener('change', function (event) {
        if (/\D/.test(this.value)) {
            this.value = '';
        }
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            animate(total);
            // totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener('change', function () {
        if (/\D/.test(this.value)) {
            this.value = '';
        }
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            animate(total);
            // totalValue.innerHTML = total;
        }
    });
    place.addEventListener('change', function () {
        if (restDays.value == '' || personsSum.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            let ans = a * this.options[this.selectedIndex].value;
            animate(ans);
            // totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
    // persons.addEventListener('keypress', function(event){
    //     event.preventDefault();
    //     if (!(/\d/.test(event.key))){
    //         return;
    //     }
    //     else {
    //         this.value += event.key;
    //     }
    // });
    // restDays.addEventListener('keypress', function(event){
    //     event.preventDefault();
    //     if (!(/\d/.test(event.key))){
    //         return;
    //     }
    //     else {
    //         this.value += event.key;
    //     }
    // });

});