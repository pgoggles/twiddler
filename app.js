$(document).ready(function(){
  // defining elements to be used across multiple functions
  var $app = $('#app');
  $app.html('')
  var $flexbox = $('<div class="flexbox"></div>');
  var $buttonFlex = $('<div class="buttonFlex"></div>');
  $updateButton = $('<div class="updateButton"></div>');

  // defining functions to create page
  var createHeader = function() {
    var $header = $('<div class="header"></div>');
    var $title = $('<div class="title"></div>');
    $title.text ('Twiddler');
    $title.appendTo($header)
    var $subheading = $('<div class="subheading"></div>');
    $subheading.text ('A HACK REACTOR APPLICATION');
    $subheading.appendTo($header);
    $header.appendTo($app);
  };

  var createHomeButton = function() {
    var $homeButton = $('<div class="homeButton"></div>');
    $homeButton.text('Home');
    $homeButton.appendTo($buttonFlex);
    $buttonFlex.appendTo($app);
  };

  var createUpdateButton = function() {
    $updateButton.text('Update Feed');
    $updateButton.appendTo($buttonFlex);
    $buttonFlex.appendTo($app);
  };

var createFirstPanel = function () {
  var $firstPanel = $('<div class="firstPanel"></div>')
  $friendsList = createFriendsList();
  $submissionForm = createSubmissionForm();
  $friendsList.appendTo($firstPanel);
  $submissionForm.appendTo($firstPanel);
  $firstPanel.appendTo($flexbox);
}
var createFriendsList = function() {
  var $friendsList = $('<div class="friendsList"></div>')
  var $friendsListTitle = $('<div class="friendsListTitle">Friends List</div>')
  $friendsListTitle.appendTo($friendsList)
  for (user in streams.users) {
    username = user;
    var $friend = $('<li></li>');
    $friend.text('@' + username);
    $friend.appendTo($friendsList)
  }
  return $friendsList;
}

var createSubmissionForm = function () {
  var $submissionForm = $('<div class="submissionForm"></div>');
  var $username = $('<div class="username">User Name:</div>');
  var $userSubmit = $('<input type="text" class="userSubmit" />');
  var $message = $('<div class="message">Message:</div>');
  var $messageSubmit = $('<input type="text" class="messageSubmit" />');
  var $submitButton = $('<div class="submitButton"></div>');
  $username.appendTo($submissionForm);
  $userSubmit.appendTo($submissionForm);
  $message.appendTo($submissionForm);
  $messageSubmit.appendTo($submissionForm);
  $submitButton.text('Submit Tweet').appendTo($submissionForm);
  return $submissionForm;
};

var renderFeed = function(user){
  if (arguments.length === 0) {
    stream = streams['home'];
    buttonText = 'Update Feed';
  } else {
    stream = streams['users'][user];
    buttonText = 'Back'
  }
  var index = stream.length - 1;
  $( ".allTweets" ).remove();
  var $allTweets = $('<div class="allTweets"></div>');
  while(index >= 0){
    var $upperTweet = $('<div class="upperTweet"></div>');
    var tweet = stream[index];
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<div class="profile-photo"><img src ="' + tweet.profilePhotoURL + '"></div>');
    $profilePhoto.appendTo($upperTweet);
    var $userInfo =  $('<div class="userInfo"></div>');
    var $username = $('<div class="username"></div>');
    $username.text('@' + tweet.user).appendTo($userInfo);
    var $timeago = $('<div class="timeago"></div>');
    $timeago.text(jQuery.timeago(stream[index]["created_at"])).appendTo($userInfo)
    $userInfo.appendTo($upperTweet)
    var $message = $('<div class="message"></div>');
    $message.text(tweet.message);
    var $icons = $('<div class="icons"></div>');
    var $like = $('<div class="icon like"><i class="fas fa-heart"></i></div>');
    var $retweet = $('<div class="icon retweet"><i class="fas fa-retweet"></i></div>');
    var $share = $('<div class="icon share"><i class="fas fa-share"></i></div>');
    var $comment = $('<div class="icon comment"><i class="fas fa-comments"></i></div>');
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $upperTweet.appendTo($tweet);
    $message.appendTo($tweet);
    $icons.appendTo($tweet);
    $tweet.appendTo($allTweets);
    index -= 1;
  }
  $allTweets.appendTo($flexbox);
};

var appendFlexbox = function () {
  $flexbox.appendTo($app);
}

var handleUsernameClick = function () {
  if ($updateButton[0].innerHTML === 'Update Feed') {
    $updateButton.text('Back');
  }
};

var handleButtonClick = function () {
  if ($updateButton[0].innerHTML === 'Back') {
    $updateButton.text('Update Feed');
  }
};

// calling functions to draw initial page
  createHeader();
  createHomeButton();
  createUpdateButton();
  createFirstPanel();
  renderFeed();
  appendFlexbox();

// defining clickable buttons
  $("#app").on('click', '.updateButton', function() {
    renderFeed();
    handleButtonClick();
  });

  $("#app").on('click', '.homeButton', function() {
    renderFeed();
    handleButtonClick();
  });

  $("#app").on('click', '.username', function(element) {
    renderFeed(element.toElement.innerHTML.replace('@', ''));
    handleUsernameClick();
  });

  $("#app").on('click', '.friendsList li', function(element) {
    renderFeed(element.toElement.innerHTML.replace('@', ''));
    handleUsernameClick();
  });

  $("#app").on('click', '.profile-photo', function(element) {
    renderFeed(element.toElement.outerHTML.replace('<img src="./assets/img/', '').replace('.png">', ''));
    handleUsernameClick();
  });
});