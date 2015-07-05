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
function startGameCountDown() {
  var notifications = $('#notifications')
  var textDiv = $('#notification-text');
  
  //make visible
  setTimeout(function() { notifications.toggle(); 
                          textDiv.text(3); }, 1000);
  setTimeout(function() { textDiv.text(2); }, 2000);
  setTimeout(function() { textDiv.text(1); }, 3000);
  setTimeout(function() { textDiv.text('Go')}, 4000)

  // hide
  setTimeout(function() { notifications.toggle() }, 5000)
}

$( document ).ready(function() {
  startGameCountDown();
});
