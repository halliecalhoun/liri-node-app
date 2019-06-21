require("dotenv").config();

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

function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "spotify-this":
        spotifyThisSong();
        break;
    }
    
    // case "do-what-it-says":
    //     doThis();
    //     break;
}


userCommand(userInput, userQuery);
var divider = "\n------------------------------------------------------------\n\n";


function spotifyThisSong() {
    console.log(`\n - - - - -\n\nSEARCHING FOR...`);
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
        var showData = [
        console.log("Artist: " + data.tracks.items[i].artists[0].name),
        console.log("Song: " + data.tracks.items[i].name),
        console.log("Album: " + data.tracks.items[i].album.name),
        // data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify
        console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify),
        ].join("\n\n");

        fs.appendFile('random.txt', showData + divider, function(error) {
            if (error) throw error;
        });
        // fs.appendFile('random.txt', data.tracks.items[i].name);
        // fs.appendFile('random.txt', data.tracks.items[i].album.name);
        // fs.appendFile('random.txt', data.tracks.items[i].external_urls.spotify);
        // fs.appendFile("log.txt", showData + divider, function(err) {
        //     if (err) throw err;
        //   });
    } 
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
    userCommand(userInput, userQuery);
    });
    };
    
    doThis();
