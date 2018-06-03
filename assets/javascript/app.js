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

// Calling the renderButtons function to display the initial buttons
renderButtons();
