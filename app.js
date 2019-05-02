// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8ySO69cWl9HKb65iW5rbl4YXdt7RfETI",
    authDomain: "click-counter-harcam-63f5b.firebaseapp.com",
    databaseURL: "https://click-counter-harcam-63f5b.firebaseio.com",
    projectId: "click-counter-harcam-63f5b",
    storageBucket: "click-counter-harcam-63f5b.appspot.com",
    messagingSenderId: "88731026324"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var destination;
var frequency;
var firstTrainTime;

$("#submit").on("click", function (e) {

    e.preventDefault();

    trainName = $("#trainName").val();
    destination = $("#destination").val();
    frequency = $("#frequency").val();
    firstTrainTime = $("firstTrainTime").val();

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv);

    // Change the HTML to reflect
    $("#name-display").text(sv.name);
    $("#email-display").text(sv.email);
    $("#age-display").text(sv.age);
    $("#comment-display").text(sv.comment);


    <tr>
        <td>Mark</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>Mark</td>
    </tr>

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});