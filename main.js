var express = require('express');
var fs = require("fs");
var app = express();
var writerStream = fs.createWriteStream('output.txt');

app.use(express.static('public'));


var response = "";
var tx = "";

app.get('/form.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "form.htm" );
})

app.get('/game', function (req, res) {

   
   var data = "";
  response = req.query.number;
   data+=response + "\n";
  // tx = res.query.log;
	writerStream.write(data,'UTF8');
	writerStream.on('finish', function() {
		console.log("Write completed.");
	});

	writerStream.on('error', function(err){
	   console.log(err.stack);
	});
	
  // 	writerStream.end();
   console.log(getHint(randomNumber,response));
   res.end(getHint(randomNumber,response));
})

	

	

app.get('/output.txt', function (req, res) {
   res.sendFile( __dirname + "/" + "output.txt" );
})


function validNumber(number) {
    return !hasRepeatingDigits(number) && number > 999 && number < 10000;
  }
  
  function hasRepeatingDigits(number) {
    var i, j;    
    number += '';
    for (i = 0; i < number.length - 1; i++) {
      for (j = i + 1; j < number.length; j++) {
        if (number.charAt(i) == number.charAt(j)) {
          return true;
        }
      }
    }
  }
while(!validNumber(randomNumber)){
var randomNumber = Math.floor((Math.random() * 9000) + 1000);
console.log("The number is: " + randomNumber);
}


function getHint(secret, guess) {
  var bulls = 0;
  var cows = 0;
  var numbers = new Array(10);
  for (var i=0; i<10; i++){
    numbers[i] = 0;
  }
  for (var i = 0; i<secret.length; i++) {
    var s = secret.charCodeAt(i) - 48;
    var g = guess.charCodeAt(i) - 48;
    if (s == g) bulls++;
    else {
      if (numbers[s] < 0) cows++;
      if (numbers[g] > 0) cows++;
      numbers[s] ++;
      numbers[g] --;
    }
  }
  return "Bulls: " + bulls + "  " + "Cows: " + cows ;
}


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})