$(document).ready(function() {

var targetNumber = (Math.floor(Math.random() * (100)) + 20);
console.log(targetNumber);

  var crystals = $("#crystals");

  var numberOptions = [];

  var imgArray = ["assets/images/blue-diamond.png", "assets/images/crystal.png", "assets/images/emerald.png", "assets/images/ruby.png"];

  var counter = 0;

  var wins = 0;

  var losses = 0;


//   $("#number-to-guess, #player-score, #wins, #losses").hide();

  

  function crystalRandom() {
      var dozen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      shuffle(dozen);
      numberOptions = [dozen[0], dozen[1], dozen[2], dozen[3]];
      console.log(numberOptions);
    } 
  function shuffle(array) {
    let tab = array.length;

    // While there are elements in the array
    while (tab > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * tab);

        // Decrease counter by 1
        tab--;

        // And swap the last element with it
        let temp = array[tab];
        array[tab] = array[index];
        array[index] = temp;
    }

    return array;
}

function displayCrystal() {
    // $("#number-to-guess").text(targetNumber);

  for (var i = 0; i < numberOptions.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", imgArray[i]);

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    crystals.append(imageCrystal).fadeIn(1000);
  }
}

function displayStats() {
  $("#targetNumber").text("Number to Guess: " + targetNumber).css("display", "block");
  $("#player-score").text("Your Total: " + counter).css("display", "block");
  $("#wins").text("Wins: " + wins).css("display", "block");
  $("#losses").text("Losses: " + losses).css("display", "block");
}

function newGame() {
    targetNumber = (Math.floor(Math.random() * (100)) + 20);
    counter = 0;
    numberOptions = [];
    $("#crystals").fadeOut(1000);
    $("#crystals, #number-to-guess").empty();
    crystalRandom();
    displayCrystal();
  }

  $("#startButton").on("click", function() {
    $("#directions").hide();
    $(this).hide();
     crystalRandom();
     displayCrystal();
    //  $("#targetNumber").text("Number to Guess: " + targetNumber);
     displayStats();
    //  $("#player-score").text("Your Total: " + counter);
    //  $("#wins").text("Wins: " + wins);
    //  $("#losses").text("Losses: " + losses);
});



  crystals.on("click", ".crystal-image", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);

    counter += crystalValue;
    console.log(counter);

    if (counter === targetNumber) {
      wins++;
      newGame();
    }

    else if (counter > targetNumber) {
      losses++;
      newGame();
    }

    displayStats();

    // $("#player-score").text(counter);
    // $("#wins").text(wins);
    // $("#losses").text(losses);

  });

});