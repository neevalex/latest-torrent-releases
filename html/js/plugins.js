// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

function divopen(i) {

    $(i).find('.hideme').toggle();

}



jQuery(document).ready(function($) {

    setInterval(function() {
        update();
        console.log('tick');
    }, 10000);

    function update() {

        $.getJSON('/api', function(data) {
           
            $.each(data, function(index, element) {
                    $('.list-group').append('<a target="_blank" href="http://www.rutor.info/' + element.link + '"" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + element.title + '</h5><small class="text-muted">' + element.popularity + '</small></div></a>');
                    var div = "#" + element.job_id; 
            });
        });

    }

    update();


});