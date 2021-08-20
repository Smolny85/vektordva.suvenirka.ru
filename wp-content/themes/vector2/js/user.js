jQuery(document).ready(function($) {
    
    var kurs = $('#kurs-dollara').text();
    
    $('.tablepress.pricetable').each(function(){
        var table = $(this);
        var price_cells = table.find('tbody td');
        if(table.hasClass('ignore-column-1')) {
            price_cells = price_cells.filter('td:not(.column-1)');
        }
        if(table.hasClass('ignore-column-2')) {
            price_cells = price_cells.filter('td:not(.column-2)');
        }
        if(table.hasClass('ignore-column-3')) {
            price_cells = price_cells.filter('td:not(.column-3)');
        }
        if(table.hasClass('ignore-column-7')) {
            price_cells = price_cells.filter('td:not(.column-7)');
        }
		if(table.hasClass('ignore-column-13')) {
            price_cells = price_cells.filter('td:not(.column-13)');
        }
        price_cells.each(function(){
            dollar_price = $(this).text();
            ruble_price = Math.round(dollar_price * kurs);
            ruble_price_formatted = (ruble_price + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            $(this).text(ruble_price_formatted + ' руб.');
        });
    });
    
    $('.sidebar #sidemenu > li > ul > li > ul').hide();
    $('.sidebar #sidemenu > li > ul > li > a').click(function(e){
        e.preventDefault();
        $(this).siblings('ul').slideToggle();
    });
    
    $('.horblock > img').wrap('<div class="item"></div>');

    $('.out-clients .slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    /* dots: true,
                     arrows: false*/
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    
    // Включаем всплывающие картинки
    /*$( '.swipebox' ).swipebox({
        hideBarsDelay: 0
    });*/
        
    // Кнопка вверх
    $("#back-top").hide();

    $('#poly-btn').click(function (e) {
        e.preventDefault();
        $(this).parents("nav:eq(0).navbar").toggleClass('has-child-menu');
        let target = $(this).data('target');
        $("div.sidebar").toggle();
    });

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            };
			
			// Yandex Maps LazyLoad
			if ($("div").is('#ymaps_container') && !$('#ymaps_container').attr('loaded')) {
			  if ($(window).scrollTop() + $(window).height() >= $('#ymaps_container').offset().top) {

				  $('#ymaps_container').attr('loaded', true);

				  var el = document.createElement("script");
				  el.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A416cbc5d821a05059ded4363c66b481819f502badb8fb30eda94f798608cecbd&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=false";

				  $('#ymaps_container').append(el);
				}
			  }
        });

        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
    
});