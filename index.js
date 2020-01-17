/* tweetshirt.js */

window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;

	// Niespodzianka
	makeImage();
}

function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");

	fillBackgroundColor(canvas, context);

	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;

	if (shape == "squares") {
		for (var squares = 0; squares < 20; squares++) {
			drawSquare(canvas, context);
		}
	}
	else if (shape == "circles") {
		for (var circles = 0; circles < 20; circles++) {
			drawCircle(canvas, context);
		}
	}
	drawText(canvas, context);
	drawBird(canvas, context);
}

// Tutaj czyścimy tło i ustalamy jego kolor
function fillBackgroundColor(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj[index].value;

	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

}

// Rysuje losowo rozmieszczone kwadraty
function drawSquare(canvas, context) {
	var w = Math.floor(Math.random() * 36);    
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);

	// Skorzystaj z tego kodu, jeżeli chcesz
	// mieć bardziej "twitterową" kolorystykę
	//context.fillStyle = "rgb(0, 173, 239)";
	context.fillStyle = "lightblue";
	context.fillRect(x, y, w, w);
}

// Rysuje losowo rozmieszczone kółka
function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 36);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);

	context.beginPath();
	context.arc(x, y, radius, 0, degreesToRadians(360), true);

	// Skorzystaj z tego kodu, jeżeli chcesz
	// mieć bardziej "twitterową" kolorystykę
	//context.fillStyle = "rgb(0, 173, 239)";
	context.fillStyle = "lightblue";
	context.fill();
}

// Wypisuje wszystkie teksty, włącznie z tweetem
function drawText(canvas, context) {
	var selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var fgColor = selectObj[index].value;

	context.fillStyle = fgColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	context.fillText("Zobaczyłem ten tweet", 20, 40);


	// wypisuje tweet!
	selectObj = document.getElementById("tweets");
	index = selectObj.selectedIndex;
	var tweet = selectObj[index].value;
	context.font = "italic 1.2em serif";
	context.fillText(tweet, 30, 100);

	
	// i usuń powyższy wiersz context.fillText
/*
	if (tweet.length > 60) {
		var tweetLines = splitIntoLines(tweet);
		for (var i = 0; i < tweetLines.length; i++) {
			context.fillText(tweetLines[i], 30, 70+(i*25));
		}
	}
	else {
		context.fillText(tweet, 30, 100);
	}
*/

	context.font = "bold 1em sans-serif";
	context.textAlign = "right";
	context.fillText("i dostałem tylko tę nędzną koszulkę!", 
		canvas.width-20, canvas.height-40);
}

// Rysuje obrazek z twitterowym ptaszkiem
function drawBird(canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	twitterBird.onload = function() {
		context.drawImage(twitterBird, 20, 120, 70, 70);
	};

}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}


function updateTweets(tweets) {
	var tweetsSelection = document.getElementById("tweets");

	// dodaje wszystkie tweety do listy rozwijanej
	for (var i = 0; i < tweets.length; i++) {
		tweet = tweets[i];

    tweet.text = "Jeżeli warto o tym tweetować, warto też wrzucić na #tweetowakoszulka";

		// tworzy element option
		var option = document.createElement("option");
		option.text = tweet.text;

		// wycina wszystkie cudzysłowy, tak by nie namieszały w elementach option
		option.value = tweet.text.replace("\"", "'");

		// dodaje element option do select
		tweetsSelection.options.add(option);
    }
	
	// zaznacza pierwszy element listy rozwijanej jako wybrany
	tweetsSelection.selectedIndex = 0;
}


// Dzieli jeden długi łańcuch na wiele wierszy 
// nie dłuższych niż 60 znaków każdy.
// Zwraca tablicę wierszy.
function splitIntoLines(str) {
	var strs = new Array();
	var space = str.indexOf(' ', 60);
	strs[0] = str.substring(0, space);
	strs[1] = str.substring(space+1);
	if (strs[1].length > 60) {
		space = strs[1].indexOf(' ', 60);
		strs[1] = strs[1].substring(space+1);
		strs[2] = strs[1].substring(0, space);
	}
	return strs;
}

// Niespodzianka
function makeImage() {
	var canvas = document.getElementById("tshirtCanvas");
	canvas.onclick = function () {
		window.location = canvas.toDataURL('image/png');
	};
}
