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
    console.log(`\n - - - - -\n\nSEARCHING FOR...`);
    // IF USER QUERY NOT FOUND, PASS VALUE OF "ACE OF BASE"
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
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Album: " + data.tracks.items[i].album.name);
        // data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify
        console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify);
        // preview_url
        fs.appendFile('random.txt', data.tracks.items[i].artists[0].name);
        fs.appendFile('random.txt', data.tracks.items[i].name);
        fs.appendFile('random.txt', data.tracks.items[i].preview_url);
    } 
// } else {
//     console.log('Error occurred: ' + error);
// }
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

// spotify.search({ type: 'track', query: 'I want it that way' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   });
 
// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });  


// 
// if (error) {
//     return console.log('Error occurred: ' + error);
//     }
//     // COLLECT SELECTED DATA IN AN ARRAY
//     var spotifyArr = data.tracks.items;
//     for (i = 0; i < spotifyArr.length; i++) {
//     console.log(`\nBA DA BOP! That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
//     };
//     });
//     }
   

    // spotify.search({ type: 'track', query: 'I want it that way' }, function(err, data) {
    //     if (err) {
    //       return console.log('Error occurred: ' + err);
    //     }
       
    //   console.log(data); 
    //   });
     
    // spotify
    //   .search({ type: 'track', query: 'All the Small Things' })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });