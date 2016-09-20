
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
  
  
  var spaces_count = 0;
  var tabs_count = 0;
  var what_count = 0;
  
  // SPACES
  var number = firebase.database().ref('spaces_count/');
  number.on('value', function(snapshot) {
    yes_count = snapshot.val();
    drawChart();
  })
  
  // TABS
  var number = firebase.database().ref('tabs_count/');
  number.on('value', function(snapshot) {
    no_count = snapshot.val();
    drawChart();
  })
  
  // WHAT?
  var number = firebase.database().ref('what_count/');
  number.on('value', function(snapshot) {
    what_count = snapshot.val();
    drawChart();
  })
  
  
  
  var comment = firebase.database().ref('comment/');
  comment.on('value', function(snapshot) {
    var value = snapshot.val();
    
    console.log(value);
        
    //alert(num);
    document.getElementById("comment_text").innerHTML = value;
  })
  
  function drawChart() {
    console.log("In draw chart");
  
    if (yes_count > 0 || no_count > 0 || other_count > 0) {
        var results_array = [['Spaces or Tabs?', 'Votes']];
        
        if(yes_count > 0)
            results_array.push(['Spaces', yes_count]);
        if(no_count > 0)
            results_array.push(['Tabs', no_count]);
        if(what_count > 0)
            results_array.push(['I am a freshman and do not understand this question', what_count]);
            
        console.log(results_array);
            
        
        var data = google.visualization.arrayToDataTable(results_array);

        var options = {
          title: 'Spaces or Tabs?'
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
