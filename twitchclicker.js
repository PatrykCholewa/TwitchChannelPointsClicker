// ==UserScript==
// @name         Interval Get Twitch Channel Points
// @namespace    https://greasyfork.org/pl/users/416294-patrykcholewa
// @version      1.0.1
// @description  If stream time, clicks premium currency button anytime it appears.
// @author       PatrykCholewa
// @include      https://www.twitch.tv/*
// @exclude      https://www.twitch.tv/*/videos*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var EVENING_STREAM_TIME_LIMIT = 19;
    var MORNING_STREAM_TIME_LIMIT = 1;

    var counter = 0;

    function isStreamTime() {
        return new Date().getHours() >= EVENING_STREAM_TIME_LIMIT || new Date().getHours() <= MORNING_STREAM_TIME_LIMIT;
    }

    setInterval(function() {
        if (isStreamTime()) {
            setTimeout(function() {
                var button = document.querySelector('[data-test-selector=community-points-summary] button.tw-button--success');

                if (button) {
                    console.debug('TRY CLICK');
                    try {
                        button.click();
                        counter = 0;
                        console.log('BUTTON CLICKED');
                    } catch (ex) {
                        console.error('ERROR CLICKED', ex);
                    }
                    button.click();
                } else {
                    if (counter > 200) {
                        window.location.reload();
                        counter = 0;
                        console.debug('RELOAD');
                    }
                    counter++;
                    console.debug('WAIT BUTTON', 'COUNTER: ' + counter, new Date());
                }
            }, Math.random() * 4000);
        } else {
            console.debug('WAIT TILL STREAM', new Date());
        }

    }, 8000);
})();
