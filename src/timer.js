function timers() {
    //timer
    let deadline = '2019-10-30 19:00:00';

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
}
module.exports = timers;