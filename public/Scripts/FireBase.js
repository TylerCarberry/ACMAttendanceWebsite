// This is my first time ever writing Javascript or HTML from scratch.
// Sorry if it's hard to read.
// Why are you even reading this anyway?

// Initialize Firebase
var config = {
apiKey: "AIzaSyAQCEhRC7wf8iCyEW1puwteuWMP5EP7U14",
authDomain: "acm-attendance.firebaseapp.com",
databaseURL: "https://acm-attendance.firebaseio.com",
storageBucket: "acm-attendance.appspot.com",
};
firebase.initializeApp(config);

var number = firebase.database().ref('signed_in_count/');
number.on('value', function(snapshot) {
var signed_in_value = snapshot.val();

console.log(signed_in_value);

//alert(num);
document.getElementById("signed_in").innerHTML = "How many people signed into this meeting: " + signed_in_value;
})


var number = firebase.database().ref('new_members_count/');
number.on('value', function(snapshot) {
var first_value = snapshot.val();

console.log(first_value);

//alert(num);
document.getElementById("first_meeting").innerHTML = "Number of new members: " + first_value;
})


var vote_yes = 0;
var vote_no = 0;
var vote_what = 0;

// YES
var number = firebase.database().ref('yes_count');
number.on('value', function(snapshot) {
vote_yes = snapshot.val();
drawChartHarambre();
})

// NO
var number = firebase.database().ref('no_count');
number.on('value', function(snapshot) {
vote_no = snapshot.val();
drawChartHarambre();
})

// WHAT
var number = firebase.database().ref('what_count');
number.on('value', function(snapshot) {
vote_what = snapshot.val();
drawChartHarambre();
})



/*


var vote_game = 0;
var vote_android = 0;
var vote_web = 0;
var vote_acmw = 0;
var vote_ai = 0;
var vote_cpc = 0;

// GAME
var number = firebase.database().ref('vote/game');
number.on('value', function(snapshot) {
vote_game = snapshot.val();
drawChart();
})

// ANDROID
var number = firebase.database().ref('vote/android');
number.on('value', function(snapshot) {
vote_android = snapshot.val();
drawChart();
})

// WEB
var number = firebase.database().ref('vote/web');
number.on('value', function(snapshot) {
vote_web = snapshot.val();
drawChart();
})

// ACMW
var number = firebase.database().ref('vote/acmw');
number.on('value', function(snapshot) {
vote_acmw = snapshot.val();
drawChart();
})

// AI
var number = firebase.database().ref('vote/ai');
number.on('value', function(snapshot) {
vote_ai = snapshot.val();
drawChart();
})

// CPC
var number = firebase.database().ref('vote/cpc');
number.on('value', function(snapshot) {
vote_cpc = snapshot.val();
drawChart();
})
*/



var comment = firebase.database().ref('comment/');
comment.on('value', function(snapshot) {
var value = snapshot.val();

console.log(value);
    
//alert(num);
document.getElementById("comment_text").innerHTML = value;
})


function drawChartHarambre() {
console.log("In draw chart");

if (vote_yes > 0 || vote_no > 0 || vote_what > 0) {
    var results_array = [['Is Harambe still alive?', 'Votes']];
    
    if(vote_yes > 0)
        results_array.push(['Yes', vote_yes]);
    if(vote_no > 0)
        results_array.push(['No', vote_no]);
    if(vote_what > 0)
        results_array.push(["Who's Harambe?", vote_what]);
       
    console.log(results_array);
        
    
    var data = google.visualization.arrayToDataTable(results_array);

    var options = {
      title: 'Is Harambe still alive?'
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

google.visualization.events.addListener(chart, 'ready', function() {
        console.log("In listener")
        drawChart()
    });

$(window).load(function() {
drawChart()
});



console.log('END');
