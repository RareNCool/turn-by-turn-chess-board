"use strict";

var username = "";

function getUsername () {
  return new Promise((resolve) => {
    username = prompt("Enter a username", "");
    resolve(username);
  });
}
