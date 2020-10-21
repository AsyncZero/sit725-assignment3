<<<<<<< HEAD
let userID = null;
//addingName method
const AddName = () => {
  console.log("reaching here");
  let Name = $("#PlayerName").val();
  //entering name validation present or not
  if (Name.length == "") {
    alert("Adding player name is required");
    $("#PlayerName").focus();
  }
  //check if only number enetered using regex
  else if (Name.match(/^\d+$/)) {
    alert("Adding player name can not be only numbers");
    $("#PlayerName").focus();

    console.log(Name + " is a number.");
  } else {
    userID = Name;
  }
};
=======
let userID = null;
//addingName method 
const AddName = () => {
    let Name = $('#PlayerName').val()
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

        userID = Name
        window.location.href = "./playerList.html?Name=" + Name;

    }
}

window.onload = function() {
    var url = window.location.href.split('=');
    var name = url[1];
    var names = url[1];
    $('#loginUser').html(name);
    $('#firstPlayer').html(name);
}



const Play = () => {

    let firstName = $('#loginUser').text();
    if (firstName != "") {
        window.location.href = "./GameHome.html";
        // $('#firstPlayer').html('name');

    } else {
        window.location.href = "./AddingPlayer.html";
    }

}
>>>>>>> master
