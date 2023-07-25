const startQuizButton = document.getElementById('start-quiz-button');
const messageSubject = document.getElementById('message-subject');
const messageContent = document.getElementById('message-content');
const quizContentWrapper = document.getElementById('quiz-content-wrapper');
const buttonWrapper = document.getElementById('button-wrapper');
let correctNumber = 0;
let quizNumber = 0;



startQuizButton.addEventListener('click', function(event) {
    messageSubject.textContent = "取得中";
    messageContent.textContent = "少々お待ちください";
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        .then((response) => response.text())
        .then((text) => {
            console.log(text)
            const fetchText = JSON.parse(text);
            console.log(`配列数は${fetchText.results.length}`);
            correctNumber = 0;
            console.log(correctNumber);
            quizNumber = 0;
            console.log(quizNumber);
            newQuestion(quizNumber, fetchText);

        })
        .catch((error) => console.log(error));
});


// シャッフルされる配列
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function newQuestion(quizNumber, fetchText) {
    if (quizNumber < 10) {
        console.log('問題番号は' + quizNumber);
        let displayQuizContentHTML = ''
        displayQuizContentHTML = `
        <h3>[ジャンル]${fetchText.results[quizNumber].category}</h3>
        <h3>[難易度]${fetchText.results[quizNumber].difficulty}</h3>
        `;
        quizContentWrapper.innerHTML = displayQuizContentHTML;
        messageContent.textContent = fetchText.results[quizNumber].question;
        startQuizButton.style.display = 'none';
        const correctAnswer = fetchText.results[quizNumber].correct_answer;
        const incorrectAnswers = fetchText.results[quizNumber].incorrect_answers;
        const quizSelect = shuffleArray([correctAnswer, ...incorrectAnswers]);
        console.log(quizSelect);
        let displayButtonWrapperHTML = ''
        displayButtonWrapperHTML = `
        <button id="question${quizNumber}-answer-button-1" value="${quizSelect[0]}">${quizSelect[0]}</button><br>
        <button id="question${quizNumber}-answer-button-2" value="${quizSelect[1]}">${quizSelect[1]}</button><br>
        <button id="question${quizNumber}-answer-button-3" value="${quizSelect[2]}">${quizSelect[2]}</button><br>
        <button id="question${quizNumber}-answer-button-4" value="${quizSelect[3]}">${quizSelect[3]}</button>
        `;
        buttonWrapper.innerHTML = displayButtonWrapperHTML;
        const buttonClick = document.querySelectorAll('[id*="answer-button"]');
        buttonClickEvent(buttonClick, correctAnswer, fetchText);
    }
    else {
        console.log('正答数は' + correctNumber);
        displayQuizContentHTML = ''
        displayButtonWrapperHTML = `
        <button id="go-to-home-button" value="ホームに戻る">ホームに戻る</button>
        `
        quizContentWrapper.innerHTML = displayQuizContentHTML;
        buttonWrapper.innerHTML = displayButtonWrapperHTML;
        const goToHomeButton = document.getElementById('go-to-home-button');
        goToHomeButton.addEventListener('click', function(event) {
            displayQuizContentHTML = ''
            displayButtonWrapperHTML = ''
            quizContentWrapper.innerHTML = displayQuizContentHTML;
            buttonWrapper.innerHTML = displayButtonWrapperHTML;
            messageSubject.textContent = "ようこそ";
            messageContent.textContent = "以下のボタンをクリック";
            startQuizButton.style.display = 'inline';
        });
        messageSubject.textContent = "あなたの正答数は" + correctNumber + "です";
        messageContent.textContent = "再度チャレンジしたい場合は以下をクリック";

    }
}

function buttonClickEvent(buttonClick, correctAnswer, fetchText) {
    quizNumber += 1;
    messageSubject.textContent = '問題' + quizNumber;
    buttonClick.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const buttonClickValue = event.target.value;
            console.log(buttonClickValue);
            if (buttonClickValue === correctAnswer) {
                console.log('正解です');
                correctNumber++;
                console.log('正解数は' + correctNumber);
                newQuestion(quizNumber, fetchText);
            }
            else {
                console.log('不正解です');
                newQuestion(quizNumber, fetchText);
            }
        });
    });
}
