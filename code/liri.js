// 
require("dotenv").config();
var appendLog = require('fs')
// 
let term = process.argv[2]
let searchItem = process.argv[3]
var env = require('dotenv')
var bandsIT = require('bandsintown');
var omdb = require('omdb');
var Spotify = require('node-spotify-api');

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
            "Artist: "+songs[0].artists[0].name,
            "Song: "+songs[0].name,
            "Link: "+songs[0].href,
            "Album: "+songs[0].album.name
        ].join('\n\n')

        console.log(spotifyData)
        appendLog.appendFile("log.txt", spotifyData, function(err) {
            if (err) throw err;
          });
    });
}

function omdbSearch(FMovie) {
    console.log(FMovie)
    omdb.search(FMovie, function (err, movie) {
        console.log(movie)
        if (err) {
            return console.error(err);
        }
        if (movie.length < 1) {
            return console.log('No movies were found!');
        }
        // * Title of the movie.  // * Year the movie came out. // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie. // * Country where the movie was produced.
        // * Language of the movie. // * Plot of the movie.
        // * Actors in the movie.
     
        var omdbData = [
            "Title: "+songs[0].artists[0].name,
            "Year Released: "+songs[0].name,
            "Actors: "+songs[0].name,
            "IMDB Rating: "+songs[0].href,
            "Rotten Tomatoes Rating: "+songs[0].album.name,
            "Produced In: "+songs[0].album.name,
            "Language: "+songs[0].album.name,
            "Plot: "+songs[0].album.name,
        ].join('\n')
        console.log(omdbData)

    });
}