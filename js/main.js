$(document).ready(function() {
    
    function changeDistribution() {
        var distrib = $.cookie('distribution');

        $('#logo-img').attr('src', 'img/' + distrib + '-logo.png');
        
        var colors = {debian:"A80030", ubuntu:"DD4814", fedora:"374D7B"};
        $('#search').css('background', '#'+colors[distrib]);
        $('#navbar ul li a').css('color', '#'+colors[distrib]);   

        return '';
    }
    
    /* Cookie with distribution */
    if($.cookie('distribution') === undefined) {
        $.cookie('distribution', 'debian', { expires: 365, path: '/' });
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