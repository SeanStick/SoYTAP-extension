'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

socket.on('refresh', function (data) {
  console.log(data);
  var feed = document.getElementById('feed');
  feed.innerHTML = '';
  for(var i=0; i < data.length; i++){
    console.log(data[i]);
    switch(data[i].type){
      case 'RTC':
        if(Array.isArray(data[i].card)){
          for(var j=0; j < data[i].card.length; j++){
            var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data[i].card[j];
            feed.innerHTML += '<a href=' + url + ' target="_blank">' + data[i].card[j] + '</a><hr/>'
          }
        } else {
          var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data[i].card;
          feed.innerHTML += '<a href=' + url + ' target="_blank">' + data[i].card + '</a><hr/>'
        }
        break;
      case 'Other':
        feed.innerHTML += data[i].message + '<hr/>';
        break;
      default:
        alert(data[i].type + ' is not set up yet!');
    }
  }
});
socket.on('new rtc item', function (data) {
  console.log(data);
});
document.getElementById('clear').addEventListener('click', function(){
  socket.emit('clear');
});
