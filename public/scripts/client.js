
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const findNumberOfDays = function (postedTime) {
  const currentTime = Date.now();
  let difference = currentTime - postedTime;
  let days = (difference / (1000 * 60 * 60 * 24)).toFixed();
  return days;
};

const renderTweets = function (tweets) {
  // loops through tweets
  console.log('rendering');
  console.log('rendering');
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    let createdTweet = createTweetElement(tweet);
    console.log("createdTweet=", $(createdTweet).text);
    console.log($(createdTweet));
    $("#tweetContainer").append(createdTweet);
  }

};

const createTweetElement = function (tweet) {

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


const postTweets = function () {
  $("form").on("submit", function (event) {

    event.preventDefault();
    const data = $(this).serialize();
    if (data.substring(5) === undefined || data.substring(5) === null) {
      alert('Invalid data. Please enter a value of length between 1 and 140');
      return;
    } else if (data.substring(5) === "") {
      alert('Tweet cannot be empty. Please enter a value of length between 1 and 140');
      return;
    } else if (data.substring(5).length >= 140) {
      alert('Too long. Please enter a value of length between 1 and 140');
      return;
    }


    //console.log("this",$(this).serialize());

    const url = "/tweets";



    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: (data) => loadtweets()
    });


  });

};

const loadtweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: renderTweets,
    dataType: "json"
  });
};

$(document).ready(() => {
  loadtweets();
  postTweets();
});
