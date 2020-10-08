let userID = null;
//addingName method 
const AddName = () => {
    console.log("reaching here")
    let Name = $('#PlayerName').val()
        //entering name validation present or not
    if (Name.length == '') {
        alert("Adding player name is required");
        $("#PlayerName").focus();
    }
    //check if only number enetered using regex
    else if (Name.match(/^\d+$/)) {
        alert("Adding player name can not be only numbers");
        $("#PlayerName").focus();

        console.log(Name + " is a number.");

    } else {
        userID = Name
    }
}