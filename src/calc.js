function calc(){
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
}
module.exports = calc;