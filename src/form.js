function forms() {
    
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
        statusMessage.style.display = 'block';
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
}
module.exports = forms;