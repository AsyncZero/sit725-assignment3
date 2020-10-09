let userID = null;
//addingName method 
const AddName = () => {
    let Name = $('#PlayerName').val()
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
        window.location.href = "./playerList.html";

        // document.getElementById('loginUser').html('hi sam!')
    }

}



const Play = () => {

    let firstName = $('#firstName').text();
    if (firstName != "") {
        window.location.href = "./GameHome.html";

    } else {
        window.location.href = "./AddingPlayer.html";
    }
}