
jQuery(document).ready(function ($) {
    
    function sort() {
        var $wrapper = $('.list-group');

        $wrapper.find('.list-group-item').sort(function (a, b) {
        return +b.dataset.order - +a.dataset.order;
        }).appendTo($wrapper);
    }

    function update() {

        for (let i = 1; i < 4; i++) {
           $.getJSON('/api/' + i, function (data) {
                $('.loading').hide();
                $.each(data, function (index, element) {
                       // console.log(element);
                        $('.list-group').append('<a data-order="' + element.popularity + '" target="_blank" href="http://www.rutor.info/' + element.link + '"" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + element.title + '</h5><small class="text-muted">' + element.popularity + '</small></div></a>');
                        var div = "#" + element.job_id; 
                });
               sort();
            });      
        }
        return;
    }

    update();

});