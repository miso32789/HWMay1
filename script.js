$('#start').on('click', function () {
    $('#subWrapper').remove();
    $('#timersection').html("");
    game.start();

})

let questions = [{
    question: 'Who is the first Black President?',
    answers: ['Bill CLinton', 'Barack Obama', 'George Washington', 'I do not know'],
    correctAnswer: 'Barack Obama',
},
{

    question: 'Who is the first Black Supreme Court Justice?',
    answers: ['Thurgood Marshall', 'Clarence Thomas', 'Ketanji B. Jackson', 'George Washington'],
    correctAnswer: 'Thurgood Marshall',
},
{
    question: 'Who is the first Black Senator?',
    answers: ['Barack Obama', 'Blanche K. Bruce', 'Hiram Rhodes Revels', 'Edward Brooke'],
    correctAnswer: 'Hiram Rhodes Revels',
},
{
    question: 'Who is the first Black Self-Made Millionaire?',
    answers: ['Martin Luther King', 'Madame CJ Walker', 'Oprah Winfrey', 'Michael Jordan'],
    correctAnswer: 'Madame CJ Walker',
},
{
    question: 'Who is the first Black Billionaire?',
    answers: ['Oprah Winfrey', 'Michael Jordan', 'Barack Obama', 'Robert Johnson'],
    correctAnswer: 'Barack Obama',
}
];

let game = {
    correct: 0,
    incorrect: 0,
    counter: 50,
    questionnum: 0,

    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter)
        if (game.counter <= 0) {
            console.log("Time is up!")
            clearInterval(timer);
            game.done();
        }

    },

    start: function () {

        $('#timersection').append("<h2> Time Remaining: <span id= counter>50</span><span> seconds</span></h2>");
        timer = setInterval(game.countdown, 1000)
        game.showquestions()
    },
    showquestions: function () {
        //console.log (game.questionnum, questions.length)
        
        const currentquestion=questions[game.questionnum];
        $('#questions').html(currentquestion.question)
        
        for (let i=0; i < currentquestion.answers.length; i++){
            const button= $('<button></button>')
            $('#questions').append(button)
            button.text(currentquestion.answers[i])
            button.click(function (e){
                if(currentquestion.correctAnswer == currentquestion.answers[i]){
                    game.correct++
                } else {
                    game.counter -=5;        
                }
                game.questionnum++;
                if (game.questionnum >= questions.length){
                    game.done();
                    //console.log ("The End")
                } else {
                    game.showquestions();
                }
            })
        }

    },
    done: function () { 
        clearInterval(timer)
        $('#questions').html("")
        $('#timersection').html("");
        $('#scoreboard').append("<h3> The End! </h3>")
        $('#scoreboard').append("<h3> Score:" + game.correct + "/" +questions.length+"</h3>")
        //$('#scoreboard').append("<h3> Scoreboard, "+this.result+ "</h3>")
        let scores= game.getScores();
        const scoreList= $('<ol></ol>')
        const initials= prompt("What are your initials?")
        scores.push(game.correct +" - " + initials)
        scores.sort(function(a, b) {return b - a;});
        game.setScores(scores)
        $('#scoreboard').append(scoreList)
        for (let i=0; i < scores.length; i++){
            scoreList.append("<li>"+ scores[i] + "</li>")
            /*const li= $('<li></li>')
            $('#').append(button)
            li.text(scoreList[i])
            // [i]means pulling the (i+1)th out of the array */
        }
    },

    getScores: function () {
        let scores = localStorage.getItem("scores")?.split(",")
        if (!scores){
            scores= []
            //console.log ("I have no scores!")
        }
        return scores  
    },

    setScores: function (scores) {
        localStorage.setItem ("scores", scores.join(","))
    }
 
}