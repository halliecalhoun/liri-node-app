require("dotenv").config();
var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var fs = require("fs");
fs.appendFile('log.txt', userInput + ",", function (err) {
    if (err) throw err;
});

var userInput = process.argv;
var userQuery = userInput[2];
// var userQuery = process.argv.slice(3).join(" ");

//variable for holding input
var name = "";
for (var i = 3; i < userInput.length; i++) {
    if (i > 3 && i < userInput.length) {
        name = name + "+" + userInput[i];
    } else {
        name += userInput[i];
    }
}

switchCase();
// Make it so liri.js can take in one of the following commands:
function switchCase() {
    switch (userQuery) {
        case "concert-this":
            concertThis(name);
            break;

        case "spotify-this-song":
            spotifyThisSong(name);
            break;

        case 'movie-this':
            movieThis(name);
            break;

        // need to practice switch case more to perform the function below:
        case 'do-what-it-says':
            showInfo();
            break;

        default:
            console.log("Invalid input, try again.");

    }
}

var divider = "\n------------------------------------------------------------\n\n";

function concertThis(name) {
    console.log(`\n - - - - -\n\nSEARCHING FOR EVENT...`);
    // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
        function (response) {
            var concertsArr = response.data;
            // for (var i = 0; i < concertsArr.length; i++) {
            if (concertsArr[i] != undefined) {
                console.log("--------------------EVENT INFO--------------------");
                var logConcerts = "Venue Name: " + concertsArr[i].venue.name + "\nVenue Location: " + concertsArr[i].venue.city + "\nEvent Date: " + moment(concertsArr[i].datetime).format("MM/DD/YYYY") + "\n";
            }
            fs.appendFile('log.txt', logConcerts + divider, function (error) {
                if (error) throw error;
                console.log(logConcerts);
            });
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

var divider = "\n------------------------------------------------------------\n\n";

function spotifyThisSong(name) {
    console.log(`\n - - - - -\n\nSEARCHING FOR SONG...`);
    // var isInputNull = userQuery === "" ? userQuery = "The Sign Ace of Base" : userQuery = userQuery;
    if (!name) {
        name = "The Sign Ace of Base";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: name,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log("--------------------SONG INFO--------------------");
            console.log("\nSong: " + data.tracks.items[0].name +
            "\nArtist: " + data.tracks.items[0].album.artists[0].name +
                "\nSpotify Link: " + data.tracks.items[0].album.external_urls.spotify +
                "\nAlbum: " + data.tracks.items[0].album.name + "\n");
        }
        fs.appendFile("log.txt", "\nAppending this song and artist data: " +
            "\n" + data.tracks.items[0].album.artists[0].name +
            "\n" + data.tracks.items[0].name +
            "\n" + data.tracks.items[0].album.external_urls.spotify +
            "\n" + data.tracks.items[0].album.name + "\n", function (err) {
                if (err) {
                    console.log(err);
                }
            })
    })
}

var divider = "\n------------------------------------------------------------\n\n";


function movieThis(name) {
    //    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log()
            var movieData = response.data;
            // for (var i = 0; i < movieData.length; i++) {
            // console.log(movieData[i].Title);
            if (name === "") {
                movieThis("Mr. Nobody");
            } else {
                // if (movieData.Title != undefined) {
                console.log(`\n - - - - -\n\nSEARCHING FOR MOVIE...`);
                console.log("--------------------MOVIE INFO--------------------");
                console.log("Title: " + movieData.Title);
                console.log("Year: " + movieData.Year);
                console.log("IMDB Rating: " + movieData.imdbRating);
                console.log("Rotten Tomatoes Rating: " + movieData.tomatoRating);
                console.log("Country: " + movieData.country);
                console.log("Language: " + movieData.Language);
                console.log("Plot: " + movieData.Plot);
                console.log("Actors: " + movieData.Actors);

                var logMovies = "Title: " + movieData.title +
                    "\nYear: " + movieData.Year + "\nIMDB Rating: " + movieData.imdbRating + "\nRotten Tomatoes Rating: " + movieData.tomatoRating + "\nCountry: " + movieData.country + "\nLanguage: " + movieData.Language + "\nPlot: " + movieData.Plot + "\nActors: " + movieData.Actors + "\n";
                fs.appendFile('log.txt', logMovies + divider, function (error) {
                    if (error) throw error;
                });
            }
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })

};

// need to practice switch case more to perform the function below
function showInfo() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        var userInput = dataArr[0];
        var userQuery = dataArr[1];
        // switchCase(userInput, userQuery);
        spotifyThisSong(userQuery);
    });
};
function showSomeInfo() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        var name = dataArr[1];
        spotifyThisSong(name);
        
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
    });
};
