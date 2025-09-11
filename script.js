// [] creates a list (database_1 is the list)
// {} crates a dictionary with key-value pairs inside

const database_1 = [
    {
        question: "What is the capital of Japan?",
        options: ["Osaka", "Tokyo", "Nagasaki", "Sapporo"],
        answer: "Tokyo",
    },

    {
        question: "When was the video game - Brawl Stars invented?",
        options: ["June 15 2017", "July 15 2018", "June 16 2017", "July 16 2018"],
        answer: "June 15 2017",
    },

    {
        question: "How salty is the Dead Sea approximately equals?",
        options: ["34.5", "33.3", "35.1", "34.2"],
        answer: "34.2",
    },

    {
        question: "What is 12345679 🇽 81?",
        options: ["984 758 389", "999 999 999", "888 888 889", "987 654 329"],
        answer: "999 999 999",
    },

    {
        question: "Who is the first person to walk on the moon?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Pete Conrad", "Baalan Beanraúna"],
        answer: "Neil Armstrong",
    },

    {
        question: "What is the best secret brainrot in the game - Steal A Brainrot?",
        options: ["Gray Puss", "Pot Hotspot", "Tortuginni Dragonfruitini", "Chicleteira Bicicleteira"],
        answer: "Grey Puss",
    },

    {
        question: "In the game - Grow a Garden, how many mutations can a carrot get?",
        options: ["9", "1", "unlimited", "100"],
        answer: "unlimited",
    },
];

const StartButton = document.getElementById("start-button");
const DropDown = document.getElementById("drop-down");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById("question");
const ProgressBar = document.getElementById("progress-bar-fill");
const OptionContainer = document.getElementById("option-container");
const ScoreLabel = document.getElementById('score-label');
const FeedbackLabel = document.getElementById("feedback-label");
const BgmSelector = document.getElementById("bgm-selector");
const MusicToggle = document.getElementById("music-toggle-btn");
const ProgressBarContainer = document.getElementById("progress-bar-bg");
const Timer = document.getElementById("timer");

let BgmAudio = null;
let IsMusicPlaying = false;
MusicToggle.textContent = " 🔇Music Off 😑😑😑";


MusicToggle.addEventListener("click", () => {
    if(IsMusicPlaying) 
    {
        BgmAudio.pause();
        MusicToggle.textContent = " 🔇Music Off 😑😑😑";
        IsMusicPlaying = false;
    } else 
    {
        BgmAudio.play();
        MusicToggle.textContent = "🕪 Music On 😆😆😆";
        IsMusicPlaying = true;
    }
});


// When a new BGM is selected
BgmSelector.addEventListener("change", () => {
  
    const SelectedSong = BgmSelector.value;

    // quit the function if the song cannot be found
    if(!SelectedSong) return; 

    // Stop and reset previous audio if it exists
    if(BgmAudio)
    {
        BgmAudio.pause();
        BgmAudio.currentTime = 0;
    }

    // Create a new audio instance and load the music
    BgmAudio = new Audio(SelectedSong);
    BgmAudio.loop = true;
    BgmAudio.volume = 0.2;
    BgmAudio.play();
    IsMusicPlaying = true;
    MusicToggle.textContent = "🕪 Music On 😆😆😆";
});

let timer;
let question_index = 0;
let score = 0;

StartButton.addEventListener('click', StartQuiz);

function StartQuiz()
{
    StartButton.style.display = "none";
    DropDown.style.display = 'none';
    LoadQuestion();
}

function LoadQuestion()
{
    // check if there are questions that still havent yet been loaded
    if(question_index < database_1.length)
    {
        // Set intial timer countdown value
        TimerLabel.textContent = 10;

        // clear feedbacklabel
        FeedbackLabel.textContent = "";

        // adjust progress bar's width
        ProgressBar.style.width = `${((question_index + 1) / database_1.length) * 100}%`;

        // load a question from the database
        const CurrentQuestionSet = database_1[question_index];

        QuestionLabel.textContent = CurrentQuestionSet.question;

        // remove previous option buttons
        OptionContainer.innerHTML = '';

        // Clone 4 options buttons before timer starts
        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('option-btn')
            OptionContainer.appendChild(button);
            button.addEventListener('click', () => {
                DisableAllOptionButton();
                CheckAnswer(item);
            });
        });

        // build and kickstart the timer
        timer = setInterval(() => {
            TimerLabel.textContent = parseInt(TimerLabel.textContent) -1;

            if(parseInt(TimerLabel.textContent) === 0)
            {
                clearInterval(timer); // reset timer
                ShowFeedback(null);
            }

        }, 1000);
    } else
    {
        EndQuiz();
    }
}

function EndQuiz()
{
    clearInterval(timer);
    OptionContainer.style.display = 'none';   // to hide
    ProgressBarContainer.style.display = 'none';
    Timer.style.display = 'none';
    FeedbackLabel.style.display = 'none';
    QuestionLabel.textContent = "Hooray! Quiz has ended!!!🥳"
}

function DisableAllOptionButton()
{
    const all_option_buttons = document.querySelectorAll('.option-btn');
    all_option_buttons.forEach(button => {
        button.disabled = true;
    })
}

// item -> the selected option
function CheckAnswer(item)
{
    const actual_ans = database_1[question_index].answer;

    if(item === actual_ans)
    {
        score = score + 1;
    }

    ScoreLabel.textContent = `You scored ${score} point(s)`;
    clearInterval(timer);
    ShowFeedback(item);
}

function ShowFeedback(item)
{
    const CurrentQuestionSet = database_1[question_index];
    let message = "";
    
    if(item === CurrentQuestionSet.answer)
    {
        message = "Correct! 1 point goes to you!";

    } else if (item === null)
    {
        message = "Time's up!";
    } else
    {
        message = `HaHa! It is incorrect! The correct answer was ${CurrentQuestionSet.answer}`;
    }

    FeedbackLabel.textContent = message;

    // hold for 3 seconds
    setTimeout(() =>{
        question_index = question_index + 1;
        LoadQuestion();
    }, 3000);
}