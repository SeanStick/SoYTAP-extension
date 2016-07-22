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
  if(data.toast){
    window.open(url);
  }
  var options = {
    type: "basic",
    title: "New RTC Notification",
    message: data.card,
    iconUrl: "/images/icon__c.png"
  }
  lastId = data.card;
  chrome.notifications.create(data.card, options, null);
});

chrome.notifications.onClicked.addListener(function (id){
  if(lastId == id){
    var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + id
    window.open(url);
  }
});
