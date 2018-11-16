const github_raw_url = 'https://cdn.jsdelivr.net/gh/unilinks/data@';

var tag;
var studiengaenge = new Array();

function showErrorPanel(msg) {
    $('#container').prepend('<div class="alert alert-danger  alert-dismissible" role="alert">Fehler: ' + msg + '</div>');
}

function scrollTo(id) {
    document.getElementById(id).scrollIntoView({behavior: "smooth"});
}

function loadRefresh(id) {
    if (id === "")
        return;

    let links = $('#links').html("");
    if (links.length === 0)
        links = $('<div id="links"></div>').appendTo('#container');
    links.hide();
    let sections = $('#sections');
    sections.html('<div class="list-group d-sm-none d-none d-md-none d-lg-block position-fixed shadow"></div>');
    sections = $('#sections div');
    if (studiengaenge.indexOf(id) === -1)
        return false;
    $(studiengaenge[id]).each(function (json_file) {
        $.getJSON(github_raw_url + json_file + '.json').done(function (data) {
            $(data).each(function (id, item) {
                let panel = $("<div class='card my-3'><h2 class='card-header h4' id='sec-" + id + "'>" + item.title + "</h2></div>").appendTo(links);
                panel = $('<div class="list-group list-group-flush"></div>').appendTo(panel);
                sections.append('  <a class="list-group-item list-group-item-action p-x-3" href="javascript:scrollTo(\'sec-' + id + '\')">' + item.title + '</a>')
                $(item.entries).each(function (id, entry) {
                    panel.append('<a href="' + entry.url + '" class="list-group-item list-group-item-action">' + entry.name + '</a>')
                });
            });
        }).fail(function (jqxhr, textStatus, error) {
            showErrorPanel(error);
        });
    });
    links.fadeIn();

    $('#studiengaenge_dropdown .active').removeClass('active');
    $('#' + id).addClass('active');

}


function show_menu() {
    let url = github_raw_url + tag + '/data/index.json';
    let section = location.hash.replace('#', '');
    let section_exists = false;

    $.getJSON(url).done(function (data) {
        $(data).each(function (id, item) {
            studiengaenge[item.id] = item.files;
            $('#studiengaenge_dropdown').append('<a class="dropdown-item" id="' + item.id + '" href="#' + item.id + '" onclick="loadRefresh(\'' + item.id + '\')">' + item.name + '</a>');
            section_exists = section_exists || (item.id === section);
        });
        if (section_exists)
            loadRefresh(section);

    }).fail(function (jqxhr, textStatus, error) {
        showErrorPanel(error);
    });
}

$(document).ready(function () {
    $.getJSON("https://api.github.com/repos/unilinks/data/tags").done(function (data_json) {
        tag = data_json[0]["name"];
        show_menu();
    });
});
