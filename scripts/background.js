'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

var lastId;
socket.on('refresh', function (data) {
  console.log(data);
});
socket.on('new rtc item', function (data) {
  console.log(data);
  var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data.card
  if(data.openTab){
    window.open(url);
  }
  if(data.toast){
    var options = {
      type: "basic",
      title: "New RTC Notification",
      message: data.card,
      iconUrl: "/images/icon__c.png"
    }
    chrome.notifications.create(data.card, options, null);
  }
  lastId = data.card;
});

chrome.notifications.onClicked.addListener(function (id){
  if(lastId == id){
    var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + id
    window.open(url);
  }
});
