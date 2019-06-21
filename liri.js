require("dotenv").config();
var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// var fs = require("fs");
var moment = require('moment');
var axios = require('axios');


var fs = require("fs");
fs.appendFile('log.txt', userInput + ",", function (err) {
    if (err) throw err;
});

var userInput = process.argv[2];
var userQuery = process.argv[3];
// var userQuery = process.argv.slice(3).join(" ");
// concert-this

// spotify-this-song

// movie-this

// do-what-it-says 


function switchCase(userInput, userQuery) {
    switch (userInput) {

            case 'concert-this':
                showConcertInfo();
                break;

                case 'spotify-this-song':
            spotifyThisSong();
            break;

                case 'movie-this':
                    movieThis();
                    break;

            case 'do-what-it-says':
                    showSomeInfo();
                    break;
                    
    }
}
switchCase(userInput, userQuery);
// function userCommands(userInput, userQuery) {
//     switch (userInput) {
//         case "spotify-this":
//         spotifyThisSong();
//         break;
//     }
    
    // case "do-what-it-says":
    //     doThis();
    //     break;
// };
var divider = "\n------------------------------------------------------------\n\n";

// function showConcertInfo(artist) {
//     console.log(`\n - - - - -\n\nSEARCHING FOR ARTIST...`);
//     // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//     axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
//         function(response) {
//             // console.log(response);
//                 var concerts = response.data;
//                 for (var i = 0; i < concerts.length; i++) {
//                     if (concerts[i].venue != undefined) {
//                     // var output = 
//                     console.log("--------------------EVENT INFO--------------------")
                    
//                     console.log("Venue Name: " + concerts[0].venue.name);
//                     console.log("Venue Location: " + concerts[0].venue.city);
//                     // var eventDateAndTime = moment(concerts[i].datetime);
//                     console.log("Event Date: " + moment(concerts[0].datetime).format("MM/DD/YYYY"));
//                     logConcerts = "Venue name: " + concerts[0].venue.name + "\nVenue Location: " + concerts[0].venue.city +
//         "\nEvent Date: " + moment(concerts[0].datetime).format("MM/DD/YYYY") + "\n";
       
        
              
//                     }
//                else {
//                 console.log("No results found.");
//             }
            
//         }
//         }
//     ).catch(function (error) {
//         console.log(error);
//     })
    // fs.appendFile('log.txt', logConcerts + divider, function(error) {
    //     if (error) throw error;
    //     }) 
// };



function showConcertInfo(artist) {
    console.log(`\n - - - - -\n\nSEARCHING FOR ARTIST...`);
    // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            var concertsArr = response.data;
            for (var i = 0; i < concertsArr.length; i++) {
            if (concertsArr[i].venue != undefined) {
            // console.log("Release Year: " + response.data.Year);
            console.log("--------------------EVENT INFO--------------------");
            console.log("Venue Name: " + concertsArr[i].venue.name);
            console.log("Venue Location: " + concertsArr[i].venue.city);
            // var eventDateAndTime = moment(concerts[i].datetime);
            console.log("Event Date: " + moment(concertsArr[i].datetime).format("MM/DD/YYYY"));

            var logConcerts = "Venue Name: " + concertsArr[i].venue.name + "\nVenue Location: " + concertsArr[i].venue.city + "\nEvent Date: " + moment(concertsArr[i].datetime).format("MM/DD/YYYY") + "\n";
        
            }
            fs.appendFile('log.txt', logConcerts + divider, function(error) {
                if (error) throw error;
                // writeToLog(logTracks);
            });
            }
          })
            .catch(function(error) {
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
            };
    // fs.appendFile('log.txt', logConcerts + divider, function(error) {
    //     if (error) throw error;
    //     }) 

       
// showConcertInfo();

// userCommand(userInput, userQuery);
var divider = "\n------------------------------------------------------------\n\n";
// var spotifyArray = [];
// function spotifyThisSong(song) {
//     console.log(`\n - - - - -\n\nSEARCHING FOR...`);
// spotify
//   .search({ type: 'track', query: 'song' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
function spotifyThisSong() {
    console.log(`\n - - - - -\n\nSEARCHING FOR...`);
    // var isInputNull = userQuery === "" ? userQuery = "The Sign Ace of Base" : userQuery = userQuery;
    if (!userQuery) {
        userQuery = "The Sign Ace of Base";
    }
    var spotify = new Spotify(keys.spotify);

	spotify.search({
		type: "track",
		query: userQuery,
		limit: 1
	}, function(err, data) {
		if (err) {
			return console.log(err);
		} else {
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // artist's name
			console.log("Song name: " + data.tracks.items[0].name) // song name
			console.log("External url: " + data.tracks.items[0].album.external_urls.spotify) // external link
			console.log("Album: " + data.tracks.items[0].album.name) // album name
        }
        // fs.appendFile("log.txt", "\nAppending this song and artist data: " + 
		// 	"\n" + data.tracks.items[0].album.artists[0].name + 
		// 	"\n" + data.tracks.items[0].name + 
		// 	"\n" + data.tracks.items[0].album.external_urls.spotify + 
		// 	"\n" + data.tracks.items[0].album.name, function(err) {
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 	})
	})
}
// spotify.search({ type: 'track', query: 'song' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   })
// };

// function spotifyThisSong(song) {
//     console.log(`\n - - - - -\n\nSEARCHING FOR...`);
//     spotify.search({
//     type: 'track',
//     query: song,
//     limit: 1
//     }, function (error, data) {
//         console.log();
//     if (error) {
//         return console.log('Error occurred: ' + error);
//         };
//         if (!song) {
//             song = "The Sign Ace of Base";
//             } else {
//         var tracksArr = data.tracks.items;
//         for (var i = 0; i < tracksArr.length; i++) {
//         if (!error) {
//         console.log("--------------------SPOTIFY INFO--------------------");
        // var songData = data.tracks.items[i];
        // var showData = [
        // console.log("Artist: " + tracksArr[i].artists[i].name);
        // console.log("Song: " + tracksArr[i].name);
        // console.log("Album: " + data.tracks.items[i].album.name);
        // data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify
    //     console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify);
    //     var logTracks = "Artist: " + data.tracks.items[i].artists[0].name + "\nSong name: " + data.tracks.items[i].name +
    //     "\nAlbum Name: " + data.tracks.items[i].album.name + "\nExternal Link: " + data.tracks.items[i].external_urls.spotify + "\n";
    //     fs.appendFile('log.txt', logTracks + divider, function(error) {
    //         if (error) throw error;
    //     });
    //     }
    //     }
    // }
    // }
    // )};
    

    // spotifyThisSong();
   
    var divider = "\n------------------------------------------------------------\n\n";

    function movieThis(movie) {
        console.log(`\n - - - - -\n\nSEARCHING FOR MOVIE...`);
    //    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
       axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            // console.log(response);
            // console.log(response.data.Title);
            var movieData = response.data;
            // for (var i = 0; i < movieData.length; i++) {
                // console.log(movieData[i].Title);
                if (movie === ""){
                    movie = "Mr. Nobody";
                    console.log("Movie Title: Mr. Nobody");
                } else {
                // if (movieData.Title != undefined) {
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
                fs.appendFile('log.txt', logMovies + divider, function(error) {
                    if (error) throw error;
                    // writeToLog(logTracks);
                });
                }
                // } else {
                //     movieThis("Mr. Nobody");
                // }
                
            }).catch(function(error) {
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
// movieThis();


    // function doThis() {
    // // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TXT
    // fs.readFile("random.txt", "utf8", function (error, data) {
    // if (error) {
    // return console.log(error);
    // }
    // // CATCH DATA AND USE THE .SPLIT() METHOD TO SEPARATE OBJECTS WITHIN OUR NEW ARRAY
    // let dataArr = data.split(",");
    // // TAKE OBJECTS FROM RANDOM.TXT TO PASS AS PARAMETERS
    // userInput = dataArr[0];
    // userQuery = dataArr[1];
    // // CALL OUR FUNCTION WITH OUR NEW PARAMETERS...
    // // userCommand(userInput, userQuery);
    // });
    // };
    
    function showInfo(){
        fs.readFile('random.txt', 'utf8', function(error, data){
            if (error){ 
                return console.log(err);
            }
            var dataArr = data.split(',');
            userInput = dataArr[0];
            userQuery = dataArr[1];
            // switchCase(dataArr[0], dataArr[1]);
        });
    };
    function showSomeInfo() {
            fs.readFile("random.txt", "utf8", function(error, data) {
                var dataArr = data.split(",");
                spotifyThisSong(dataArr[1])
                // If the code experiences any errors it will log the error to the console.
                if (error) {
                  return console.log(error);
                }
            });
        };

    switchCase();
