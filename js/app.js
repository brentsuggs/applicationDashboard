//"use strict"; 


/*** VARIABLES ***/
var members = ['Brad Frost', 'Caleb Ogden', 'Ashely Ford', 'Jad Limcaco', 'Brent Suggs', 'Chris Prine'];

var storage = localStorage;


//HTML ELEMENTS
var $alerts = $('.alert');
var $notificationsBtn = $('.notifications-icon');
var $notificationList = $('.notification-list');
var $notificationAlert = $('.notification-alert');
var $memberSuggestions = $('#memberSuggestions');
var $memberSearchInpt = $('#memberSearchInpt');
var $emailNotificaionChk = $('#emailNotificaionChk'); 
var $publicProfileChk = $('#publicProfileChk');
var $timezoneSelect = $('#timezoneSelect');
var $saveSettingsBtn = $('#saveSettingsBtn');
var $cancelSettingsBtn = $('#cancelSettingsBtn');

 //chart specific
var $traffic = $('#traffic');
var $dailyTraffic = $('#dailyTraffic');
var $mobileUsers = $('#mobileUsers');
var $hourlyBtn = $('#hourly');
var $dailyBtn = $('#daily');
var $weeklyBtn = $('#weekly');
var $monthlyBtn = $('#monthly');


/*********************** 
CHARTS  
************************/ 

/***  CHART GLOBAL CONFIG  ***/
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRation = true; 
Chart.defaults.global.title.display = false; 
Chart.defaults.global.legend.display = true;
Chart.defaults.global.elements.line.tension = 0; 
Chart.defaults.global.elements.line.capBezierPoints = true; 
Chart.defaults.global.elements.line.borderWidth = 1;
Chart.defaults.global.elements.point.borderWidth = 1; 
Chart.defaults.global.elements.point.hoverRadius = 5;
Chart.defaults.global.elements.point.backgroundColor = "#fff"; 
Chart.defaults.global.elements.point.radius = 6; 
Chart.defaults.global.elements.point.hitRadius = 0; 
Chart.defaults.global.elements.point.borderWidth = 2; 
Chart.defaults.global.elements.point.backgroundColor


/*** TRAFFIC CHART ***/ 

// Traffic Chart Options
var trafficOptions = {
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                tickMarkLength: 0,
                offsetGridLines: true
            },
            ticks: {
                padding: 15,
            }
        }],
        yAxes: [{
            gridLines: {
                tickMarkLength: 0,
            },
            ticks: {
                beginAtZero: false,
                padding: 15
//                stepSize: 500
            }
        }]
    }
};

// Traffic Data variables 
var hourlyData= ["10", "15", "7", "22", "30", "25", "37", "28", "33", "17", "24", "40", "30", "25", "37", "28", "10", "15", "7", "22", "7", "22", "30", "25", "45"];
var hourlyLabels= ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"] ;

var dailyData = ["190", "110", "130", "85", "107", "176", "220", "275"]; 
var dailyLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] ; 

var weeklyLabels = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
var weeklyData = [ 625,750, 1250, 1000, 1400, 1800, 1350, 1725, 1275, 1750, 2250, 1750];

var monthlyLabels = ["June", "July", "August", "September"]; 
var monthlyData = [ 3625,6275, 7025, 6998, 7750]; 

// Weekly Traffic Data 
var trafficData = {
    labels: weeklyLabels,
    datasets: [
        {
            backgroundColor: "rgba(116,119,191,0.2)",
            borderColor: "rgb(116,119,191)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBackgroundColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(116,119,191)",
            pointHoverBorderColor: "rgb(116,119,191)",
            pointHoverBorderWidth: 4,
            data: weeklyData,
            spanGaps: true,
        }
    ]
};
// Initiate Chart with Weekly data 
var trafficChart = new Chart($traffic, {
    type: 'line', 
    data: trafficData,
    options: trafficOptions
});

function updateTrafficRpt(btn) {
    var set = btn.dataset.set; 
    trafficChart.data.datasets[0].data = window[set+'Data']; 
    trafficChart.data.labels = window[set+'Labels']; ; 
    trafficChart.update();
    
    $('.traffic-widget-nav button.active').removeClass('active'); 
    window['$'+set+'Btn'].addClass('active'); 
}


/*** DAILY-TRAFFIC CHART ***/ 

// Traffic Chart Options
var dailyTrafficOptions = {
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                tickMarkLength: 0,
                offsetGridLines: true
            },
            ticks: {
                padding: 15,
            }
        }],
        yAxes: [{
            gridLines: {
                tickMarkLength: 0,
            },
            ticks: {
                beginAtZero: false,
                padding: 15

            }
        }]
    }
};

var dailyTrafficData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
        {
            label: 'rgb(116,119,191)',
            backgroundColor: 'rgb(116,119,191)',
            borderColor: 'rgb(116,119,191)',
            hoverBackgroundColor: 'rgb(77,76,114)',
            borderWidth: 1,
            data: [75, 125, 175, 125, 225, 200, 135],
        },
        {
            backgroundColor: 'rgb(129,201,143)',
            borderColor: 'rgb(129,201,143)',
            hoverBackgroundColor: 'rgb(115,190,143)',
            borderWidth: 1,
            data: [80, 98, 130, 160, 200, 216, 80],
        }
    ]
};

//Create Chart 
var dailyTrafficChart = new Chart($dailyTraffic, {
    type: 'bar',
    data: dailyTrafficData,
    options: dailyTrafficOptions
});

/*** MOBILE USERS CHART ***/ 

var mobileUsersData = {
     labels: [
            "Phones",
            "Tablets",
            "Desktops",
            "Laptops"
        ],
    datasets: [
        {
            data: [300, 50, 75, 35],
            backgroundColor: [
                "rgb(116,119,191)",
                "rgb(129,201,143)",
                "rgb(116,177,191)",
                "rgb(77,76,114)"
            ],
            hoverBackgroundColor: [
                "rgb(116,119,191)",
                "rgb(129,201,143)",
                "rgb(116,177,191)",
                "rgb(77,76,114)"
            ]
        }]
    };

// Create chart
var mobileUsersChart = new Chart($mobileUsers, {
    type: 'doughnut',
    data: mobileUsersData,
    options: {
        legend: {
            position: 'right',
            labels: {
                padding: 25,
                fontSize: 16
            }
        }
    }
});


/*********************** 
Other UI interactions 
************************/ 

function closeAlert(a) {
    a.style.display = 'none';
}
//search array of members for a match
function searchForMatch(input) {
    var results, string, option;
    results = [];
    string = input.toLowerCase();

    for (var i = 0; i<members.length; i++){
        option = members[i].toLowerCase();
        if(option.indexOf(string) != -1) {
            results.push(members[i]);
        }
    }
    console.log(results.length);
    return results;
}

//take selected member name and populate it into member name imput value
function selectMember(element) {
    var member = element.innerHTML;
    $memberSearchInpt.val(member);
    $memberSuggestions.css('display', 'none');
}

//populate list of members on the ui 
function populateMemberSuggestions(list) {
    if(list.length > 0) {
        for(var i = 0; i < list.length; i++) {
            $memberSuggestions.append('<p class="matched-name">' + list[i] +'</p>');
        }
        //bind click events to populated name elements
        var $matchedNames = $('.matched-name');
        $matchedNames.on('click', function(e) {
            selectMember(this);
         });
        //display the suggestions
        $memberSuggestions.css('display', 'block');
    }
}

//save member settings to local storage
function saveSettings() {
    storage.setItem('emailNote', $emailNotificaionChk[0].checked);
    storage.setItem('pubProfile', $publicProfileChk[0].checked); 
    storage.setItem('timezone', $timezoneSelect.val() );
}

//update settings from local storage; 
function updateSettings() {
    var emailValue = (storage.getItem('emailNote').toLowerCase() === "true");
    var profileValue = (storage.getItem('pubProfile').toLowerCase() === "true");
    var timezone = storage.getItem('timezone'); 
    
    $emailNotificaionChk[0].checked = emailValue;
    $publicProfileChk[0].checked = profileValue;
    $timezoneSelect.val(timezone); 
}


//clear current settings on ui 
function clearSettings() {
    $emailNotificaionChk[0].checked = false; 
    $publicProfileChk[0].checked = false; 
    $timezoneSelect.val('Select a timezone');
    saveSettings();
}


/*** BIND EVENTS ON WINDOW LOAD ***/

$(window).on ('load', function() {

    $hourlyBtn[0].addEventListener('click', function(e) { 
        updateTrafficRpt(e.currentTarget);
    });

    $dailyBtn[0].addEventListener('click', function(e) { 
        updateTrafficRpt(e.currentTarget);
    });   
    $weeklyBtn[0].addEventListener('click', function(e) { 
        updateTrafficRpt(e.currentTarget);
    });
    $monthlyBtn[0].addEventListener('click', function(e) { 
        updateTrafficRpt(e.currentTarget);
    });

    $alerts.on('click', function(e) {
        closeAlert(this);
    });
    
    $notificationsBtn.on('click', function(e) {
        $notificationList.toggleClass('hidden'); 
        $notificationAlert.css('display', 'none');
   });

    $memberSearchInpt.on('keyup', function(e) {
        var input = $memberSearchInpt.val();

        $memberSuggestions.empty();
        $memberSuggestions.css('display', 'none');

        if(input != "") {
            populateMemberSuggestions(searchForMatch(input));
        }

    })
    
    $saveSettingsBtn.on('click', saveSettings );
    
    $cancelSettingsBtn.on('click', clearSettings );
    
    //load settings if exit in local storage 
    if(storage.getItem('emailNote')) {
        updateSettings(); 
    }
}); 
