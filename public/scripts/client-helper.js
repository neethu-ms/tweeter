const findTime = function(postedTime) {
  const currentTime = Date.now();
  let difference = currentTime - postedTime;
  let time = (difference / (1000 * 60 * 60 * 24));  //Number of days
  let timeString = "";
  if (time >= 1) {
    timeString += time.toFixed() + " days ago";
    return timeString;
  }
  time = (difference / (1000 * 60 * 60));  //NUmber of hours
  if (time >= 1) {
    timeString += time.toFixed() + " hours ago";
    return timeString;
  }
  time = (difference / (1000 * 60));  //NUmber of minutes
  if (time >= 1) {
    timeString += time.toFixed() + "  minutes ago";
    return timeString;
  }
  time = (difference / (1000));  //NUmber of seconds
  if (time >= 1) {
    timeString += time.toFixed() + "  seconds ago";
    return timeString;
  }
  timeString = "Just Now";
  return timeString;
};

//validate tweets
const validateTweet = function(data) {
  if (!data.substring(5)) {
    $("#error").text('Invalid data. Please enter a value of length between 1 and 140');
    $("#error").show();
    return false;
  } else if (data.substring(5) === "") {
    $("#error").text('Tweet cannot be empty. Please enter a value of length between 1 and 140');
    $("#error").show();
    return false;
  } else if (data.substring(5).length > 140) {
    $("#error").text('Too long. Please enter a value of length between 1 and 140');
    $("#error").show();
    return false;
  }
  return true;
};