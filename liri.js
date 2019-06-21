require("dotenv").config();

var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


var userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says
// switchCase(userInput, inputParameter);

function switchCase() {
    switch (userInput) {
        case 'spotify-this-song':
            spotifyThisSong();
            break;

            case 'concert-this':
                showConcertInfo(userQuery);
                break;

            case 'do-what-it-says':
                    showSomeInfo();
                    break;
    }
};

// function userCommands(userInput, userQuery) {
//     switch (userInput) {
//         case "spotify-this":
//         spotifyThisSong();
//         break;
//     }
    
    // case "do-what-it-says":
    //     doThis();
    //     break;
// }


function showConcertInfo(userQuery) {
    var queryURL = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp";
    request(queryURL, function(error, response, body) {
        // console.log(queryURL);
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("--------------------EVENT INFO--------------------");
                
                console.log("Venue Name: " + concerts[i].venue.name);
                console.log("Venue Location: " + concerts[i].venue.city);
                console.log("Event Date: " + concerts[i].datetime);
            }
        } else {
            console.log("Error occurred.");
        
        }
    })
};
showConcertInfo();

// userCommand(userInput, userQuery);
var divider = "\n------------------------------------------------------------\n\n";
// var spotifyArray = [];

function spotifyThisSong() {
    console.log(`\n - - - - -\n\nSEARCHING FOR...`);
    console.log("--------------------SPOTIFY INFO--------------------");
    if (!userQuery) {
    userQuery = 'All the Small Things'
    };
    spotify.search({
    type: 'track',
    query: userQuery,
    limit: 1
    }, function (error, data) {
    if (error) {
        return console.log('Error occurred: ' + error);
        }
        var tracksArr = data.tracks.items;
    for (var i = 0; i < tracksArr.length; i++) {
        // var songData = data.tracks.items[i];
        // var showData = [
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Album: " + data.tracks.items[i].album.name);
        // data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify
        console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify);
        // ].join("\n\n");
        // console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
        // "\nAlbum Name: " + data.tracks.items[0].album.name + "\nExternal Link: " + data.tracks.items[0].external_urls.spotify + "\n");
        var logTracks = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
        "\nAlbum Name: " + data.tracks.items[0].album.name + "\nExternal Link: " + data.tracks.items[0].external_urls.spotify + "\n";
        // spotifyArray.push(showData);
        // fs.appendFile('random.txt', data.tracks.items[i].name);
        // fs.appendFile('random.txt', data.tracks.items[i].album.name);
        // fs.appendFile('random.txt', data.tracks.items[i].external_urls.spotify);
        // fs.appendFile("log.txt", showData + divider, function(err) {
        //     if (err) throw err;
        //   });
    } 
    
        fs.appendFile('log.txt', logTracks + divider, function(error) {
            if (error) throw error;
        });
        // logResults(data);
        // console.log(logTracks);
    }
    )};
    spotifyThisSong();
   
   



    function doThis() {
    // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TXT
    fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
    return console.log(error);
    }
    // CATCH DATA AND USE THE .SPLIT() METHOD TO SEPARATE OBJECTS WITHIN OUR NEW ARRAY
    let dataArr = data.split(",");
    // TAKE OBJECTS FROM RANDOM.TXT TO PASS AS PARAMETERS
    userInput = dataArr[0];
    userQuery = dataArr[1];
    // CALL OUR FUNCTION WITH OUR NEW PARAMETERS...
    // userCommand(userInput, userQuery);
    });
    };
    
    function showSomeInfo(){
        fs.readFile('random.txt', 'utf8', function(error, data){
            if (error){ 
                return console.log(err);
            }
            var dataArr = data.split(',');
            switchCase(dataArr[0], dataArr[1]);
        });
    }


    switchCase();
