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

var new_members_ref = firebase.database().ref('poll_url/');
new_members_ref.on('value', function(snapshot) {
    var poll_url = snapshot.val();
    document.getElementById("poll_url").innerHTML = poll_url;
    $("#poll_qr").attr("src", poll_url+".qr");
    
});


var poll_question = "Loading poll question...";
var poll_results = null;

// Poll Question
var number = firebase.database().ref('poll_question');
number.on('value', function(snapshot) {
    poll_question = snapshot.val();
    drawChartPoll();
});

// Poll Results
var number = firebase.database().ref('poll');
number.on('value', function(snapshot) {
    poll_results = snapshot.val();
    console.log(poll_results);
    drawChartPoll();
});

function drawChartPoll() {
    if (poll_results != null) {
        var results_array = [[poll_question, 'Votes']];
        
        for (var key in poll_results) {
            if (poll_results.hasOwnProperty(key)) {
                var name = poll_results[key].name;
                var votes = poll_results[key].votes;
                
                if(votes > 0)
                    results_array.push([name, votes]);
            }
        }

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
