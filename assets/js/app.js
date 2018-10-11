// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

firebase.initializeApp(config);

var database = firebase.database();

// Click and add a train.
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Get user input
    var trainName = $("#train-name-input").val().trim();
    var userDestination = $("#destination-input").val().trim();
    var userFirstTime = $("#first-time-input").val().trim();
    var userFrequency = $("#frequency-input").val().trim();

    // Hold user input data
    var newTrain = {
        name: trainName,
        destination: userDestination,
        time: userFirstTime,
        frequency: userFrequency
    };

    // Uploads newTrain to database
    database.ref().push(newTrain);

    alert("All Aboard!")

    // Clear text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});

// Firebase event for adding a new train and add a row to the table
database.ref().on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());

    // Store data in a variable
    var trainName = childSnapshot.val().name;
    var userDestination = childSnapshot.val().destination;
    var userFirstTime = childSnapshot.val().time;
    var userFrequency = childSnapshot.val().frequency;

    // Train info
    // console.log(trainName);
    // console.log(userDestination);
    // console.log(userFirstTime);
    // console.log(userFrequency);

    // Moment.js
    var userFirstTime = childSnapshot.val().userFirstTime;
    var frequency = childSnapshot.val().frequency;

    var userFirstTimeConverted = moment(userFirstTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(userFirstTimeConverted), "minutes");
    var timeRemainder = diffTime % frequency;
    
    //var minutesAway = frequency - timeRemainder;
    var minutesAway = frequency - 5;
    var nextTime = moment().add(minutesAway, "minutes");
    console.log("arrival time: " + moment(nextTime).format("hh:mm"));
    var nextTrainTime = moment(nextTime).format("hh:mm");


    // Create new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(userDestination),
        $("<td>").text(userFrequency),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minutesAway)
    );

    // Append new row to the table
    $("#train-table > tbody").append(newRow);
});