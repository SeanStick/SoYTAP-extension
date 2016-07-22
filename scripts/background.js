'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

socket.on('refresh', function (data) {
  console.log(data);
});
socket.on('new item', function (data) {
  console.log(data);
  var options = {
    type: "basic",
    title: "New Notification",
    message: JSON.stringify(data),
    iconUrl: "/images/icon__c.png"
  }
  chrome.notifications.onClicked.addListener(function (id){
    window.open("http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + id);
  });
  chrome.notifications.create(data.card, options, null);
});
