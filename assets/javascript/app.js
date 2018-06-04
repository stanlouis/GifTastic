// Initial array
let topics = ["parrot", "dog", "lion", "turtle"];

let generateDomEl = function(results) {
  // Looping through each result item
  results.forEach(result => {
    // Creating and storing a div tag
    const nameDiv = $("<div class='col-md-4 bg-light card text-dark'>");

    // creating a title tag
    const titleEl = result.title.replace("GIF", "").trim();

    const title = $(
      '<h4 class="card-title text-capitalize text-center mt-2 mb-1">'
    ).text(titleEl);
    // Creating a paragraph tag with the result item's rating
    const p = $("<p class='card-text text-center'>").text(
      "Rating: " + result.rating
    );

    // Creating and storing an image tag
    const nameImage = $("<img class='card-img-bottom gif gif-style'>");
    // Setting the src attribute of the image to a property pulled off the result item
    nameImage.attr("src", result.images.fixed_height_still.url);
    // Add data attribute for still, state and animate
    nameImage.attr({
      "data-still": result.images.fixed_height_still.url,
      "data-animate": result.images.fixed_height.url,
      "data-state": "still"
    });

    // Appending the paragraph and image tag to the nameDiv
    nameDiv
      .append(title)
      .append(p)
      .append(nameImage);

    // Pre-pending the nameDiv to the HTML page in the "#gifs-appear-here" div
    $("#topics-view").prepend(nameDiv);
  });
};

function displayNameInfo() {
  let name = $(this).attr("data-name");
  // Storing our giphy API URL
  let giphyQueryURL = `https://api.giphy.com/v1/gifs/search?q=${name}&api_key=11CRvXftTpN39YgVEj92UDDmdFbg1JVi&limit=10`;

  // Clear nameDiv
  $("#topics-view").empty();

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: giphyQueryURL,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    // Creating a div to hold the name
    //  let nameDiv = $("<div class='card'>");

    generateDomEl(results);

    $(".gif").on("click", function() {
      let state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}

// Function for displaying buttons
function renderButtons() {
  // Deleting the topics prior to adding new topics
  $("#buttons-view").empty();

  // Adding a button with classes and data-attributes for each name
  topics.forEach(name => {
    const a = $("<button>");
    a.addClass("btn btn-info name-btn");
    a.attr("data-name", name);
    a.text(name);
    $("#buttons-view").append(a);
  });
}

// Event listener to receive input value for buttons
$("#add-name").on("click", event => {
  event.preventDefault();

  let input = $("#name-input");
  const name = input.val().trim();

  if (name === "") {
    alert("A name is required");
  } else if (!topics.includes(name)) {
    topics.push(name);
    input.val("");
  } else {
    input.val("");
    alert("Please provide another name");
  }

  // Calling renderButtons which handles the processing of our name array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "name-btn"
$(document).on("click", ".name-btn", displayNameInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();
