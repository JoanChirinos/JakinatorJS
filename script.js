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
text.open("GET", "http://homer.stuy.edu/~jchirinos/Jakinator/qa.txt");
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
        document.getElementById('interactionArea').innerHTML = '<form action="submit.py" method="get"><div class="row"><div class="col"><div class="form-group"><label for="newCharacter">New Character</label><input required type="text" class="form-control" id="newChar" placeholder="Character" name="newCharacter"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="newQuestion">Which question would have differentiated your new character from the suggested one?</label><input required type="text" id="newQuestion" class="form-control" placeholder="Enter New Question" name="newQuestion"></div></div></div><div class="row"><div class="col"><div class="form-group text-center"><label for="yesOrNo" class="text-left">Which response to the above question would have led to your new character?</label><div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="btn btn-success"><input type="radio" name="yesOrNo" id="yesOrNo" value="yes"> Yes</label><label class="btn btn-danger"><input type="radio" name="yesOrNo" id="yesOrNo" value="no"> No</label></div></div></div></div><input type="text" value="' + at + '" name="placeAt" style="display: none;"><div class="sm-space"></div><div class="row"><div class="col text-center"><button type="submit" class="btn btn-primary">Submit</button></div></div></form>';
    }
}
