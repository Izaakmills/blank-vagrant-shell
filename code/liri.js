// 
require("dotenv").config();
var appendLog = require('fs');
var request = require('request');
var env = require('dotenv')
var bandsIT = require('bandsintown');
const omdb = require('omdbapi');
var Spotify = require('node-spotify-api');
// 
let term = process.argv[2]
let searchItem = process.argv[3]

var spotifyID = process.env.SPOTIFY_ID
var spotifySecret = process.env.SPOTIFY_SECRET

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (term) {
    case "concert-this":
        // This will search the Bands in Town Artist Events API("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
        // Name of the venu, Venue location, Date of the Event(use moment to format this as "MM/DD/YYYY")
        bandifyConcert(searchItem)
        console.log(spotifyData)
        break;
    case "spotify-this-song":
        // Artist(s), The song's name // A preview link of the song from Spotify // The album that the song is from
        // default to "'The Sign by Ace of Base if no song foundfound"
        spotifySong(searchItem)
        break;
    case "movie-this":
        omdbSearch(searchItem)
        break;
    case "do-what-it-says":
        console.log("do what it says")
        break;
}

function spotifySong(song) {
    var spotify = new Spotify({
        id: spotifyID,
        secret: spotifySecret
    });
    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items

        var spotifyData = [
            "Artist: " + songs[0].artists[0].name,
            "Song: " + songs[0].name,
            "Link: " + songs[0].href,
            "Album: " + songs[0].album.name
        ].join('\n\n')

        console.log(spotifyData)
        appendLog.appendFile("log.txt", spotifyData, function (err) {
            if (err) throw err;
        });
    });
}

function omdbSearch(FMovie) {
    request('http://www.omdbapi.com/?apikey=Trilogy&t=' + FMovie, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body);
        var omdbJson = JSON.parse(body)
        console.log(omdbJson)
        var omdbData = [
            "\n\nTitle: " + omdbJson.Title,
            "Year Released: " + omdbJson.Year,
            "Actors: " + omdbJson.Actors,
            "IMDB Rating: " + omdbJson.imdbRating,
            // "Rotten Tomatoes Rating: " + omdbJson.rottenTomatoes,
            "Produced In: " + omdbJson.Country,
            "Language: " + omdbJson.Language,
            "Plot: " + omdbJson.Plot,
        ].join('\n')
        console.log(omdbData)
        appendLog.appendFile("log.txt", omdbData, function (err) {
            if (err) throw err;
        });
    });
}

// function do-what-it-says(){
// }