$(document).ready(function () {
    var defaultDistrib = "ubuntu";
    var defaultSearchEngine = "qwant";

    /* Return JSON Object */
    function getJson(file) {
        return JSON.parse($.ajax({
            type: "GET",
            url: file,
            dataType: "json",
            global: false,
            async: false,
            success: function (data) {
                return data;
            }
        }).responseText);
    }

    /* Change colors, logo & links */
    function changeDistrib(name) {
        distrib = !name ? defaultDistrib : name;

        if (distrib != $("#logo-img").attr("class")) {
            $("#logo-img").attr("src", "img/" + distrib + "-logo.png").removeClass().addClass(distrib);

            $("#search").css("background", "#" + distribs[distrib].main_color);
            $("#navbar ul li a").css("color", "#" + distribs[distrib].main_color);

            $(".site").attr("href", distribs[distrib].site).text("Site officiel");
            $(".doc").attr("href", distribs[distrib].doc).text("Documentation");

            Cookies.set("distrib", distrib, {expires: 365, path: "/"});
        }
    }

    /* Change search engine logo */
    function changeSearchEngine(name) {
        search = !name ? defaultSearchEngine : name;

        if (search != $("#engine").attr("class")) {
            $("form").attr("action", searchEngines[search].url);
            $("input[type='search']").attr("name", searchEngines[search].parameter);
            $("#engine").removeClass().addClass(search);
            $("#engine").css({"background": "#" + searchEngines[search].colors.circle, "color": "#" + searchEngines[search].colors.font});
            $("#engine").html(search.charAt(0).toUpperCase());

            Cookies.set("engine", search, {expires: 365, path: "/"});
        }
    }

    /* Cookies */
    var distrib = Cookies.get("distrib");
    var search = Cookies.get("engine");

    var distribs = getJson("data/distribs.json");
    var searchEngines = getJson("data/engines.json");

    /* Initialize the page */
    changeDistrib(distrib);
    changeSearchEngine(search);

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
        changeDistrib($("select[name='distribs']").val());
        changeSearchEngine($("select[name='engines']").val());

        $("#settings").slideToggle();
    });
});
