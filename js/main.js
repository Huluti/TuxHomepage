$(document).ready(function() {
    
    function changeDistribution() {
        var distrib = $.cookie('distribution');
        
        var colors = {debian:"A80030", ubuntu:"DD4814", fedora:"374D7B", elementaryos:"44A2E9", archlinux:"1793D1", linuxmint:"7DBE3B"};
        var sites = {debian:"https://www.debian.org", ubuntu:"http://www.ubuntu.com/", fedora:"https://fedoraproject.org/", elementaryos:"http://elementaryos.org/", archlinux:"https://www.archlinux.org/", linuxmint:"http://www.linuxmint.com/"};
        var docs = {debian:"https://www.debian.org/doc/", ubuntu:"http://doc.ubuntu-fr.org/", fedora:"http://doc.fedora-fr.org/wiki/", elementaryos:"http://www.elementaryos-fr.org/documentation/", archlinux:"https://wiki.archlinux.fr/", linuxmint:"http://www.linuxmint.com/documentation.php"};

        $('#logo-img').attr('src', 'img/' + distrib + '-logo.png');
        
        $('#search').css('background', '#'+colors[distrib]);
        $('#navbar ul li a').css('color', '#'+colors[distrib]); 
        
        $('.site').attr('href', sites[distrib]).text("Site officiel");
        $('.doc').attr('href', docs[distrib]).text("Documentation");
        
        return '';
    }
    
    /* Cookie with distribution */
    if($.cookie('distribution') === undefined) {
        $.cookie('distribution', 'ubuntu', { expires: 365, path: '/' });
        changeDistribution();
    }
    else {
        changeDistribution(); 
    }

    /* Choose distribution*/

    $('.distribution').click(function(){
        var id = $(this).attr("id");
        $.cookie('distribution', id, { expires: 365, path: '/' });
        changeDistribution();
        $('#options').slideToggle();
    });

    /* Chevrons */              
    $('.chevrons').click(function(){
        $('#options').slideToggle();
    });
    $('.chevrons2').click(function(){
        $('#options').slideToggle();
    });
});