var guessesLeft = 10;
var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var goalNumber=Math.floor(Math.random()*101);

$(function() {
  resetGame();
  
  $('form#guessTheNumber').keypress(function(e) {
    if(e.which == 13) {
      checkGuess();
      return false;
    }
  });
  
  $('#btnGuess').click(checkGuess);
  
  $('#playAgain').click(resetGame);
});

function resetGame() {
  $('#endGameMessage').hide();
  $('#guessTheNumber').show();
  $('#playAgain').hide();
  guessesLeft = 10;
  goalNumber=Math.floor(Math.random()*101);
  
  updateScore(guessesLeft);
  populateHighScores(highScores);
  
  //$('#highOrLow').text(goalNumber);
}

function populateHighScores(scores) {
  $.ajax({
    url: "/getscores",
    dataType: "html"
  }).done(function(data) {
      $('div#highScores').html(data);
    });
}

function updateScore(score) {
  $('h2#score span#guessesLeft').text(score);
}

function checkGuess() {
  var guess = parseInt($('#guess').val());
  
  guessesLeft = guessesLeft - 1;
  updateScore(guessesLeft);
  
  if (guess < goalNumber) {
    //too low message
    $('#highOrLow').text('Too low!');
  }
  else if (guess > goalNumber) {
    //too high message
    $('#highOrLow').text('Too high!');
  }
  else {
    //victory
    endGame('YOU WIN!');
    winDialog();
  }

  if (guessesLeft <= 0) {
    //lose
    endGame('YOU LOSE!');
  }
}

function endGame(msg) {
  $('#guessTheNumber').hide();
  $('#playAgain').show();
  $('#endGameMessage').text(msg);
  $('#endGameMessage').slideToggle(500);
}

function winDialog() {
  var name = window.prompt("What is your name?","");
  
  $.ajax({
    url: "/addscore",
    dataType: "json",
    data: { "name": name ? name : "Guest", "score": "" + guessesLeft }
  })
  
  //highScores.push([guessesLeft, name ? name : "Guest"]);
  populateHighScores(highScores);
}

