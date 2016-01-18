(function() {
    var fen;
    if(typeof(Storage) !== "undefined") {
        fen = localStorage.getItem("fen");
    } else {
        alert("Sorry! No Web Storage support..");
    }
    var ground;
    var chess = new Chess();
    var onMove = function(orig, dest) {
    chess.move({from: orig, to: dest});
    ground.set({
    turnColor: chessToColor(chess),
    movable: {
        color: chessToColor(chess),
        dests: chessToDests(chess)
    }
    });
    // ground.toggleOrientation();
    console.log(ground.getFen());
    localStorage.setItem("fen", ground.getFen());
    };
    ground = Chessground(document.getElementById('chessBoard'), {
    orientation: "white",
    viewOnly: false,
    turnColor: 'white',
    animation: {
    duration: 500
    },
    movable: {
    free: false,
    color: chessToColor(chess),
    premove: true,
    dests: chessToDests(chess),
    events: {
        after: onMove
    }
    },
    drawable: {
    enabled: true
    }
    });
    if (fen)
    ground.set({fen: fen});
    //   window.cg6 = ground;
    //   ground.move("e2", "e4");
})();

function chessToDests(chess) {
    var dests = {};
    chess.SQUARES.forEach(function(s) {
        var ms = chess.moves({square: s, verbose: true});
        if (ms.length) dests[s] = ms.map(function(m) { return m.to; });
    });
    return dests;
}

function chessToColor(chess) {
    return (chess.turn() == "w") ? "white" : "black";
}

function loadFen() {
    console.log(document.getElementById('fenInput').value);
    localStorage.setItem("fen", document.getElementById('fenInput').value);
    location.reload();
}

function playMove() {
    var chess = new Chess();
    var orig = document.getElementById('moveOrig').value;
    var dest = document.getElementById('moveDest').value;
    chess.move({from: orig, to: dest});
}

function resetGame() {
    localStorage.removeItem("fen");
    location.reload();
}