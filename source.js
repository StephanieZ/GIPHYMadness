
var topics = ["bears", "tigers", "lions", "horses"];

function buildQueryURL(searchText) {
  // queryURL is the url we'll use to query the API
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=juHWER0dFfSC82OGCo1xW4c0RaF1BGqQ&limit=10";

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL
}

function clear() { 
  $("#animal-buttons").empty();
  $("#animal-buttons").removeClass("active");
  
}


function populateButtons() {
  
  clear();
  topics.forEach(element => {

    var button = $("<button>").text(element);
    button.attr("data-type", element);
    button.addClass("animal-button");
    button.addClass("btn btn-primary btn-lg border-white")
    $("#animal-buttons").append(button);

  });
}

$(document).on("click", ".animal-button", function() {
  $("#animals").empty();
  $(this).addClass("active");

  var queryURL = buildQueryURL(this.innerText);
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var animalRow = $("<tr class=\"animal-item\">");

      var rating = results[i].rating;

      var td = $("<td>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          var animalTd = $("<td>");
          animalTd.append(animalImage);

          animalRow.append(td);
          animalRow.append(animalTd);

          $("#animals").append(animalRow);

    }
  });
});

$(document).on("click", ".animal-image", function() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var newAnimal = $("input").eq(0).val();

  if (newAnimal.length > 2) {
    topics.push(newAnimal);
  }

  populateButtons();

});

populateButtons();

