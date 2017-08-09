
pathprefix = 'https://cdn.rawgit.com/jklmnn/unilinks/';
//pathprefix = 'https://rawgit.com/jklmnn/unilinks/';
filepath = "/"

function cookId(id){
  var d = new Date();
  d.setTime(d.getTime() + 2592000000);
  document.cookie = "id=" + id + "; expires=" + d.toUTCString();
}

function getCookId(){
  var items = document.cookie.split(';');
  for(var i = 0; i < items.length; i++){
    var cookie = items[i].split('=');
    if(cookie[0] == 'id'){
      return cookie[1];
    }
  }
  return false;
}

function showErrorPanel(msg){
  var panel = document.createElement('div');
  panel.className = 'panel panel-danger';
  var header = document.createElement('div');
  header.className = 'panel-heading';
  var h3 = document.createElement('h3');
  h3.className = 'panel-title';
  h3.appendChild(document.createTextNode('Es ist ein Fehler aufgetreten!'));
  header.appendChild(h3);
  panel.appendChild(header);
  var body = document.createElement('div');
  body.className = 'panel-body';
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(msg));
  body.appendChild(p);
  panel.appendChild(body);
  container.appendChild(panel);
}

function getFile(filepath){
  var request = new XMLHttpRequest();
  request.open('GET', filepath, false);
  try{
    request.send();
  }catch(err){
    showErrorPanel('Daten konnten nicht geladen werden.');
    return false;
  }
  return request.responseText;
}

function createPanel(obj){
  var panel = document.createElement('div');
  panel.className = 'panel panel-default panel-dyn';
  var header = document.createElement('div');
  header.className = 'panel-heading';
  var h3 = document.createElement('h3');
  h3.className = 'panel-title';
  h3.appendChild(document.createTextNode(obj.title));
  header.appendChild(h3);
  panel.appendChild(header);
  var body = document.createElement('div');
  body.className = 'panel-body';
  var listgroup = document.createElement('div');
  listgroup.className = 'list-group';
  for(var i = 0; i < obj.entries.length; i++){
    var a = document.createElement('a');
    a.className = 'list-group-item';
    a.setAttribute('target', 'blank');
    a.setAttribute('href', obj.entries[i].url);
    a.appendChild(document.createTextNode(obj.entries[i].name));
    listgroup.appendChild(a);
  }
  body.appendChild(listgroup);
  panel.appendChild(body);
  return panel;
}

function createTabs(list){
  var ul = document.createElement('ul');
  ul.className = 'nav nav-tabs subnav';
  ul.setAttribute('role', 'tablist');
  for(var i = 0; i < list.length; i++){
    var li = document.createElement('li');
    li.setAttribute('id', list[i].id);
    li.setAttribute('role', 'presentation');
    li.className = 'subnav-item';
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('onclick', 'loadRefresh(\'' + list[i].id + '\'); return false;');
    a.appendChild(document.createTextNode(list[i].title));
    li.appendChild(a);
    ul.appendChild(li);
  }
  var gli = document.createElement('li');
  li.setAttribute('role', 'presentation');
  li.className = 'subnav-item';
  var gimg = document.createElement('img');
  gimg.setAttribute('src', './media/GitHub-Mark-32px.png');
  gimg.setAttribute('alt', 'Unilinks auf GitHub');
  var ga = document.createElement('a');
  ga.setAttribute('href', 'https://github.com/jklmnn/unilinks');
  ga.setAttribute('id', 'GH');
  ga.appendChild(gimg);
  gli.appendChild(ga);
  ul.appendChild(gli);
  return ul;
}

function loadRefresh(id){
  var panels = document.getElementsByClassName('panel panel-default panel-dyn');
  var len = panels.length;
  for(var i = 0; i < len; i++){
    panels[0].parentNode.removeChild(panels[0]);
  }
  var tabs = document.getElementsByClassName('subnav-item active');
  for(var i = 0; i < tabs.length; i++){
    tabs[i].className = "subnav-item";
  }
  var active = document.getElementById(id);
  active.className = "subnav-item active";
  var data = JSON.parse(getFile(pathprefix + tag + filepath + id + '.json'));
  for(var i = 0; i < data.length; i++){
    container.appendChild(createPanel(data[i]));
  }
  cookId(id);
  location.hash = id;
}

function getTag(){
  var data = getFile('https://api.github.com/repos/jklmnn/unilinks/tags');
  return JSON.parse(data)[0]["name"];
}

window.onload = function WindowLoad(event){
  tag = getTag();
  filepath = "/data/"
  container = document.getElementById('container');
  var json = getFile(pathprefix + tag + filepath + 'index.json');
  if(json != false){
    index = JSON.parse(json);
    container.appendChild(createTabs(index));
    id = location.hash.replace('#', '');
    if(id == ''){
      var id = getCookId();
      if(id != false){
        loadRefresh(id);
      }
    }else{
      loadRefresh(id);
    }
  }
}
    
      
