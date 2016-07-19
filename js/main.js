/* Default vars */
var defaultDistrib = "ubuntu";
var defaultSearchEngine = "qwant";

/* Cookies */
var distrib = Cookies.get("distrib");
var search = Cookies.get("engine");

/* Read JSON */
function callFuncWithData(filename, func, params) {
    /* Load JSON file */
    var request = new XMLHttpRequest();
    request.open("GET", "data/" + filename, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            /* Call func with JSON data */
            eval(func + "(data, params)");
        } else {
            alert("Unable to download the file " + filename);
        }
    };

    request.onerror = function() {
        alert("Connection error : unable to download the file " + filename);
    };

    request.send();
}

/* Change colors, logo & links */
function changeDistrib(json, value) {
    distrib = !value ? defaultDistrib : value;

    var logo = document.getElementById("logo-img");

    if (distrib !== logo.className) {
        logo.setAttribute("src", "img/" + distrib + "-logo.png");
        logo.className = distrib;

        document.getElementById("search").style.backgroundColor = "#" + json[distrib].main_color;
        var links = document.querySelectorAll("#navbar ul li a");
        for(var i = 0; i < links.length; i++) {
            links[i].style.color = "#" + json[distrib].main_color;
        }

        var website = document.querySelector(".website");
        website.setAttribute("href", json[distrib].website);
        website.textContent = "Site officiel";

        var doc = document.querySelector(".doc");
        doc.setAttribute("href", json[distrib].doc);
        doc.textContent ="Documentation";

        Cookies.set("distrib", distrib, {expires: 365, path: "/"});
    }
}

/* Change search engine logo */
function changeSearchEngine(json, value) {
    search = !value ? defaultSearchEngine : value;

    var engine = document.getElementById("engine");

    if (search !== engine.className) {
        document.getElementById("form-search").setAttribute("action", json[search].url);
        document.querySelector("input[type='search']").setAttribute("name", json[search].parameter);
        engine.className = search;
        engine.style.backgroundColor = "#" + json[search].colors.circle;
        engine.style.color = "#" + json[search].colors.font;
        engine.textContent = search.charAt(0).toUpperCase();

        Cookies.set("engine", search, {expires: 365, path: "/"});
    }
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
            break;
    }
}

/* Fill selects */
function fillSelects(json, params) {
    var select = document.querySelector("#" + params.name);

    for(var p in json) {
        if ({}.hasOwnProperty.call(json, p)) {
            var option = document.createElement("option");
            option.value = p;
            option.textContent = json[p].name;
            select.appendChild(option);
        }
    }

    select.value = params.currentValue;
}

/* Create links in navbar */
function createLinks(json) {
    var websites = document.getElementById("websites");

    for(var p in json) {
        if ({}.hasOwnProperty.call(json, p)) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("href", json[p]);
            a.textContent = p;
            li.appendChild(a);
            websites.appendChild(li);
        }
    }
}

/* Create links */
callFuncWithData("links.min.json", "createLinks");

/* Initialize the web page */
callFuncWithData("distribs.min.json", "initialize", {"name": "distribs"});
callFuncWithData("engines.min.json", "initialize", {"name": "engines"});

/* Fill selects */
callFuncWithData("distribs.min.json", "fillSelects", {"name": "distribs", "currentValue": distrib});
callFuncWithData("engines.min.json", "fillSelects", {"name": "engines", "currentValue": search});

/* Apply changes */

var distribs = document.getElementById("distribs");
var engines = document.getElementById("engines");

distribs.onchange = function() {
    callFuncWithData("distribs.min.json", "initialize", {"name": "distribs", "value": distribs.value});
};

engines.onchange = function() {
    callFuncWithData("engines.min.json", "initialize", {"name": "engines", "value": engines.value});
};
