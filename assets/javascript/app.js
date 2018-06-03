// Initial array of animals
let animals = ["parrot", "dog", "lion", "turtle"];

let generateDomEl = function(results) {
  // Looping through each result item
  results.forEach(result => {
    // Creating and storing a div tag
    const animalDiv = $("<div class='col-md-4 bg-light card text-dark'>");

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
    const animalImage = $("<img class='card-img-bottom gif gif-style'>");
    // Setting the src attribute of the image to a property pulled off the result item
    animalImage.attr("src", result.images.fixed_height_still.url);
    // Add data attribute for still, state and animate
    animalImage.attr({
      "data-still": result.images.fixed_height_still.url,
      "data-animate": result.images.fixed_height.url,
      "data-state": "still"
    });

    // Appending the paragraph and image tag to the animalDiv
    animalDiv
      .append(title)
      .append(p)
      .append(animalImage);

    // Pre-pending the animalDiv to the HTML page in the "#gifs-appear-here" div
    $("#animals-view").prepend(animalDiv);
  });
};

function displayAnimalInfo() {
  let animal = $(this).attr("data-name");
  // Storing our giphy API URL
  let giphyQueryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=11CRvXftTpN39YgVEj92UDDmdFbg1JVi&limit=10`;

  // Clear animalDiv
  $("#animals-view").empty();

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: giphyQueryURL,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    // Creating a div to hold the animal
    //  let animalDiv = $("<div class='card'>");

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
  // Deleting the animals prior to adding new animals
  $("#buttons-view").empty();

  // Adding a button with classes and data-attributes for each animal
  animals.forEach(animal => {
    const a = $("<button>");
    a.addClass("btn btn-info animal-btn");
    a.attr("data-name", animal);
    a.text(animal);
    $("#buttons-view").append(a);
  });
}

// Event listener to receive input value for buttons
$("#add-animal").on("click", event => {
  event.preventDefault();

  let input = $("#animal-input");
  const animal = input.val().trim();

  if (!animals.includes(animal)) {
    animals.push(animal);
    input.val("");
  } else {
    input.val("");
    alert("Please provide another name");
  }

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();
