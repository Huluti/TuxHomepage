$(document).ready(function () {
    var defaultDistrib = "ubuntu";
    var defaultSearchEngine = "qwant";

    /* Read JSON */
    function callFuncWithData(filename, func, params) {
        file = "data/" + filename;
        $.getJSON(file, function (json) {
            funcCall = func + "(json, params)";
            eval(funcCall);
        });
    }

    /* Initialize the web page with JSON files */
    function initialize(json, params) {
        switch(params.name) {
            case "distribs":
            distrib = params.value ? params.value : distrib;
            changeDistrib(json, distrib);
            break;
            case "engines":
            search = params.value ? params.value : search;
            changeSearchEngine(json, search);
        }
    }

    /* Fill selects */
    function fillSelects(json, params) {
        var enginesSelect = $("#" + params.name);
        $.each(json, function(value) {
            enginesSelect.append($("<option />").val(value).text(json[value].name));
        });
        enginesSelect.val(params.currentValue);
    }

    /* Change colors, logo & links */
    function changeDistrib(json, value) {
        distrib = !value ? defaultDistrib : value;

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
    function changeSearchEngine(json, value) {
        search = !value ? defaultSearchEngine : value;

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
    callFuncWithData("distribs.json", "initialize", {"name": "distribs"});
    callFuncWithData("engines.json", "initialize", {"name": "engines"});

    /* Fill selects */
    callFuncWithData("distribs.json", "fillSelects", {"name": "distribs", "currentValue": distrib});
    callFuncWithData("engines.json", "fillSelects", {"name": "engines", "currentValue": search});

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
        callFuncWithData("distribs.json", "initialize", {"name": "distribs", 'value': $("select[name='distribs']").val()});
        callFuncWithData("engines.json", "initialize", {"name": "engines", 'value': $("select[name='engines']").val()});

        $("#settings").slideToggle();
    });
});
