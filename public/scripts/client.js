
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//Rendering tweets
const renderTweets = function(tweets) {
  // loops through tweets
  $("#tweet-container").empty();
  // sorting tweets based on created
  tweets.sort((a, b) => {
    return b['created_at'] - a['created_at'];
  });
  for (let tweet of tweets) {
    let createdTweet = createTweetElement(tweet);

    $("#tweet-container").append(createdTweet);
  }
};

// Creating html code for tweet
const createTweetElement = function(tweet) {
  let daysAgo = findTime(tweet['created_at']);
  const article = `<article class="tweet"> 
  <header>
<div class="image-details">
  <img src="${tweet["user"].avatars}" height="100px" width="100px">
	<p>${tweet["user"].name}</p>
	</div>
	<p class="tweet-id">${tweet["user"].handle}</p>
	</header>
	<div class="tweet-message"> 
	<p>${tweet["content"]["text"]}</p>
	<hr/>
	</div>  
  <footer class="footer-details">
	<p>${daysAgo}</p>
	<div>
	<i class="fa fa-flag"></i>
	<i class="fa fa-retweet"></i>
	<i class="fa fa-heart"></i>
	</div>
	</footer>
 </article>`;
  return article;
};

// post tweets
const postTweets = function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $("#error").hide();
    //Doing validations 
    if (!validateTweet(data)) {
      return;
    }
    const url = "/tweets";
    $(".new-tweet").slideUp();
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: (data) => {
        loadtweets(); $("new-tweet").slideUp();
        $("textarea").val('');
        $(".counter").text(140);
        $(".counter").css("color", "black");

      }
    });
  });
};

//Load tweets
const loadtweets = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: renderTweets,
    dataType: "json"
  });
};

//Toggling function
const toggle = function() {
  $(".new-tweet").slideUp();
  $("#toggle-button").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".counter").text(140);
    $("textarea").val('');
    $("textarea").focus();
    $(".counter").css("color", "black");
    $("#error").hide();
  }
  );
};
// Functions to be called after document is ready
$(document).ready(() => {
  loadtweets();
  postTweets();
  toggle();
});