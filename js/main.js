"use strict";

/* CORE */

/* Default vars */
var defaultDistrib = "ubuntu";
var defaultEngine = "qwant";
var defaultLanguage = "en";

/* Use cookies if defined, else use default values */
var distrib = Cookies.get("distrib") ? Cookies.get("distrib") : defaultDistrib;
var engine = Cookies.get("engine") ? Cookies.get("engine") : defaultEngine;
var language = Cookies.get("language") ? Cookies.get("language") : defaultLanguage;

/* Global vars */
var languages = [];

/* Read JSON file, then call callback function */
function loadJSON(filename, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", "data/" + filename, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            callback(JSON.parse(this.response));
        } else {
            alert("Unable to download json data...");
        }
    };
    request.onerror = function() {
        alert("Unable to download json data...");
    };
    request.send();
}

/* Create links in navbar */
function createLinks(json) {
    var links = document.querySelectorAll(".link");
    var lang = json.hasOwnProperty(language) ? language : defaultLanguage;
    Object.keys(json[lang]).forEach(function (key, index) {
        links[index].setAttribute("href", json[lang][key]);
        links[index].textContent = key;
    });
}

/* Change distrib elements */
function changeDistrib(json) {
    var logo = document.getElementById("logo-img");
    /* Change if new distrib is not current distrib */
    if (distrib !== logo.className) {
        /* Change logo of distrib */
        logo.setAttribute("src", "img/" + json[distrib].name.toLowerCase() + "-logo.png");
        logo.className = distrib;
        /* Change color of search div */
        document.getElementById("search").style.backgroundColor = "#" + json[distrib].main_color;
        /* Change colors of links in navbar */
        var links = document.querySelectorAll("#navbar a");
        for (var i = 0; i < links.length; i++) {
            links[i].style.color = "#" + json[distrib].main_color;
        }
        /* Change specific distrib links */
        var website = document.querySelector(".website");
        website.setAttribute("href", json[distrib].website);
        var doc = document.querySelector(".doc");
        doc.setAttribute("href", json[distrib].doc);
        var distrowatch = document.querySelector(".distrowatch");
        distrowatch.setAttribute("href", "http://distrowatch.com/"+json[distrib].name)
        /* Set distrib cookie with new value */
        Cookies.set("distrib", distrib, {expires: 365, path: "/"});
    }
}

/* Change search elements */
function changeEngine(json) {
    var engineCircle = document.getElementById("engine");
    /* Change if new engine is not current engine */
    if (engine !== engineCircle.className) {
        /* Set parameters to do search */
        document.getElementById("form-search").setAttribute("action", json[engine].url);
        document.querySelector("input[type='search']").setAttribute("name", json[engine].parameter);
        engineCircle.className = engine;
        /* Change style of engine circle */
        engineCircle.style.backgroundColor = "#" + json[engine].colors.circle;
        engineCircle.style.color = "#" + json[engine].colors.font;
        engineCircle.textContent = engine.charAt(0).toUpperCase();
        /* Set engine cookie with new value */
        Cookies.set("engine", engine, {expires: 365, path: "/"});
    }
}

/* Translate webpage */
function changeLanguage(json) {
    /* Change lang of all texts */
    var elts = [];
    for (var i = 0; i < languages.length; i++) {
        elts[languages[i]] = ["option[value=" + languages[i] + "]", "textContent"];
    }
    elts["placeholder"] = ["#input-search input", "placeholder"];
    elts["doc"] = ["#doc-text", "textContent"];
    elts["website"] = ["#website-text", "textContent"];
    elts["distrowatch"] = ["#distrowatch-text", "textContent"];
    elts["about"] = ["#about-text", "textContent"];
    elts["author"] = ["#author-text", "textContent"];
    elts["description"] = ["#description-text", "textContent"];
    elts["license"] = ["#license-text", "textContent"];
    elts["github"] = ["#github-text", "textContent"];
    elts["thanks"] = ["#thanks-text", "textContent"];
    elts["contributors"] = ["#contributors-text", "textContent"];
    elts["close"] = ["#close-text", "textContent"];
    Object.keys(elts).forEach(function (key) {
        document.querySelector(elts[key][0])[elts[key][1]] = json[language][key];
    });
    Cookies.set("language", language, {expires: 365, path: "/"});
}

/* Fill select */
function fillSelect(data) {
    var select = document.querySelector("#" + data[0]);
    data[1].forEach(function (elt) {
        var option = document.createElement("option");
        option.value = elt.toLowerCase();
        option.textContent = elt;
        select.appendChild(option);
    });
    /* Select current value */
    var name = data[0].substr(0, data[0].length - 1);
    select.value = window[name];
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

/* Handle languages */
function initLanguages(json) {
    languages = [];
    Object.keys(json).forEach(function (key) {
        languages.push(key);
    });

    fillSelect(["languages", languages]);
    changeLanguage(json);
}

/* INIT WEBPAGE */
loadJSON("links.min.json", createLinks);
loadJSON("distribs.min.json", initDistribs);
loadJSON("engines.min.json", initEngines);
loadJSON("translations.min.json", initLanguages);

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
    loadJSON("links.min.json", createLinks);
};
