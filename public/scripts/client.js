
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const findNumberOfDays = function(postedTime) {
  const currentTime = Date.now();
  let difference = currentTime - postedTime;
  let days = (difference / (1000 * 60 * 60 * 24)).toFixed();
  return days;
};



//Rendering tweets
const renderTweets = function(tweets) {
  // loops through tweets
  $("#tweetContainer").empty();


  // sorting tweets based on created
  tweets.sort((a, b) => {
    return b['created_at'] - a['created_at'];
  });


  for (let tweet of tweets) {
    let createdTweet = createTweetElement(tweet);

    $("#tweetContainer").append(createdTweet);
  }

};

// Creating html code for tweet
const createTweetElement = function(tweet) {
  let $article = $('<article></article>');
  let $header = $('<header></header>');
  let $divImage = $("<div></div>");
  let $pImage = $("<p></p>");
  let $pTweetId = $("<p></p>");
  let $divTweetBody = $("<div></div>");
  let $pTweetMessage = $("<p></p>");
  let $i = $('<i class="fa fa-flag"></i> <i class="fa fa-retweet"></i><i class="fa fa-heart"></i>');
  let $footer = $("<footer></footer>");
  let $pFooter = $("<p></p>");
  let $divFooter = $("<div></div>");
  let $img = $(`<img src="${tweet["user"].avatars}" height="100px" width="100px">`);
  let $hr = $("<hr/>");
  let daysAgo = findNumberOfDays(tweet['created_at']);
  let daysAgoContent = `${daysAgo} days ago`;
  $article.addClass("tweet");
  $article.append($header);
  $divImage.addClass('image-details');
  $header.append($divImage);
  $divImage.append($img);
  $pImage.text(tweet["user"].name);
  $divImage.append($pImage);
  $pTweetId.addClass("tweetId");
  $pTweetId.text(tweet["user"].handle);
  $header.append($pTweetId);
  $divTweetBody.addClass('tweetMessage');
  $pTweetMessage.text(tweet["content"]["text"]);
  $divTweetBody.append($pTweetMessage);
  $divTweetBody.append($hr);
  $article.append($divTweetBody);
  $pFooter.text(daysAgoContent);
  $footer.append($pFooter);
  $divFooter.append($i);
  $footer.append($divFooter);
  $article.append($footer);


  return $article;
};

// post tweets
const postTweets = function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $("#error").hide();
    /* Doing validations */
    if (data.substring(5) === undefined || data.substring(5) === null) {
      $("#error").text('Invalid data. Please enter a value of length between 1 and 140');
      $("#error").show();
      return;
    } else if (data.substring(5) === "") {
      $("#error").text('Tweet cannot be empty. Please enter a value of length between 1 and 140');
      $("#error").show();
      return;
    } else if (data.substring(5).length >= 140) {
      $("#error").text('Too long. Please enter a value of length between 1 and 140');
      $("#error").show();
      return;
    }
    /* Doing validations */

    const url = "/tweets";
    $(".new-tweet").slideUp();
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: (data) => {
        loadtweets(); $("new-tweet").slideUp();
        $("textarea").val('');
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
  $("#toggleButton").click(() =>
    $(".new-tweet").slideToggle("slow")
  );
};


// Functions to be called after document is ready
$(document).ready(() => {
  loadtweets();
  postTweets();
  toggle();
});
