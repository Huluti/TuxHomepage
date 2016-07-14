$(document).ready(function () {
    /* Cookies */
    var distrib = Cookies.get("distrib");
    var search = Cookies.get("engine");

    /* Change colors, logo & links */
    function changeDistrib() {
        distrib = Cookies.get("distrib");

        var colors = {
            archlinux: "1793d1",
            debian: "a80030",
            elementaryos: "44a2e9",
            fedora: "374d7b",
            linuxmint: "7dbe3b",
            maegia: "262f45",
            ubuntu: "dd4814"
        };
        var sites = {
            archlinux: "https://www.archlinux.org",
            debian: "https://www.debian.org",
            elementaryos: "https://elementary.io",
            fedora: "https://fedoraproject.org",
            linuxmint: "https://www.linuxmint.com",
            maegia: "https://www.mageia.org",
            ubuntu: "http://www.ubuntu.com"
        };
        var docs = {
            archlinux: "https://wiki.archlinux.fr",
            debian: "https://www.debian.org/doc/index.fr.html",
            elementaryos: "http://www.elementaryos-fr.org/documentation",
            fedora: "http://doc.fedora-fr.org/wiki",
            linuxmint: "https://www.linuxmint.com/documentation.php",
            maegia: "https://www.mageia.org/fr/doc",
            ubuntu: "https://doc.ubuntu-fr.org"
        };

        $("#logo-img").attr("src", "img/" + distrib + "-logo.png");

        $("#search").css("background", "#" + colors[distrib]);
        $("#navbar ul li a").css("color", "#" + colors[distrib]);

        $(".site").attr("href", sites[distrib]).text("Site officiel");
        $(".doc").attr("href", docs[distrib]).text("Documentation");
    }

    /* Distribution cookie */
    if(distrib == null) {
        Cookies.set("distrib", "ubuntu", { expires: 365, path: "/" });
    }
    changeDistrib();

    /* Search engine */
    var searchEngines = {
        bing: "https://www.bing.com/search?q=",
        duckduckgo: "https://duckduckgo.com/?q=",
        ecosia: "https://www.ecosia.org/search?q=",
        google: "https://www.google.com/search?q=",
        qwant: "https://www.qwant.com/?q=",
        yahoo: "https://fr.search.yahoo.com/search?p="
    };

    /* Search cookie */
    if (search == null) {
        Cookies.set("engine", "duckduckgo", { expires: 365, path: "/" });
        $("form").attr("action", searchEngines["duckduckgo"]);
        $("#engine").addClass("duckduckgo");
        search = "duckduckgo";
    } else {
        $("form").attr("action", searchEngines[search]);
        $("#engine").addClass(search);
    }

    /* Settings */

    $("select[name='distribs']").val(distrib);
    $("select[name='engines']").val(search);

    /* Open popup */
    $(".settings").click(function () {
        $("#settings").slideToggle();
    });

    /* Close popup */
    $(".button-cancel").click(function () {
        $("#settings").slideToggle();
    });

    $(".button-success").click(function () {
        var distrib = $("select[name='distribs']").val();
        var engine = $("select[name='engines']").val();

        Cookies.set("distrib", distrib, { expires: 365, path: "/" });
        changeDistrib();

        $("form").attr("action", searchEngines[engine]);
        $("#engine").removeClass().addClass(engine);
        Cookies.set("engine", engine, { expires: 365, path: "/" });

        $("#settings").slideToggle();
    });
});
