var ground;
var chess = new Chess();

(function() {
    var fen;
    var orientation;
    if(typeof(Storage) !== "undefined") {
        fen = localStorage.getItem("fen");
        orientation = localStorage.getItem("orientation");
    } else {
        alert("Sorry! No Web Storage support..");
    }

    var onMove = function(orig, dest) {
        chess.move({from: orig, to: dest});
        ground.set({
            turnColor: chessToColor(chess),
            movable: {
                color: chessToColor(chess),
                dests: chessToDests(chess)
            }
        });
        logMove(JSON.stringify({ "From": orig, "To": dest}));
    };

    if (!orientation)
        orientation = "white";

    ground = Chessground(document.getElementById('chessBoard'), {
        orientation: orientation,
        viewOnly: false,
        turnColor: 'white',
        animation: {
            duration: 500
        },
        movable: {
            free: true,
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

function logMove(move) {
    var fen = ground.getFen();
    console.log(fen);
    localStorage.setItem("fen", fen);
    setValue("currentFen", fen);
    setValue("lastMove", move);
    setValue("moveToPlay", "");
    document.getElementById("lastMove").select();
    try {
        var successful = document.execCommand('copy');
        //var msg = successful ? 'Successfully copied' : 'Unable to copy';
        //alert(msg + ' move to clipboard');
    } catch (err) {
        alert('Oops, unable to copy move to clipboard automatically! You will have to do it yourself');
    }
}

function LoadFen() {
    var fen = getValue("fenToLoad");
    console.log(fen);
    localStorage.setItem("fen", fen);
    location.reload();
}

function PlayMove() {
    var move = JSON.parse(getValue("moveToPlay"));
    ground.move(move.From, move.To);
    logMove(JSON.stringify(move));
}

function resetGame() {
    localStorage.removeItem("fen");
    location.reload();
}

function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}