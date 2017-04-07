"use strict";

var clientId = "";

function initializeConnection () {
  return new Promise((resolve) => {
    $.connection.hub.url = "http://tasteslikechess.azurewebsites.net:80/signalr"
    resolve($.connection.hub.url);
  });
}

function openConnection () {
  return new Promise((resolve) => {
    $.connection.hub.start().done(function () {
      clientId = $.connection.hub.id;
      resolve();
    });
  })
}
