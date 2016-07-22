'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

socket.on('refresh', function (data) {
  console.log(data);
  var feed = document.getElementById('feed');
  feed.innerHTML = '';
  for(var i=0; i < data.length; i++){
    console.log(data[i]);
    if(data[i].type == 'RTC'){
      var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data[i].card;
      feed.innerHTML += '<a href=' + url + ' target="_blank">' + data[i].card + '</a><hr/>'
    }
  }
});
socket.on('new rtc item', function (data) {
  console.log(data);
});
