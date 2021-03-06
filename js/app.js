$(document).ready(function() {
	/*-- Declare variables -- */
	var count;
	var number;
	var userGuess;
	var prevGuess;
	var found = false;

	/*-- Start new game --*/
	newGame();

	$("form").submit(function(e) {
		e.preventDefault();
    	if (!found) {
    		prevGuess = userGuess;
			userGuess = $('#userGuess').val();
			clearGuess();
			setFocus();
			if (isNaN(userGuess) || userGuess < 1 || userGuess > 100 || userGuess%1 != 0) {
				setUserFeedback("Please enter a number between 1 and 100.");
			} else {
				if (count == 0){
					checkDifference(Math.abs(number - userGuess));
				} else {
					checkPreviousGuess(prevGuess, userGuess);
					//checkDifference(Math.abs(number - userGuess));
				}
				count++;
				setCount(count);
				$("ul#guessList").append("<li>" + userGuess + "</li>");
			};
		} else {
			setUserFeedback("You already won this game. Click 'New Game' to start another game.");
			clearGuess();
			setFocus();
		};
  	});

  	/*-- New game setup --*/
	function newGame() {
		count = 0;
		found = false;
		$("ul#guessList li").remove();
		setUserFeedback("Enter your guess.");
		setCount(count);
		number = genNumber(1, 100);
		clearGuess();
		setFocus();
	}

	/*-- Generate random number --*/
	function genNumber(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	/*-- Check the difference for cold feedback --*/
	function checkDifference(guessDifference) {
		if (guessDifference == 0) {
			setUserFeedback("You guessed the correct number!");
			found = true;
		} else if (guessDifference <= 5) {
			setUserFeedback("Your Guess is getting very hot!");
		} else if (guessDifference <= 10){
			setUserFeedback("Your Guess is getting hot!");
		} else if (guessDifference <= 20) {
			setUserFeedback("Your Guess is getting Warm!");
		} else if (guessDifference <= 30) {
			setUserFeedback("Your Guess is getting cold!");
		} else if (guessDifference <= 40) {
			setUserFeedback("Your Guess is getting very cold!");
		} else {
			setUserFeedback("Your Guess is ice cold!");
		}
	}

	/*-- check if the new guess is closer or farther from previous guess --*/
	function checkPreviousGuess(prevGuess, userGuess) {
		if (Math.abs(number - userGuess) == 0) {
			setUserFeedback("You guessed the correct number!");
			found = true;
		} else if (Math.abs(number - userGuess) <= Math.abs(number - prevGuess)) {
			setUserFeedback("Your Guess is now warmer!");
		} else {
			setUserFeedback("Your Guess is now colder!");
		}
	}

	/*-- Set the feedback --*/
	function setUserFeedback(feedback) {
		$('#feedback').text(feedback);
	}

	/*-- Set focus to the inputbox --*/
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/*-- Clear the guess text box --*/
	function clearGuess() {
		$('#userGuess').val('');
	}

	/*-- Set the user guess count --*/
	function setCount(count) {
		$('#count').text(count);
	}

	/*-- Display information modal box --*/
  	$(".what").click(function() {
    	$(".overlay").fadeIn(1000);
  	});

  	/*-- Hide information modal box --*/
  	$("a.close").click(function() {
  		$(".overlay").fadeOut(1000);
  	});

  	/*-- New game button --*/
  	$(".new").click(function(e) {
  		e.preventDefault();
  		newGame();
  	});
});