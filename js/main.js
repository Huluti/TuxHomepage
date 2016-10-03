/* CORE */

/* Default vars */
var defaultDistrib = "ubuntu";
var defaultEngine = "qwant";

/* Cookies */
var distrib = !Cookies.get("distrib") ? defaultDistrib : Cookies.get("distrib");
var engine = !Cookies.get("engine") ? defaultEngine : Cookies.get("engine");

/* Read JSON file */
function loadJSON(filename, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", "data/" + filename, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState === 4) {
            if(req.status === 200) {
                callback(JSON.parse(req.responseText));
            }
            else {
                console.log("Unable to download the file " + filename);
            }
        }
    };
    req.send(null);
}

/* Create links in navbar */
function createLinks(json) {
    var websites = document.getElementById("websites");
    Object.keys(json).forEach(function (key) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", json[key]);
        a.textContent = key;
        li.appendChild(a);
        websites.appendChild(li);
    });
}

/* Change distrib elements */
function changeDistrib(json) {
    var logo = document.getElementById("logo-img");
    if (distrib !== logo.className) {
        logo.setAttribute("src", "img/" + json[distrib].name.toLowerCase() + "-logo.png");
        logo.className = distrib;
        document.getElementById("search").style.backgroundColor = "#" + json[distrib].main_color;
        var website = document.querySelector(".website");
        website.setAttribute("href", json[distrib].website);
        website.textContent = "Site officiel";
        var doc = document.querySelector(".doc");
        doc.setAttribute("href", json[distrib].doc);
        doc.textContent = "Documentation";
        Cookies.set("distrib", distrib, {expires: 365, path: "/"});
    }
}

/* Change search elements */
function changeEngine(json) {
    var engineCircle = document.getElementById("engine");
    if (engine !== engineCircle.className) {
        document.getElementById("form-search").setAttribute("action", json[engine].url);
        document.querySelector("input[type='search']").setAttribute("name", json[engine].parameter);
        engineCircle.className = engine;
        engineCircle.style.backgroundColor = "#" + json[engine].colors.circle;
        engineCircle.style.color = "#" + json[engine].colors.font;
        engineCircle.textContent = engine.charAt(0).toUpperCase();
        Cookies.set("engine", engine, {expires: 365, path: "/"});
    }
}

/* Fill selects */
function fillSelect(data) {
    var select = document.querySelector("#" + data[0]);
    for(var i = 0; i < data[1].length; i++) {
        var option = document.createElement("option");
        option.value = data[1][i].toLowerCase();
        option.textContent = data[1][i];
        select.appendChild(option);
    }
    select.value = (data[0] === "distribs") ? distrib : engine;
}

/* Handle distribs */
function distribs(json) {
    var distribs = [];
    Object.keys(json).forEach(function (key) {
        distribs.push(json[key].name);
    });

    fillSelect(["distribs", distribs]);
    changeDistrib(json);
}

/* Handle engines */
function engines(json) {
    var engines = [];
    Object.keys(json).forEach(function (key) {
        engines.push(json[key].name);
    });

    fillSelect(["engines", engines]);
    changeEngine(json);
}

/* INIT WEBPAGE */
loadJSON("links.min.json", createLinks);
loadJSON("distribs.min.json", distribs);
loadJSON("engines.min.json", engines);

/* SELECTS ONCHANGE */
var distribsSelect = document.getElementById("distribs");
var enginesSelect = document.getElementById("engines");

distribsSelect.onchange = function() {
    distrib = distribsSelect.value;
    loadJSON("distribs.min.json", changeDistrib);
};

enginesSelect.onchange = function() {
    engine = enginesSelect.value;
    loadJSON("engines.min.json", changeEngine);
};
