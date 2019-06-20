require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


 
var userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "spotify-this":
        spotifyThisSong();
        break;
    }
}

userCommand(userInput, userQuery);

function spotifyThisSong() {
    console.log(`\n - - - - -\n\nSEARCHING FOR..."${userQuery}"`);
    // IF USER QUERY NOT FOUND, PASS VALUE OF "ACE OF BASE"
    if (!userQuery) {
    userQuery = "I want it that way"
    };
    // SPOTIFY SEARCH QUERY FORMAT
    spotify.search({
    type: 'track',
    query: userQuery,
    limit: 1
    }, function (error, data) {
    if (error) {
    return console.log('Error occurred: ' + error);
    }
    // COLLECT SELECTED DATA IN AN ARRAY
    var spotifyArr = data.tracks.items;
    for (i = 0; i < spotifyArr.length; i++) {
    console.log(`\nBA DA BOP! That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
    };
    });
    }
   
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
    

spotify.search({ type: 'track', query: 'I want it that way' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
 
// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });