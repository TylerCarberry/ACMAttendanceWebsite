window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1CKFtRiI4F_vvP5m90MlUpgwTN-6EV80PmytICB5cwko/pubhtml';

var theData = null;
var signed_in_count = 0;
var new_member_count = 0;
var poll_results = {};

function init() {
Tabletop.init( { key: public_spreadsheet_url,
                    callback: calculateResults,
                    simpleSheet: true } )
}

function calculateResults(data, tabletop) {
    theData = data;

    //alert("Successfully processed!")
    console.log(data);
    
    
    for (personCount in data) {
        person = data[personCount];
        
        timestamp = person["Timestamp"];
        if(timestamp != null && timestamp.length > 0)
            signed_in_count += 1;
            
        
        newMember = person["Is this your first meeting of the semester?"];
        if(newMember === "Yes")
            new_member_count += 1;
            
        poll_answer = person["Who is going to win the World Series?"]
        if(poll_answer in poll_results)
            poll_results[poll_answer] += 1
        else
            poll_results[poll_answer] = 1
        
    }
    
    displayResults()
}

function displayResults() {
    document.getElementById("first_meeting").innerHTML = "Number of new members: " + new_member_count;
    document.getElementById("signed_in").innerHTML = "How many people signed into this meeting: " + signed_in_count;
}