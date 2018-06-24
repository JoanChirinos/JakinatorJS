var text = new XMLHttpRequest();
var splitText;
var state;
text.onload = function () {
    splitText = (text.responseText).split("\n");
    state = "no";
    for (var i = 0; i < splitText.length; i++) {
        var line = splitText[i].split(",");
        d[line[0]] = line[1];
    }
    var toAdd = (d[at]).substring(1);
    document.getElementById('questionArea').innerHTML = toAdd;
}
text.open("GET", "http://127.0.0.1:51526/qa.txt");
text.send();

var d = {};
var at = "0";

function yes() {
    console.log("yes");
    state = "yes";
    at += "1";
    updateQuestion();
}

function no() {
    console.log("no");
    state = "no";
    at += "0";
    updateQuestion();
}

function updateQuestion() {
    try {
        var toAdd = (d[at]).substring(1);
        document.getElementById('questionArea').innerHTML = toAdd;
    } catch (err) {
        acceptAddition();
    }
}

function acceptAddition() {
    if (state == "yes") {
        document.getElementById('interactionArea').innerHTML = '<div class="row"><div class="col"><big>Thanks for playing! To play again, reload the page :)</big></div></div>';
    } else {
        document.getElementById('interactionArea').innerHTML = '<div class="row"> <div class="col"><form action="submit.py" method="get"><div class="form-group"><label for="newCharacter">New Character</label><input type="text" class="form-control" id="newChar" placeholder="Character" name="newCharacter"></div><div class="form-group"><label for="newQuestion">Which question would have differentiated your new character from the suggested one?</label><input type="text" id="newQuestion" class="form-control" placeholder="Enter New Question" name="newQuestion"></div><button type="submit" class="btn btn-primary">Submit</button></form></div></div>';
    }
}
