$(document).ready(function() {


  //Variables to maintain stats and for ease of use.
  var targetNumber = (Math.floor(Math.random() * (100)) + 20);
  var crystals = $("#crystals");
  var numberOptions = [];
  var imgArray = ["assets/images/blue-diamond.png", "assets/images/crystal.png", "assets/images/emerald.png", "assets/images/ruby.png"];
  var counter = 0;
  var wins = 0;
  var losses = 0;

  
//Generating the four random cryatal numbers.
  function crystalRandom() {
      var dozen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      shuffle(dozen);
      numberOptions = [dozen[0], dozen[1], dozen[2], dozen[3]];
    } 
  function shuffle(array) {
    let tab = array.length;

    while (tab > 0) {
        let index = Math.floor(Math.random() * tab);

        tab--;

        let temp = array[tab];
        array[tab] = array[index];
        array[index] = temp;
    }

    return array;
}

//Crates the functionality of the crystals by assigning the random numbers and displaying them properly. 
function displayCrystal() {
   for (var i = 0; i < numberOptions.length; i++) {

    var imageCrystal = $("<img>");
    imageCrystal.addClass("crystal-image");
    imageCrystal.attr("src", imgArray[i]);
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    crystals.append(imageCrystal).fadeIn(1000);
  }
}

//Displays the number-to-guess, user's counter, wins, and losses after the start of the game.
function displayStats() {
  $("#targetNumber").text("Number to Guess: " + targetNumber).css("display", "block");
  $("#player-score").text("Your Total: " + counter).css("display", "block");
  $("#wins").text("Wins: " + wins).css("display", "block");
  $("#losses").text("Losses: " + losses).css("display", "block");
}

//Modal if user wins.
function prospectorWin() {
  var modal = $('#myModal');
  $("#taunt").text("You won! Now cash in those gems!")
  modal.css("display", "block");
  setTimeout(function(){ modal.css("display", "none"); }, 2500);
}

//Modal if user loses.
function prospectorLose() {
  var modal = $('#myModal');
  $("#taunt").text("You lose! Give me those gems!")
  modal.css("display", "block");
  setTimeout(function(){ modal.css("display", "none"); }, 2500);
}

//Resets the game after a win or loss.
function newGame() {
    targetNumber = (Math.floor(Math.random() * (100)) + 20);
    counter = 0;
    numberOptions = [];
    $("#crystals").fadeOut(1000);
    $("#crystals, #number-to-guess").empty();
    crystalRandom();
    displayCrystal();
  }

//Start button functions by removing the directions and the button and revealing the stats and crystals.
  $("#startButton").on("click", function() {
    $("#directions").hide();
    $(this).hide();
     crystalRandom();
     displayCrystal();
     displayStats();
});

//Crystals' value added to counter when clicked and win/loss processes.
  crystals.on("click", ".crystal-image", function() {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);

    counter += crystalValue;

    if (counter === targetNumber) {
      wins++;
      prospectorWin();
      newGame();
    }

    else if (counter > targetNumber) {
      losses++;
      prospectorLose();
      newGame();
    }

    displayStats();
  });

});