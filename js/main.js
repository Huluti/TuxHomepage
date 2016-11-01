"use strict";

/* CORE */

/* Default vars */
var defaultDistrib = "ubuntu";
var defaultEngine = "qwant";
var defaultLanguage = "en";
var languages = ["en", "fr"];

/* Cookies */
var distrib = !Cookies.get("distrib") ? defaultDistrib : Cookies.get("distrib");
var engine = !Cookies.get("engine") ? defaultEngine : Cookies.get("engine");
var language = "";
if (Cookies.get("language")) {
    language = Cookies.get("language");
} else {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.substring(0, 2).toLowerCase();
    if (languages.includes(userLang)) {
        language = userLang;
    } else {
        language = defaultLanguage;
    }
}

/* Read JSON file */
function loadJSON(filename, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", "data/" + filename, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                callback(JSON.parse(req.responseText));
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
        a.className = "btn";
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
        var links = document.querySelectorAll("#navbar a");
        for (var i = 0; i < links.length; i++) {
            links[i].style.color = "#" + json[distrib].main_color;
        }
        var website = document.querySelector(".website");
        website.setAttribute("href", json[distrib].website);
        var doc = document.querySelector(".doc");
        doc.setAttribute("href", json[distrib].doc);
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

/* Change lang of all texts */
function changeLanguage(json) {
    document.querySelector("option[value='en']").textContent = json[language].en_msg;
    document.querySelector("option[value='fr']").textContent = json[language].fr_msg;
    document.querySelector("#input-search input").placeholder = json[language].placeholder_msg;
    document.querySelector(".website").textContent = json[language].website_msg;
    document.querySelector(".doc").textContent = json[language].doc_msg;
    document.querySelector("#about-modal .modal-header").textContent = json[language].about_msg;
    document.querySelector("#about-modal #author_msg").textContent = json[language].author_msg;
    document.querySelector("#about-modal #description_msg").textContent = json[language].description_msg;
    document.querySelector("#about-modal #license_msg").textContent = json[language].license_msg;
    document.querySelector("#about-modal #github_msg").textContent = json[language].github_msg;
    document.querySelector("#about-modal #thanks_msg").textContent = json[language].thanks_msg;
    document.querySelector("#about-modal #contributors_msg").textContent = json[language].contributors_msg;
    document.querySelector("#about-modal #close_msg").textContent = json[language].close_msg;
    Cookies.set("language", language, {expires: 365, path: "/"});
    document.getElementById("languages").value = language;
}

/* Fill selects */
function fillSelect(data) {
    var select = document.querySelector("#" + data[0]);
    data[1].forEach(function (elt) {
        var option = document.createElement("option");
        option.value = elt.toLowerCase();
        option.textContent = elt;
        select.appendChild(option);
    });
    select.value = (data[0] === "distribs") ? distrib : engine;
}

/* Handle distribs */
function initDistribs(json) {
    var distribs = [];
    Object.keys(json).forEach(function (key) {
        distribs.push(json[key].name);
    });

    fillSelect(["distribs", distribs]);
    changeDistrib(json);
}

/* Handle engines */
function initEngines(json) {
    var engines = [];
    Object.keys(json).forEach(function (key) {
        engines.push(json[key].name);
    });

    fillSelect(["engines", engines]);
    changeEngine(json);
}

/* INIT WEBPAGE */
loadJSON("links.min.json", createLinks);
loadJSON("distribs.min.json", initDistribs);
loadJSON("engines.min.json", initEngines);
loadJSON("translations.min.json", changeLanguage);

/* SELECTS ONCHANGE */
document.getElementById("distribs").onchange = function () {
    distrib = this.value;
    loadJSON("distribs.min.json", changeDistrib);
};

document.getElementById("engines").onchange = function () {
    engine = this.value;
    loadJSON("engines.min.json", changeEngine);
};

document.getElementById("languages").onchange = function () {
    language = this.value;
    loadJSON("translations.min.json", changeLanguage);
};
