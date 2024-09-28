let countries;
let currentCountry;
let currentPlayer = 1;
let mistakes = 0;

// JSONファイルを読み込む
fetch('countries.json', {
    method: 'get',
    mode: 'cors',
})
    .then(response => response.json())
    .then(data => {
        countries = data;
        startNewGame();
    });

function startNewGame() {
    currentCountry = getRandomCountry();
    mistakes = 0;
    updateDisplay();
}

function getRandomCountry() {
    const countryNames = Object.keys(countries);
    return countryNames[Math.floor(Math.random() * countryNames.length)];
}

function updateDisplay() {
    document.getElementById('current-country').textContent = `現在の国: ${currentCountry}`;
    document.getElementById('player-turn').textContent = `プレイヤー${currentPlayer}の番です`;
    document.getElementById('mistakes').textContent = `ミス: ${mistakes}`;
    document.getElementById('result').textContent = '';
    document.getElementById('answer-input').value = '';
}

document.getElementById('submit-answer').addEventListener('click', checkAnswer);

function checkAnswer() {
    const answer = document.getElementById('answer-input').value.trim();
    const neighboringCountries = countries[currentCountry];

    if (neighboringCountries.includes(answer)) {
        document.getElementById('result').textContent = '正解！';
        mistakes = 0;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentCountry = answer;
    } else {
        mistakes++;
        document.getElementById('result').textContent = '不正解。もう一度試してください。';
        if (mistakes >= 2) {
            document.getElementById('result').textContent = 'ゲームオーバー！新しいゲームを開始します。';
            setTimeout(startNewGame, 2000);
            return;
        }
    }

    updateDisplay();
}