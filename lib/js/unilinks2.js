const github_raw_url = 'https://cdn.jsdelivr.net/gh/unilinks/data@';
const github_tag_url = 'https://api.github.com/repos/unilinks/data/tags';

var studiengaenge = [];
var tag;

function loadRefresh(id) {
    var links = [];
    if (id === "")
        return;

    if (typeof studiengaenge[id] === "undefined") {
        console.log("Studiengang mit der ID " + id + " konnte nicht geladen werden");
        return;
    }
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

    let links_div = $('#links').html("");
    links_div.hide();

    $.each(file_contents, function (id, sections) {
        $.each(sections, function (id, section) {
            $.each(section["entries"], function (id, entry) {
                links_div.append('<a href="' + entry.url + '" class="item" target="_blank">' + entry.name + '</a>');
            })
        });
    });
    links_div.show();
}

function buildMenu(data) {
    let menu = $('#studiengaenge');
    let link;
    $.each(data, function (index, data) {
        studiengaenge[data.id] = data.files;
        link = $('<a class="item" id="link-' + data.id + '">' + data.name + '</a>');
        link.click(function () {loadRefresh(data.id)});
        link.appendTo(menu);
    });
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
    $('.ui.dropdown').dropdown();
    getLastTag();
});