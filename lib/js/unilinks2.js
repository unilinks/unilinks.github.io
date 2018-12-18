const github_raw_url = 'https://cdn.jsdelivr.net/gh/unilinks/data@';
const github_tag_url = 'https://api.github.com/repos/unilinks/data/tags';

let studiengaenge = [];
let tag, links_div, section_links;

function loadRefresh(id) {
    $('#infocontainer').hide();
    $('footer').removeClass("d-none");
    const links = [];
    if (id === "")
        return;

    if (typeof studiengaenge[id] === "undefined") {
        console.log("Studiengang mit der ID " + id + " konnte nicht geladen werden");
        return;
    }
    links_div.html('<div class="ui loading segment"></div>');
    let jxhr = studiengaenge[id].map(function (file, i) {
        return $.getJSON(github_raw_url + tag + "/data/" + file, function (data) {
            links[i] = data;
        });
    });
    $.when.apply($, jxhr).done(function () {
        printLinkList(links);
    });
}

function printLinkList(file_contents) {
    let i = 0;
    links_div.hide().html("");
    section_links.hide().html("");
    $.each(file_contents, function (id, sections) {
        $.each(sections, function (id, section) {
            let section_div = $('<div class="card my-3"><h2 class="card-header h4" id="sec-' + i + '">' + section.title + '</h2></div>').appendTo(links_div);
            let section_listgoup = $('<div class="list-group bmd-list-group-sm"></div>').appendTo(section_div);

            $.each(section["entries"], function (id, entry) {
                let item_div = '  <a class="list-group-item" href="' + entry.url + '" target="_blank"><div class="bmd-list-group-col">';
                item_div += '<p class="list-group-item-heading h6">' + entry.name + '</p>';
                if (typeof entry["modul-name"] !== "undefined" && entry["modul-name"] !== "")
                    item_div += '<p class="list-group-item-text">Modul: ' + entry["modul-name"] + '</p>';
                item_div += '</div>';
                if (typeof entry["modul-id"] !== "undefined" && entry["modul-id"] !== "" )
                    item_div += '<span class="label label-default label-pill pull-xs-right text-muted d-none d-md-block">' + entry["modul-id"] + '</span>';

                item_div += '</a>';
                $(item_div).appendTo(section_listgoup);
            });

            section_links.append('<a class="list-group-item list-group-item-action" href="#sec-' + (i++) + '">' + section.title + '</a>');
            $('body').scrollspy({target: '#section_links'})

        });
    });
    links_div.fadeIn();
    section_links.fadeIn();
}

function buildMenu(data) {
    let menu = $('#studiengaenge_dropdown');
    let link;
    $.each(data, function (index, data) {
        studiengaenge[data.id] = data.files;
        link = $('<a class="dropdown-item" id="link-' + data.id + '" href="#' + data.id + '">' + data.name + '</a>');
        link.click(function () {
            loadRefresh(data.id)
        }).appendTo(menu);
    });
    getHash();
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

function getHash() {
    if (typeof location.hash != "undefined") {
        let hash = location.hash.replace('#', '').toString();
        if (typeof studiengaenge[hash] !== "undefined")
            loadRefresh(hash);
    }
}

$(document).ready(function () {
    $('#infocontainer').fadeIn();
    links_div = $('#linkcontainer');
    section_links = $('#section_links');
    getLastTag();
});