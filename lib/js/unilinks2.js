const github_raw_url = 'https://cdn.jsdelivr.net/gh/unilinks/data@';
const github_tag_url = 'https://api.github.com/repos/unilinks/data/tags';

let studiengaenge = [];
let tag, links_div;

function loadRefresh(id) {
    const links = [];
    if (id === "")
        return;

    if (typeof studiengaenge[id] === "undefined") {
        console.log("Studiengang mit der ID " + id + " konnte nicht geladen werden");
        return;
    }
    links_div.html('<div class="ui loading segment"></div>');
    let jxhr = studiengaenge[id].map(function (file) {
        return $.getJSON(github_raw_url + tag + "/data/" + file, function (data) {
            links.push(data);
        });
    });
    $.when.apply($, jxhr).done(function () {
        printLinkList(links);
    });
}

function printLinkList(file_contents) {
    links_div.hide().html("");
    $.each(file_contents, function (id, sections) {
        $.each(sections, function (id, section) {
            let section_div = $('<div class="ui segment"><h2>' + section.title + '</h2></div>').appendTo(links_div);
            $.each(section["entries"], function (id, entry) {
                let item_div = '<div class="item">';
                item_div += '<a href="' + entry.url + '" class="header" target="_blank">' + entry.name + '</a>';
                if (typeof entry["modul-id"] !== "undefined")
                    item_div += '<div class="description">' + entry["modul-id"] + '</div></div>';
                if (id !== section["entries"].length - 1)
                    item_div += '<div class="ui divider"></div>';
                $(item_div).appendTo(section_div);
            })
        });
    });
    links_div.fadeIn();
}

function buildMenu(data) {
    let menu = $('#studiengaenge');
    let link;
    $.each(data, function (index, data) {
        studiengaenge[data.id] = data.files;
        link = $('<a class="item" id="link-' + data.id + '">' + data.name + '</a>');
        link.click(function () {
            loadRefresh(data.id)
        });
        link.appendTo(menu);
    });
    $('.ui.dropdown').removeClass("loading")
}

function loadCourses(tag) {
    let url = github_raw_url + tag + '/data/index.json';
    $.getJSON(url).done(function (data) {
        buildMenu(data)
    });
}

function getLastTag() {
    $.getJSON(github_tag_url).done(function (data) {
        tag = data[0]['name'];
        loadCourses(tag);
    });
}

$(document).ready(function () {
    links_div = $('#links').html('<div class="ui placeholder segment"><div class="ui icon header">Bitte den Studiengang aus der Liste auswählen. </div></div>');
    $('.ui.dropdown').dropdown().addClass("loading");
    getLastTag();
});