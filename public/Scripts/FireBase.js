// This is my first time ever writing Javascript or HTML from scratch.
// Sorry if it's hard to read.

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQCEhRC7wf8iCyEW1puwteuWMP5EP7U14",
    authDomain: "acm-attendance.firebaseapp.com",
    databaseURL: "https://acm-attendance.firebaseio.com",
    storageBucket: "acm-attendance.appspot.com",
};
firebase.initializeApp(config);


var signed_in_ref = firebase.database().ref('signed_in_count/');
signed_in_ref.on('value', function(snapshot) {
    var signed_in_value = snapshot.val();
    document.getElementById("signed_in").innerHTML = "How many people signed into this meeting: " + signed_in_value;
});


var new_members_ref = firebase.database().ref('new_members_count/');
new_members_ref.on('value', function(snapshot) {
    var first_value = snapshot.val();
    document.getElementById("first_meeting").innerHTML = "Number of new members: " + first_value;
});


var poll_question = "Loading poll question...";
var assembly_count = 0;
var brainfuck_count = 0;
var malbolge_count = 0;
var java_count = 0;

// Poll Question
var number = firebase.database().ref('poll_question');
number.on('value', function(snapshot) {
    poll_question = snapshot.val();
    drawChartPoll();
});

// Assembly
var number = firebase.database().ref('poll/assembly_count');
number.on('value', function(snapshot) {
    assembly_count = snapshot.val();
    drawChartPoll();
});

// Brainfuck
var number = firebase.database().ref('poll/brainfuck_count');
number.on('value', function(snapshot) {
    brainfuck_count = snapshot.val();
    drawChartPoll();
});

// Malbolge
var number = firebase.database().ref('poll/malbolge_count');
number.on('value', function(snapshot) {
    malbolge_count = snapshot.val();
    drawChartPoll();
});

// Java
var number = firebase.database().ref('poll/java_count');
number.on('value', function(snapshot) {
    java_count = snapshot.val();
    drawChartPoll();
});

function drawChartPoll() {
    if (assembly_count > 0 || brainfuck_count > 0 || malbolge_count > 0 || java_count > 0) {
        var results_array = [[poll_question, 'Votes']];

        if(assembly_count > 0)
            results_array.push(['Assembly', assembly_count]);
        if(brainfuck_count > 0)
            results_array.push(['Brainfuck', brainfuck_count]);
        if(malbolge_count > 0)
            results_array.push(["Malbolge", malbolge_count]);
        if(java_count > 0)
            results_array.push(["Java", java_count]);

        console.log(results_array);

        var data = google.visualization.arrayToDataTable(results_array);

        var options = {
          title: poll_question
        };

        document.getElementById("piechart").innerHTML = "";
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}


function drawChart() {
    console.log("In draw chart");

    if (vote_web > 0 || vote_android > 0 || vote_game > 0 || vote_cpc > 0 || vote_ai > 0 || vote_acmw > 0) {
        var results_array = [['What is the best committee?', 'Votes']];

        if(vote_web > 0)
            results_array.push(['Web Dev', vote_web]);
        if(vote_android > 0)
            results_array.push(['Android', vote_android]);
        if(vote_game > 0)
            results_array.push(['Animation/Game Design', vote_game]);
        if(vote_cpc > 0)
            results_array.push(['CPC', vote_cpc]);
        if(vote_ai > 0)
            results_array.push(['AI', vote_ai]);
        if(vote_acmw > 0)
            results_array.push(['ACM-W', vote_acmw]);

        console.log(results_array);

        var data = google.visualization.arrayToDataTable(results_array);

        var options = {
          title: 'What is the best committee?'
        };

        document.getElementById("piechart").innerHTML = "";
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}

//google.visualization.events.addListener(chart, 'ready', function() {
//    console.log("In listener");
//    drawChart();
//});

$(window).load(function() {
    drawChartPoll();
});
