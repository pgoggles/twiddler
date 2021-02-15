$(document).ready(function(){
  var $app = $('#app');
  $app.html('')
  var createHeader = function() {
    var $header = $('<div class="header"></div>');
    $header.text ('Twiddler');
    $header.appendTo($app)
    var $subheading = $('<div class="subheading"></div>');
    $subheading.text ('A HACK REACTOR APPLICATION');
    $subheading.appendTo($app);
  };

var renderFeed = function(user){
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $profilePicture = $('<div class="profilePicture"><img src ="' + tweet.profilePhotoURL + '"></div>');
    var $username = $('<div class="username"></div>');
    var $message = $('<div class="message"></div>');
    var $time = $('<div class="timeago"></div>');
    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $profilePicture.appendTo($tweet)
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $tweet.appendTo($app);
    index -= 1;
  }
};

  createHeader();

  var $updateButton = $('<div class="updateButton"></div>');
$updateButton.text('Update Feed');
$updateButton.appendTo($app);


  $( "#app .updateButton" ).click(function() {
  renderFeed();
});

  renderFeed();

});

