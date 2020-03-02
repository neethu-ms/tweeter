const findNumberOfDays = function(postedTime) {
  const currentTime = Date.now();
  let difference = currentTime - postedTime;
  let days = (difference / (1000 * 60 * 60 * 24)).toFixed();
  return days;
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