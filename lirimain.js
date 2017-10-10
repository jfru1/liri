var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var spotify = new Spotify({
	id: null,
	secret: null
});

var getArtistName = function(artist){
	return artist.name;
}
var getSpotify = function(songName){
	if (songName === undefined){
		songName = "What's my age again";
	}
	spotify.search(
	{
		type: "Track",
		query: songName
	},
	function(err, data){
		if (err){
			console.log("Error: " + err);
			return;
		}

		var songs = data.tracks.items;

		for (var i = 0; i < songs.length; i++){
			console.log(i + ":");
			console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
			console.log("Song Name: " + songs[i].name);
			console.log("Preview Song: " + songs[i].preview_url);
			console.log("Album Title: " + songs[i].album.name);
			console.log("_______________________________________");
		}
	});
};
var getTweets = function(){
	var client = new Twitter(keys.TwitKeys);
	var parameters = {
		sn: "jfrew"
	};
	client.get("statuses/user_timeline", parameters, function(error, tweets, response){
		if(error === false){
			for (var i = 0; i< tweets.length; i++){
				console.log(tweets[i].created_at);
				console.log(" ");
				console.log(tweets[i].text);
			};
		};
	});
};
var getMovie = function(movie){
	if (movie === undefined){
		movie = "Mr Nobody";
	}
	var urlHit = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=40e9cece";
	request(urlHit, function(error, response, body){
		if(!error && response.statusCode === 200){
			var objData = JSON.parse(body);
			console.log("Title: " + objData.Title);
			console.log("Year: " + objData.Year);
			console.log("Rated: " + objData.Rated);
			console.log("IMDB Rating: " + objData.imdbRating);
			console.log("Language: " + objData.Language);
			console.log("Plot Synop: " objData.Plot);
			console.log("Actors: " + objData.Actors);
			console.log("Rotten Tomatoes URL: " + objData.tomatoURL)
		}
	});
};

var parseTxt = function(){
	fs.readFile("random.txt", "utf8", function(error, data){

		console.log(data);
		var dataArray = data.split(" ");

		if (dataArray.length === 2){
			choose(dataArray[0], dataArray[1]);
		}	
		else (data.length === 1){
			choose(dataArray[0])
		}
	});
};

var choose = function(case, input){
	switch (case){
		case "spotifythis":
			getSpotify(input);
			break;
		case "mytweets":
			getTweets();
			break;
		case "findmovie":
			getMovie(input);
			break;
		default:
		console.log("Command not recognized. Valid strings are 'spotifythis [song]', 'mytweets', and 'findmovie [movie]'.")
	}
}
var liriStart = function(a, b){
	choose(a, b);
};
liriStart(process.argv[2], process.argv[3]);