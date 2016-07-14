$(document).ready(function() {
    /* Cookies */
    var distrib = $.cookie('distribution');
    var search = $.cookie('search');

    /* Cahnge colors, logo & links */
    function changeDistribution() {
        distrib = $.cookie('distribution');

        var colors = { debian:"A80030", ubuntu:"DD4814", fedora:"374D7B", elementaryos:"44A2E9", archlinux:"1793D1", linuxmint:"7DBE3B", maegia:"262F45" };
        var sites = { debian:"https://www.debian.org", ubuntu:"http://www.ubuntu.com/", fedora:"https://fedoraproject.org/", elementaryos:"http://elementaryos.org/",archlinux:"https://www.archlinux.org/", linuxmint:"http://www.linuxmint.com/", maegia:"https://www.mageia.org/"};
        var docs = { debian:"https://www.debian.org/doc/", ubuntu:"http://doc.ubuntu-fr.org/", fedora:"http://doc.fedora-fr.org/wiki/", elementaryos:"http://www.elementaryos-fr.org/documentation/", archlinux:"https://wiki.archlinux.fr/", linuxmint:"http://www.linuxmint.com/documentation.php", maegia:"https://www.mageia.org/fr/doc/"};

        $('#logo-img').attr('src', 'img/' + distrib + '-logo.png');

        $('#search').css('background', '#'+colors[distrib]);
        $('#navbar ul li a').css('color', '#'+colors[distrib]);

        $('.site').attr('href', sites[distrib]).text("Site officiel");
        $('.doc').attr('href', docs[distrib]).text("Documentation");

        return '';
    }

    /* Test if cookie is defined */
    if(distrib === undefined) {
        $.cookie('distribution', 'ubuntu', { expires: 365, path: '/' });
        changeDistribution();
    }
    else {
        changeDistribution();
    }

    /* Choose distribution */
    $('.distribution').click(function(){
        var id_distrib = $(this).attr("id");
        $.cookie('distribution', id_distrib, { expires: 365, path: '/' });
        $('#options').slideToggle();
        changeDistribution();
    });

    /* Chevrons */
    $('.chevrons').click(function(){
        $('#options').slideToggle();
    });
    $('.chevrons2').click(function(){
        $('#options').slideToggle();
    });

    /* Search engine */
    var search_engines = { bing:"https://www.bing.com/search?q=", yahoo:"https://fr.search.yahoo.com/search?p=", google:"https://www.google.com/search?q=", duckduckgo:"https://duckduckgo.com/?q=test", qwant:"https://www.qwant.com/?q=", ecosia:"http://www.ecosia.org/search?q="};

    /* Test if cookie is defined */
    if(search === undefined) {
        $.cookie('search', 'duckduckgo', { expires: 365, path: '/' });
        $('form').attr('action', search_engines['duckduckgo']);
        $('#choose-engine').addClass('duckduckgo');
    }
    else {
        $('form').attr('action', search_engines[search]);
        $('#choose-engine').addClass(search);
    }

    /* Open popup*/
    $('#choose-engine').click(function(){
         $('#engines').slideToggle();
    });

    /* Close popup*/
    $('.button-cancel').click(function(){
        $('#engines').slideToggle();
    });

    /* Choose search engine*/
    $('.button-engine').click(function(){
        var id_se = $(this).attr("id");

        $('form').attr('action', search_engines[id_se]);
        $('#choose-engine').removeClass().addClass(id_se);
        $.cookie('search', id_se, { expires: 365, path: '/' });

        $('#engines').slideToggle();
    });
});
