"use strict";

var match = null;
var inMatchId = null;

function initializeMatch (receiveMove, matchEnded) {
  return new Promise((resolve) => {
    match = $.connection.matchHub;

    match.client.receiveMove = receiveMove;
    match.client.matchEnded = matchEnded;

    return resolve(match);
  });
}

function leaveMatch () {
  match.server.endMatch(inMatchId, clientId);
}
