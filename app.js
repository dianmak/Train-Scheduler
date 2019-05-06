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

console.log(moment().format("HH:mm"));

$("#submit").on("click", function (e) {

    e.preventDefault();

    trainName = $("#trainName").val();
    destination = $("#destination").val();
    frequency = $("#frequency").val();
    firstTrainTime = $("#firstTrainTime").val();

    console.log("first train time " + $("#firstTrainTime").val());

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

var puns = ["Did you hear about the boy who had to do a project on trains? He had to keep track of everything!",
    "Why should you never trust a train? They have loco motives.",
    "Went to a railway fancy dress party. Everyone was wearing platforms.",
    "A railroad engineer must be sure not to lose his train of thought or he might go down the wrong track.",
    "Ticket inspectors. You’ve got to hand it to them…",
    "Why don’t elephants like to ride on trains? Because they hate leaving their trunks in the baggage car.",
    "I’ve been meaning to make a list of bad railroad puns…but I keep getting side tracked.",
    "Why can’t the engineer be electrocuted? Because he’s not a conductor!",
    "Trains are a broad topic so I hope no-one gets tunnel vision when expressing their feelings.",
    "Don't get your signals crossed and no one will get steamed."]

$("#newPun").on("click", function () {
    var index = Math.floor((Math.random() * 10) + 1);
    var pun = puns[index];
    $("#pun").text(pun);
});

database.ref().on("child_added", function (snapshot) {

    var sv = snapshot.val();

    console.log("first train time " + sv.firstTrainTime);

    // First Time 
    var firstTimeConverted = moment(sv.firstTrainTime, "hh:mm").subtract(1, "days");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#scheduleBody").append(`
    <tr>
        <td>${sv.name}</td>
        <td>${sv.destination}</td>
        <td>${sv.frequency}</td>
        <td>${arrivalTime}</td>
        <td>${tMinutesTillTrain}</td>
    </tr>
    `)


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});