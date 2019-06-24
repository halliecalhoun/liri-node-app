# Liri Node App

## Description
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app used in terminal that takes in parameters and gives you back data.

LIRI will use API's to search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## Command List
### LIRI is a command line node app that takes the four commands below:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

## Concert-this:

### Concert-this Node Command Code:
```
node liri.js concert-this <'artist/band name here'> 
```
![Concert-this Command Screenshot](assets\images\concert.PNG)

## Spotify-this-song:

### Spotify-this-song Node Command Code with Defined Song:
```
node liri.js spotify-this-song <'song name here'>
```
![Concert-this Command Screenshot](assets\images\spotify-this-song.PNG)

### Spotify-this-song Node Command Code with Undefined Song:
If there is no song provided, then the program will default to "The Sign" by Ace of Base, as seen in the example below:

```
node liri.js spotify-this-song
```
![Spotify-this-song Undefined](assets\images\ace.PNG)

## Movie-this:

### Movie-this Node Command Code with Defined Movie:
```
node liri.js movie-this <'movie name here'>
```
![Concert-this Command Screenshot](assets\images\movie-this.PNG)

### Movie-this Node Command Code with Undefined Movie:
If there is no movie provided, then the program will default to the movie "Mr. Nobody," as seen in the example below:

```
node liri.js movie-this
```
![Spotify-this-song Undefined](assets\images\mr-nobody.PNG)

## Built With
* JavaScript- Code executed within Node.js
* Node.js- JavaScript runtime environment
* Node Packages:
    * Node Spotify API- For spotify-this-song command
    * Axios- For calling Bands in Town & OMDB APIs
    * Moment- Used for Date Formatting
* Bands in Town API- For concert-this command
* OMDB API- For movie-this command

## Author
Hallie Calhoun