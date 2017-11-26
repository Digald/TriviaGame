$(document).ready(function() {

    // varibles for each screen 
    var startGame = $("#startGame");
    var gameForm = $("#multipleChoice");
    var transitionPage = $("#transitionPage");
    var endScreen = $("#endScreen");

    // turn different screens on or off for development
    startGame.show();
    gameForm.hide();
    transitionPage.hide();
    endScreen.hide();

    // variables for questions and answers
    var questions = ["Who bears the title of 'The Thunder's Roar'?",
        "What champion does NOT have a blind?",
        "What creature was Ahri before her human transformation?",
        "What little animals can we see in the Howling Abyss?",
        "Who is the most hated champion in League of Legends?"
    ];

    var answers = [
        ["Volibear", "Shyvana", "Kennen", "Rengar"],
        ["Lee Sin", "Teemo", "Sona", "Quinn"],
        ["Fox", "Poro", "Frog", "Golem"],
        ["Teemos", "Wolves", "Poros", "Cats"],
        ["Skarner", "Lulu", "Bard", "Teemo"]
    ];
    var correctAnswer = [0, 2, 0, 2, 3];
    var chosenAnswer;

    // time varibles and functions
    var slideCount = 0;
    var countdown;
    var intervalId;
    var correct = 0;
    var wrong = 0;
    var result;
    // stops the current countdown
    function stop() {
        clearInterval(intervalId);
    }
    // counts down the timer. when it hits zero, it stops and moves on
    function questionTimer() {
    	countdown = 30;
        intervalId = setInterval(questionCount, 1000);

        function questionCount() {
            if (countdown === 0) {
                stop();
                gameForm.hide();
                transitionPage.show();
            }
            if (countdown > 0) {
                countdown--;
            }
            $("#timeleft").html(countdown);
        }
    }

    function transitionTimer() {
    	countdown = 5;
    	intervalId = setInterval(transitionCount, 1000);

    	function transitionCount() {
    		if (countdown === 0 ){
    			stop();
    			transitionPage.hide();
    			gameForm.show();
    		}

    		if (countdown > 0) {
    			countdown--;
    		}
    		$("#toNextQuestion").html(countdown);
    	}
    }

    function questionHTML() {
    	$("#question").html(questions[slideCount]);
    	$("#choice1").html(answers[slideCount][0]);
    	$("#choice2").html(answers[slideCount][1]);
    	$("#choice3").html(answers[slideCount][2]);
    	$("#choice4").html(answers[slideCount][3]);
    }

    function transitionHTML() {
    	$("#result").html(result);
    	$("correctAns").html(answers[slideCount][correctAnswer[slideCount]]);
    }

    // From start screen, start game
    $("#startBtn").click(function() {
        startGame.hide();
        gameForm.show();
        questionTimer();
        questionHTML();
    });

    // pick from the answer choices
    $(".answer").click(function() {
    	chosenAnswer = $(this).text();
    	console.log(chosenAnswer);
    	if (chosenAnswer === answers[slideCount][correctAnswer[slideCount]]) {
    		stop();
    		isCorrect();
    	} else {
    		stop();
    		isWrong();
    	}
    });

    // score functions
    function isCorrect() {
    	result = "Correct!";
    	correct++;
    	transitionTimer();
    	gameForm.hide();
    	transitionPage.show();
    	transitionHTML();
    }

    function isWrong() {
    	wrong--;
    	transitionTimer();
    	gameForm.hide();
    	transitionPage.show();
    }


});