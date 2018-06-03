// Initial array of animals
let animals = ["parrot", "dog", "lion", "turtle"];

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

// Calling the renderButtons function to display the initial buttons
renderButtons();
