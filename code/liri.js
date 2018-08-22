// 
require("dotenv").config();
// 
// console.log(process.env)
let command = process.argv[2]
let searchItem = process.argv[3]
var env = require('dotenv')
var bandsIT = require('bandsintown');
var omdb = require('omdb');
var Spotify = require('node-spotify-api');
console.log(Spotify)

var spotifyID = process.env.SPOTIFY_ID
var spotifySecret = process.env.SPOTIFY_SECRET

// console.log(Spotify)
// console.log(bandsIT)
// console.log(omdb)

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

switch (command) {
    case "concert-this":
        // This will search the Bands in Town Artist Events API("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
        // Name of the venue
        // Venue location
        // Date of the Event(use moment to format this as "MM/DD/YYYY")
        // function to call bands in town and display
        bandifyConcert(searchItem)
        console.log("----------\nVenue: " + venue + "\nLocation of Venue: " + venueLocation + "\nDate of Event: " + eventDate + "\n----------")
        break;
    case "spotify-this-song":
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
        // default to "'The Sign by Ace of Base if no song foundfound"
        spotifySong(searchItem)
        break;
    case "movie-this":
        omdbMovie(searchItem)
        console.log("movie-this")
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
        // console.log(data.tracks.items)
        // console.log(data.tracks.items[0])

        var songs = data.tracks.items
        // console.log(data.album)
        var artists = songs[0].artists[0].name
        var songLink = songs[0].href
        var songName = songs[0].name
        var album = songs[0].album.name
        // console.log(songLink)
        // console.log(songName)
        // console.log(album)
        // console.log(songs[0].album.name)

        // console.log("\ndata item: " + data.tracks.items[0])
        console.log("--------\nArtist: " + artists + "\nSong: " + songName + "\nLink: " + songLink + "\nAlbum: " + album + "\n--------")
    });
}