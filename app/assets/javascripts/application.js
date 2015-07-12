// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

// Extend javascript array to have the function randomElement
Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)]
}

var directionKey = new Object();
directionKey['38'] = 'up';
directionKey['40'] = 'down';
directionKey['37'] = 'left';
directionKey['39'] = 'right';

var displayKey = new Object();
displayKey['up'] = '▲';
displayKey['down'] = '▼';
displayKey['left'] = '◄';
displayKey['right'] = '►';

var computerOptions = ['down', 'up', 'left', 'right'];
var computerSequence = createSequence(2);
var userInput = [];
var round = 1;
var userTurn = false;

var userSeconds = 5;

function createSequence(num) {
  var sequence = [];
  for (var i = 0; i < num; i++) {
    sequence.push( computerOptions.randomElement() );
  }
  return sequence;
}

function startRoundCountDown() {
  var notifications = $('#notifications')
  var textDiv = $('#notification-text');

  //make visible  
  setTimeout(function() { notifications.show();
                          textDiv.text(3); }, 1000);
  setTimeout(function() { textDiv.text(2); }, 2000);
  setTimeout(function() { textDiv.text(1); }, 3000);

  // hide
  setTimeout(function() { textDiv.text('');
                          startRound(); }, 4000);
}

function startRound() {
  computerSequence.push(computerOptions.randomElement());
  displaySequence(computerSequence);
}

function displaySequence(array) {
  var textDiv = $('#notification-text');

  for (var i = 0; i < array.length; i++) {
    var itemForTheDom = displayKey[array[i]];
    var milliseconds = ((i+1) * 1000);

    (function(itemForTheDom,milliseconds) {
      setTimeout(function() { textDiv.text(''); }, milliseconds - 300);
      setTimeout(function() { textDiv.text(itemForTheDom); }, milliseconds);
    })(itemForTheDom, milliseconds);
  }
  
  (function(seconds) {
    setTimeout(function() { userAttempt() }, (seconds));
  })( (array.length+2) *1000);
}

function userAttempt() {
  $('#notification-text').text('Go');

  userCountdown(true);
  userTurn = true;
}

function checkInput(key) {
  userInput.push(key.which);
  console.log(directionKey[key.which]);

  for(var i = 0; i < userInput.length; i++) {
    if( directionKey[userInput[i]] == computerSequence[i]) {
      if (userInput.length == computerSequence.length) {
        return winRound();
      }
    } else {
      userCountdown(false);
      return loseGame();
    }
  }
}

function winRound() {
  console.log('YOU WIN')
  userCountdown(false);
  round ++;
  userInput = [];
  userTurn = false;
  startRoundCountDown();
}

function loseGame() {
  console.log(round);
  alert('you lose');
}

var endgameCountdown;

function userCountdown(boolean) {
  if( boolean == true) {
    userSeconds --;

    if (userSeconds > 0) {
      endgameCountdown = setTimeout(function() { userCountdown(true) }, 1000);
    } else {
      console.log('working?')
      userSeconds = 5;
      loseGame();
    }
  } else {
    userSeconds = 5;
    clearTimeout(endgameCountdown);
  }
}

$( document ).ready(function() {
  $('#play_button').bind('click', function() { startRoundCountDown() } );
  $(document).bind('keyup', function(key) { 
    if (userTurn == true) {
      checkInput(key);
    }
  });

});
