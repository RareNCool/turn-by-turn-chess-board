"use strict";

var queue = null;

function initializeQueue (joined, left) {
  return new Promise((resolve) => {
    queue = $.connection.queueHub;
    
    queue.client.playerJoinedQueue = joined;
    queue.client.playerLeftQueue = left;
    queue.client.foundMatch = function (players) {
      var p = "";

      for (var i = 0; i < players.length; i++) {
        let player = players[i];
        p += ("\r" + player.username);
      }

      alert("Found a match!" + p);
    };
    queue.client.beginMatch = function (matchId) {
      inMatchId = matchId;
    };
    resolve(queue);
  });
}

function joinQueue () {
  return new Promise((resolve) => {
    var player = {
        Username: username,
        Id: $.connection.hub.id,
        SkillLevel: 0
    };
    queue.server.addPlayer(player);
  });
}
