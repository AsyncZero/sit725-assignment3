let userID;

//addingName method 
const AddName = () => {
    let Name = $('#PlayerName').val()
    localStorage.content = $('#PlayerName').val();
    //gettting the values
    var name = document.getElementById("PlayerName").value;
    //entering name validation present or not
    if (Name.length == '') {
        alert("Please add your name!");
        if (confirm('Please add your name!') == true) {
            document.getElementById('PlayerName').style.background = 'red'
            $("#PlayerName").focus();
        } else {
            document.getElementById('PlayerName').style.background = 'green'
            $("#PlayerName").focus();
        }
    }
    //check if only number enetered using regex
    else if (Name.match(/^\d+$/)) {
        alert("Please add a valid name!");
        Name.focus();
    } else {

        userID = name
        window.location.href = "./playerList.html";
    }
}

$(document).ready(function() {
    var url = window.location.href.replace('playerList.html', 'player?players=' + localStorage.content);
    $.get(url, function(req, res) {
        $('#loginUser').html(localStorage.content);
        // $('#loginUser2').html(localStorage.content);
        // $('#loginUser3').html(localStorage.content);
        // $('#loginUser4').html(localStorage.content);
        if ($('#loginUser').text() == "") {
            $('#firstBlock').hide();
        }
        if ($('#loginUser2').text() == "") {
            $('#secondBlock').hide();
        }
        if ($('#loginUser3').text() == "") {
            $('#thirdBlock').hide();
        }
        if ($('#loginUser4').text() == "") {
            $('#fourthBlock').hide();
        }
    })
});

let NameList = null;

const Play = () => {
    firstName = $('#loginUser').text();
    if (firstName != "") {

        window.location.href = "./GameHome.html";
    } else {
        window.location.href = "./AddingPlayer.html";
    }

}
$(document).ready(function() {
    $('#firstPlayer').html(localStorage.content);
    $('.Box1').show();
    $('.Box2').show();
    $('.Box3').show();
    $('.Box4').show();
});
const leave = () => {
    localStorage.clear();
    window.location.href = "./HomePage.html";
}