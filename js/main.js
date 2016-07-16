$(document).ready(function () {
    var defaultDistrib = "ubuntu";
    var defaultSearchEngine = "qwant";

    /* Initialize the web page with JSON files */
    function initialize(filename, value) {
        file = "data/" + filename + ".json";
        $.getJSON(file, function (json) {
            switch(filename) {
                case "distribs":
                    value = value ? value : distrib;
                    changeDistrib(value, json);
                    break;
                case "engines":
                    value = value ? value : search;
                    changeSearchEngine(value, json);
            }
        });
    }

    /* Change colors, logo & links */
    function changeDistrib(name, json) {
        distrib = !name ? defaultDistrib : name;

        if (distrib != $("#logo-img").attr("class")) {
            $("#logo-img").attr("src", "img/" + distrib + "-logo.png").removeClass().addClass(distrib);

            $("#search").css("background", "#" + json[distrib].main_color);
            $("#navbar ul li a").css("color", "#" + json[distrib].main_color);

            $(".site").attr("href", json[distrib].site).text("Site officiel");
            $(".doc").attr("href", json[distrib].doc).text("Documentation");

            Cookies.set("distrib", distrib, {expires: 365, path: "/"});
        }
    }

    /* Change search engine logo */
    function changeSearchEngine(name, json) {
        search = !name ? defaultSearchEngine : name;

        if (search != $("#engine").attr("class")) {
            $("form").attr("action", json[search].url);
            $("input[type='search']").attr("name", json[search].parameter);
            $("#engine").removeClass().addClass(search);
            $("#engine").css({"background": "#" + json[search].colors.circle, "color": "#" + json[search].colors.font});
            $("#engine").html(search.charAt(0).toUpperCase());

            Cookies.set("engine", search, {expires: 365, path: "/"});
        }
    }

    /* Cookies */
    var distrib = Cookies.get("distrib");
    var search = Cookies.get("engine");

    /* Initialize the web page */
    initialize("distribs");
    initialize("engines");

    /* Select current options in selects */
    $("select[name='distribs']").val(distrib);
    $("select[name='engines']").val(search);

    /* Open settings popup */
    $(".settings").click(function () {
        $("#settings").slideToggle();
    });

    /* Close settings popup */
    $(".button-cancel").click(function () {
        $("#settings").slideToggle();
    });

    /* Apply changes */
    $(".button-success").click(function () {
        initialize("distribs", $("select[name='distribs']").val());
        initialize("engines", $("select[name='engines']").val());

        $("#settings").slideToggle();
    });
});
