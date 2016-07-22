'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "request"){
      buildObjectFieldValues();
    }
    if (request.type == "checkJquery"){
      if(window.jQuery){
        sendResponse({"jQuery":"true"});
      } else {
        sendResponse({"jQuery":"false"});
      }
    }
  }
);

function buildObjectFieldValues() {
  var object = [];
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  if(window.location.pathname.length < 16) return;

  var keyPrefix = window.location.pathname.substring(1,4);
  var sObjectId = window.location.pathname.substring(1,16);
  var sObjectName;
  var headers = {'Authorization': 'Bearer ' +  getCookie('sid')};
  var recordTypeId;
  jQuery.ajax({url: '/services/data/v31.0/sobjects',
    headers: headers,
    success: function(data) {
      console.log(data);
      for (var i = 0; i < data.sobjects.length; i++) {
        if(data.sobjects[i].keyPrefix == keyPrefix) {
          sObjectName = data.sobjects[i].name;
        }
      };
      jQuery.ajax({url: '/services/data/v31.0/sobjects/' + sObjectName +'/describe',
        headers:headers,
        success: function(data) {
          console.log(data);
          var fields = data.fields[0].name;
          var key = data.fields[0].name;
          object.push({
            api:data.fields[0].name,
            label:data.fields[0].label,
            value:"",
            type:data.fields[0].type
          });
          for(var i=1, end=data.fields.length;i<end;i++){
            object.push({
              api:data.fields[i].name,
              label:data.fields[i].label,
              value:"",
              type:data.fields[i].type
            });
            if(fields.length > 10000){
              getFieldsFromSalesforce(fields,false,sObjectName);
              fields=data.fields[i].name;
            } else {
              fields=fields+','+data.fields[i].name;
            }
          }
          getFieldsFromSalesforce(fields,true,sObjectName);
        }
      });
    }
  });

  function getFieldsFromSalesforce(fieldsToReturn,stopSpinner, objectName) {
    jQuery.ajax({url: '/services/data/v31.0/sobjects/' + sObjectName + '/' + sObjectId + '?fields=' + fieldsToReturn,
      headers: headers,
      success: function(data2) {
        console.log(data2);
        var keys = Object.keys(data2);
        for(var i=0,max=keys.length-1;i<max;i++){
          if(typeof data2[object[i].api] !== 'undefined' 
              && data2[object[i].api] !== null){
            object[i].value = data2[object[i].api];            
          }
        }
        console.log(fieldsToReturn);
        console.log(object);
        chrome.runtime.sendMessage({type:"response",stopSpinner:stopSpinner,fields:object,object:objectName});
      }
    });
  }
};
