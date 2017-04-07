var ground;

(function() {
    var fen;
    var orientation;
    if(typeof(Storage) !== "undefined" && localStorage !== undefined) {
        fen = localStorage.getItem("fen");
        orientation = localStorage.getItem("orientation");
    } else {
        alert("Sorry! No local storage support... No changes will be saved and some functions will be broken!");
    }

    var onMove = function(orig, dest) {
        logMove(JSON.stringify({ "From": orig, "To": dest}));
        var move = `${orig},${dest}`;
        match.server.makeMove(inMatchId, clientId, move);
    };

    if (!orientation)
        orientation = "white";

    ground = Chessground(document.getElementById('chessBoard'), {
        orientation: orientation,
        viewOnly: false,
        turnColor: "white",
        animation: {
            duration: 500
        },
        movable: {
            free: true,
            color: "both",
            dropOff: "trash",    // when a piece is dropped outside the board. "revert" | "trash"
            events: {
                after: onMove
            }
        },
        drawable: {
            enabled: true
        },
        draggable: {
            enabled: true,        // allow moves & premoves to use drag'n drop
            distance: 3,          // minimum distance to initiate a drag, in pixels
            squareTarget: false,  // display big square target; intended for mobile
            centerPiece: true,    // center the piece on cursor at drag start
            showGhost: true,      // show ghost of piece being dragged
        }
    });
    if (fen)
         ground.set({fen: fen});
    showStatsEtc();
})();

function showStatsEtc() {
    var diff = ground.getMaterialDiff();
    setInnerHTML("blacksAdv", objToLines(diff.black));
    setInnerHTML("whitesAdv", objToLines(diff.white));
    var fen = ground.getFen();
    console.log(fen);
    setValue("currentFen", fen);
    localStorage.setItem("fen", fen);
}

function logMove(move) {
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
    showStatsEtc();
}

function LoadFen() {
    var fen = getValue("fenToLoad");
    console.log(fen);
    localStorage.setItem("fen", fen);
    location.reload();
}

function objToLines(object) {
    var val = JSON.stringify(object).split("\"").join("").split(",").join("<br/>").replace("{","").replace("}","");
    return val.length > 0 ? val : "None";
}

function PlayMove() {
    var move = JSON.parse(getValue("moveToPlay"));
    ground.move(move.From, move.To);
    logMove(JSON.stringify(move));
}

function ResetGame() {
    localStorage.removeItem("fen");
    location.reload();
}

function ToggleOrientation() {
    ground.toggleOrientation();
    var orientation = ground.getOrientation();
    localStorage.setItem("orientation", orientation);
    location.reload();
}

function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function setInnerHTML(id, value) {
    document.getElementById(id).innerHTML = value;
}