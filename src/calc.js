function calc() {
    function animate(total) {
        let i = 0;
        let timer = setInterval(function () {
            i += 300;
            if (i < total) {
                totalValue.innerHTML = i;
            } else {
                totalValue.innerHTML = total;
                clearInterval(timer);
                return;
            }

        }, 0.1);
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
        if (personsSum == 0 || daysSum == 0){
            total = 0;
        } else{
            total = (daysSum + personsSum) * 4000;
        }
        
        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            let ans = a * place.options[place.selectedIndex].value;
            animate(ans);
            // totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener('change', function () {
        if (/\D/.test(this.value)) {
            this.value = '';
        }
        daysSum = +this.value;
        if (personsSum == 0 || daysSum == 0){
            total = 0;
        } else{
            total = (daysSum + personsSum) * 4000;
        }
        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            let ans = a * place.options[place.selectedIndex].value;
            animate(ans);
            // totalValue.innerHTML = total;
        }
    });
    place.addEventListener('change', function () {
        if (restDays.value == '' || personsSum.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            let ans = a * place.options[place.selectedIndex].value;
            animate(ans);
            // totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

}
module.exports = calc;