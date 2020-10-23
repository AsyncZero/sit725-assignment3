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


        // window.location.href = "./playerList.html?Name=" + Name;
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
            $('#leave1').hide();
        }
        if ($('#loginUser2').text() == "") {
            $('#leave2').hide();
        }
        if ($('#loginUser3').text() == "") {
            $('#leave3').hide();
        }
        if ($('#loginUser4').text() == "") {
            $('#leave4').hide();
        }
    })
});








// window.onload = function() {
//     var url = window.location.href.split('=');
//     var name = url[1];
//     var names = url[1];
//     $('#loginUser').html(name);
//     $('#firstPlayer').html(name);
// }

let NameList = null;

const Play = () => {
    firstName = $('#loginUser').text();
    if (firstName != "") {
        //     if ($('#loginUser').text() != "" && $('#loginUser2').text() != "") {
        window.location.href = "./GameHome.html";
        //         $(document).ready(function() {
        //             document.getElementsByClassName('Box1').style.display = 'none';
        //             // $('.Box1').hide();
        //             $('.Box2').hide();
        //             $('.Box3').hide();
        //             $('.Box4').hide();
        //         });
        //     } else if ($('#loginUser1').text() != "" && $('#loginUser2').text() != "" && $('#loginUser3').text() != "") {
        //         window.location.href = "./GameHome.html";
        //         $('.Box1').hide();
        //         $('.Box2').hide();
        //         $('.Box3').hide();
        //         $('.Box4').hide();
        //     } else if ($('#loginUser1').text() != "" && $('#loginUser2').text() != "" && $('#loginUser3').text() != "" && $('#loginUser4').text() != "") {
        //         window.location.href = "./GameHome.html";
        //         $('.Box1').hide();
        //         $('.Box2').hide();
        //         $('.Box3').hide();
        //         $('.Box4').hide();
        //     }

    } else {
        window.location.href = "./AddingPlayer.html";
    }

}
$(document).ready(function() {
    // console.log('All assets are loaded')
    $('.Box1').show();
    $('.Box2').show();
    $('.Box3').show();
    $('.Box4').show();
});
const leave = () => {
    localStorage.clear();
    window.location.href = "./HomePage.html";
}