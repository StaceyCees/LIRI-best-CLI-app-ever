var inputString = process.argv;
var fs = require("fs");

function Command(option, query)  {
    this.option = option;
    this.query = query;
};

Command.prototype.printInfo = function() {
    var displayedCommand = "node app.js "+this.option+" '"+this.query+"'";
    console.log(displayedCommand);
};

function printCommandHistory()  {
    var savedCommands = [];
    var randomCommands = [];
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        else    {
            savedCommands.push(data.split('abcd'));
            savedCommands[0].pop();
            for (i=0; i < savedCommands[0].length; i++)    {
                var savedCommand = JSON.parse(savedCommands[0][i]);
                var randomCommand = new Command(savedCommand.option, savedCommand.query);
                randomCommands.push(randomCommand);
                randomCommands[i].printInfo();
}}})};

function writeCommand() {
    var optionCalled = inputString[2];
    var querySearched = inputString[3];
    var newCommand = new Command(optionCalled, querySearched);
    if ((newCommand.option === undefined) || (newCommand.query === undefined))    {
        console.log("Please Enter A Valid Query");
    }
    else    {
        fs.appendFile("random.txt", JSON.stringify(newCommand)+"abcd", function(err)    {
        if (err)    {
            return console.log(err);
        }
        else    {
            console.log("New 'do-what-it-says' Command Added");
}})}};

function checkCommandHistory()  {
    var savedCommands = [];
    var randomCommands = [];
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
        return console.log(error);
        }
        else    {
            savedCommands.push(data.split('abcd'));
            savedCommands[0].pop();
            existingCommand = false;
            for (i=0; i < savedCommands[0].length; i++)    {
                var savedCommand = JSON.parse(savedCommands[0][i]);
                var randomCommand = new Command(savedCommand.option, savedCommand.query);
                randomCommands.push(randomCommand);  
                if (randomCommands[i].query === inputString[3]) {
                    existingCommand = true;
                }
                else continue;
            };
            if (existingCommand === false)    {
                writeCommand();
}}})};

function movieThis()    {
    var queryURL = "http://www.omdbapi.com/?t="+movie_Searched+"&apikey=trilogy"
    request(queryURL, function(err, response, body) {
        var parsedBody = JSON.parse(body);
        var movieTitle = parsedBody.Title;
        var movieYear = parsedBody.Year;
        var imdbRating = parsedBody.imdbRating;
        for (i=0; i < parsedBody.Ratings.length; i++)   {
            if (parsedBody.Ratings[i].Source === "Rotten Tomatoes") {
                var rottenTomatoesRating = parsedBody.Ratings[i].Value; 
            }
            else {
                var rottenTomatoesRating = "N/A";
        }};
        var productionCountry = parsedBody.Country;
        var movieLanguage = parsedBody.Language;
        var movieActors = parsedBody.Actors;
        var moviePlot = parsedBody.Plot;
        console.log("______________________________________________________________");
        console.log("MOVIE TITLE: "+movieTitle+"("+movieYear+")");
        console.log("IMDB RATING: "+imdbRating);
        console.log("ROTTEN TOMATOES RATING: "+rottenTomatoesRating);
        console.log("COUNTRY: "+productionCountry);
        console.log("LANGUAGE(S): "+movieLanguage);
        console.log("ACTORS/ACTRESSES: "+movieActors);
        console.log(movieTitle+" PLOT: "+moviePlot);
        console.log("______________________________________________________________");
})};

function concertThis()  {
    console.log("Searching for concerts")
    var queryURL = "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp";
    request(queryURL, function(error, response) {
        if (error) {
            return console.log('Error occurred');
        }
        else    {
            var parsedBody = JSON.parse(response.body);
            for (i=0; i < parsedBody.length;i++)    {  
                var artistLineup = parsedBody[i].lineup;
                var eventDate = parsedBody[i].datetime;
                var eventVenue = parsedBody[i].venue.name+" | "+parsedBody[i].venue.city+" | "+parsedBody[i].venue.region+" | "+parsedBody[i].venue.country+"";
                console.log("______________________________________________________________");
                console.log("ARTIST LINEUP: "+artistLineup);
                console.log("EVENT DATE: "+eventDate);
                console.log("EVENT VENUE: "+eventVenue);
                if (parsedBody[i].offers[0] === undefined) {
                    console.log("No ticket offerings");
                }
                else    {
                    var eventTicketLinks = parsedBody[i].offers[0].url;
                    console.log("PURCHASE TICKETS HERE: "+eventTicketLinks);
                }
                console.log("______________________________________________________________");
}}})};

function spotifyThis()  {
    // Spotify_Keys prototype
    function Spotify_Keys(id, secret)  {
        this.id = id;
        this.secret = secret;
    };
    // Configures dotenv and converts spotify keys from .env file into Spotify_Keys object
    function loadSpotifyKeys()  {
        var dotenv = require("dotenv");
        const spotify_Config = dotenv.config();
        if (spotify_Config.error) {
            throw spotify_Config.error
        }
        else    {
            var parsed_Spotify_Keys = spotify_Config.parsed;
            var SPOTIFY_ID = parsed_Spotify_Keys.SPOTIFY_ID;
            var SPOTIFY_SECRET = parsed_Spotify_Keys.SPOTIFY_SECRET;
        };
        spotify_Keys = new Spotify_Keys(SPOTIFY_ID, SPOTIFY_SECRET);
        return spotify_Keys;
    };

    // Calling the loadSpotifyKeys() function and setting it to spotify_Keys
    var spotify_Keys = loadSpotifyKeys();
    console.log(spotify_Keys);
    // Initializes Spotify API for search queries.
    function search_Songs() {
            var song_Searched = process.argv[3];
            var Spotify = require('node-spotify-api');
            var spotify = new Spotify({
                id: spotify_Keys.id,
                secret: spotify_Keys.secret
            });
            spotify.search({ type: 'track', query: song_Searched }, function(err, data) {
                if (err) {
                return console.log('Error occurred');
                }
                for (i=0; i < 3; i++)   {
                    console.log("______________________________________________________________");
                    console.log("RESULTS #"+[i+1]);
                    console.log("SONG: "+song_Searched)
                    console.log("LISTEN HERE: "+data.tracks.items[i].album.external_urls.spotify);
                    console.log("ARTIST/ARTISTS: "+data.tracks.items[i].album.artists[0].name);
                    console.log("ALBUM: "+data.tracks.items[i].album.name);
                    console.log("_______________________________________________________________");
                };
                console.log("_______________________________________________________________");
    })};
    search_Songs();
};

function randomCommand()  {
    var savedCommands = [];
    var randomCommands = [];
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        else    {
            savedCommands.push(data.split('abcd'));
            savedCommands[0].pop();
            for (i=0; i < savedCommands[0].length; i++)    {
                var savedCommand = JSON.parse(savedCommands[0][i]);
                var randomCommand = new Command(savedCommand.option, savedCommand.query);
                randomCommands.push(randomCommand);
            };
            var randomNumber = Math.floor(Math.random()*Math.floor(randomCommands.length));
            randomCommands[randomNumber].printInfo();
            if (randomCommands[randomNumber].option === "movie-this")   {
                movie_Searched = randomCommands[randomNumber].query;
                movieThis();
            }
            else    {
                if (randomCommands[randomNumber].option === "concert-this") {
                    artist = randomCommands[randomNumber].query;
                    concertThis();
                }
                else    {
                    if (randomCommands[randomNumber].option === "spotify-this-song")    {
                        process.argv[3] = randomCommands[randomNumber].query;
                        spotifyThis();
}}}}})};

function LIRI() {
    if (inputString[2] === "LIRI") {
        console.log("To start LIRI, run one of the commands for the following options:")
        console.log("-------------------------------------");
        console.log("Option A - OMDB API Search:");
        console.log("node app.js movie-this 'Movie Title'");
        console.log("-------------------------------------");
        console.log("Option B - BandInTown API Search:")
        console.log("node app.js concert-this 'Artist/Band Name'");
        console.log("-------------------------------------");
        console.log("Option C - Spotify API Seach:");
        console.log("node app.js spotify-this-song 'Song Title'");
        console.log("-------------------------------------");
        console.log("_______________________________________________________________");
        console.log("What others said:")
        printCommandHistory();
}};

var request = require("request");
console.log("To see LIRI Options, run the following command:");
console.log("node app.js LIRI");
LIRI();

if (inputString[2] === "movie-this")    {
    checkCommandHistory();
    var movie_Searched= process.argv[3]
    movieThis();
}
else    {
    if (inputString[2] === "concert-this")  {
        checkCommandHistory()
        var artist = inputString[3];
        concertThis();
    }
    else    {
        if (inputString[2] === "spotify-this-song") {
            checkCommandHistory();
            spotifyThis();
        }
        else    {
            if (inputString[2] === "do-what-it-says")   {
                console.log("_______________________________________________________________");
                console.log("What it says:")
                randomCommand();
            }
            else    {
                if (inputString[2] === "command-history")   {
                    console.log("_______________________________________________________________");
                    console.log("What others said:")
                    printCommandHistory();    
}}}}};