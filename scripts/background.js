'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

var lastId;
socket.on('refresh', function (data) {
  console.log(data);
});

socket.on('new other item', function (data) {
  console.log(data);
  console.log('other' + JSON.stringify(extOptions));
  if(data.toast && extOptions.toast){
    var options = {
      type: "basic",
      title: "New Message",
      message: data.message,
      iconUrl: "/images/icon__c.png"
    }
    lastId = null;
    chrome.notifications.create(null, options, null);
  }
});

socket.on('new rtc item', function (data) {
  console.log(data);
  if(data.openTab && extOptions.openTab){
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

  if(data.toast && extOptions.toast){
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

var extOptions;
chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.storage.sync.get({
    user: '',
    toast: true,
    openTab: true
  }, function(opts) {
    console.log("options: " + JSON.stringify(opts));
    extOptions = opts;
  });
});
