'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

var lastId;
socket.on('refresh', function (data) {
  console.log(data);
});
socket.on('new rtc item', function (data) {
  console.log(data);

  if(data.openTab){
    if(Array.isArray(data.card)){
      for(var j=0; j < data.card.length; j++){
        var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data.card[j];
        window.open(url);
      }
    } else {
      var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data.card;
      window.open(url);
    }
  }

  if(data.toast){
    if(Array.isArray(data.card)){
      for(var j=0; j < data.card.length; j++){
        var options = {
          type: "basic",
          title: "New RTC Notification",
          message: data.card[j],
          iconUrl: "/images/icon__c.png"
        }
        lastId = data.card;
        var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data.card[j];
        chrome.notifications.create(data.card[j], options, null);
      }
    } else {
      lastId = data.card;
      var options = {
        type: "basic",
        title: "New RTC Notification",
        message: data.card,
        iconUrl: "/images/icon__c.png"
      }
      var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + data.card[j];
      chrome.notifications.create(data.card, options, null);
    }
  }
});

chrome.notifications.onClicked.addListener(function (id){
  if(lastId == id){
    var url = "http://rtc.nwie.net/jazz/web/projects/Dev%20Center#action=com.ibm.team.workitem.viewWorkItem&id=" + id
    window.open(url);
  }
});
