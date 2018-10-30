window.addEventListener("DOMContentLoaded", function () {
    'use strict';

    let calc = require("./calc.js"),
        slider = require("./slider.js"),
        timer = require("./timer.js"),
        tabs = require("./tabs.js"),
        modal = require("./modal.js"),
        form = require("./form.js"),
        anchor = require("./anchor.js");

    timer();
    slider();
    calc();
    tabs();
    form();
    modal();
    anchor();







});