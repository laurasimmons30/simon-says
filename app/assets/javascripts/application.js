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

// turn off scrolling on the page
$('html, body').css({
    'overflow': 'hidden',
    'height': '100%'
});

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

var colorKey = new Object();
colorKey['▲'] = '#4bd813';
colorKey['▼'] = '#023ded';
colorKey['◄'] = '#f7f72c';
colorKey['►'] = 'red';

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
  var gameBoard = $('#gameBoard');
  var textDiv = $('#gameBoard-text');
  var startMenu = $('#start_menu');
  textDiv.css('font-size', '21em');

  //make visible  
  setTimeout(function() { gameBoard.show();
                          $('.start_menu_text').hide();
                          startMenu.hide();
                          textDiv.text(3); }, 1000);
  setTimeout(function() { textDiv.text(2); }, 2000);
  setTimeout(function() { textDiv.text(1); }, 3000);

  setTimeout(function() { textDiv.text('');
                          startRound(); }, 4000);
}

function startRound() {
  computerSequence.push(computerOptions.randomElement());
  displaySequence(computerSequence);
}

function displaySequence(array) {
  var textDiv = $('#gameBoard-text');
  textDiv.css('font-size', '21em');

  for (var i = 0; i < array.length; i++) {
    var itemForTheDom = displayKey[array[i]];
    var milliseconds = ((i+1) * 1000);

    (function(itemForTheDom,milliseconds) {
      setTimeout(function() { textDiv.css('color', colorKey[itemForTheDom]);
                              textDiv.text(''); }, milliseconds - 300);
      setTimeout(function() { textDiv.text(itemForTheDom); }, milliseconds);
    })(itemForTheDom, milliseconds);
  }
  
  (function(seconds) {
    setTimeout(function() { textDiv.css('color', 'white'); userAttempt() }, (seconds));
  })( (array.length+2) *1000);
}

function userAttempt() {
  $('#gameBoard-text').css("font-size", "9em");
  $('#gameBoard-text').text('Your Turn');
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
  round ++;
  clearForNextRound();
  startRoundCountDown();
}
function clearForNextRound() {
  userCountdown(false);
  userInput = [];
  userTurn = false;
  $('#gameBoard-text').text('');
}

function loseGame() {
  clearForNextRound();
  computerSequence = createSequence(2);
  $('.start_menu_text').text('');
  $('#gameBoard').hide();
  $('.start_menu_text').text('You completed ' + round + ' rounds! Try again?');
  $('#start_menu').show();
  $('.start_menu_text').show();
}

var endgameCountdown;

function userCountdown(boolean) {
  if( boolean == true) {
    userSeconds --;

    if (userSeconds > 0) {
      endgameCountdown = setTimeout(function() { userCountdown(true) }, 1000);
    } else {
      userSeconds = 5;
      loseGame();
    }
  } else {
    userSeconds = 5;
    clearTimeout(endgameCountdown);
  }
}

$( document ).ready(function() {
  $('#play_button').bind('click', function() { round = 1; startRoundCountDown() } );
  $(document).bind('keyup', function(key) { 
    if (userTurn == true) {
      checkInput(key);
    }
  });
});
