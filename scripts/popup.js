'use strict';

var socket = io.connect('http://soytap.azurewebsites.net/');
//var socket = io.connect('http://localhost:3000/');

socket.on('refresh', function (data) {
  console.log(data);
});
socket.on('new item', function (data) {
  console.log(data);
});
