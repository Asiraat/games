let countries;
let currentCountry;
let usedCountries = new Set();
let isPlayerTurn = false;
let mistakes = 0;

// JSONファイルを読み込む
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        countries = data;
        populateCountryList();
        startNewGame();
    });

function populateCountryList() {
    const datalist = document.getElementById('country-list');
    Object.keys(countries).forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        datalist.appendChild(option);
    });
}

function startNewGame() {
    usedCountries.clear();
    mistakes = 0;
    currentCountry = getRandomCountry();
    usedCountries.add(currentCountry);
    addMessage(`ゲームを開始します。最初の国は${currentCountry}です。`, 'system');
    computerTurn();
}

function getRandomCountry() {
    const availableCountries = Object.keys(countries).filter(country => !usedCountries.has(country));
    return availableCountries[Math.floor(Math.random() * availableCountries.length)];
}

function addMessage(message, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function computerTurn() {
    const neighboringCountries = countries[currentCountry].filter(country => !usedCountries.has(country));
    if (neighboringCountries.length === 0) {
        addMessage('コンピュータが言える国がなくなりました。プレイヤーの勝利です！', 'system');
        addPlayAgainButton();
        return;
    }
    const nextCountry = neighboringCountries[Math.floor(Math.random() * neighboringCountries.length)];
    usedCountries.add(nextCountry);
    currentCountry = nextCountry;
    addMessage(`コンピュータ: ${nextCountry}`, 'computer');
    isPlayerTurn = true;
}

function playerTurn(answer) {
    if (!isPlayerTurn) return;

    if (!countries[currentCountry].includes(answer)) {
        mistakes++;
        if (mistakes >= 2) {
            addMessage(`${answer}は${currentCountry}に隣接していません。2回連続で間違えたためゲームオーバーです！`, 'system');
            addPlayAgainButton();
        } else {
            addMessage(`${answer}は${currentCountry}に隣接していません。もう一度試してください。`, 'system');
        }
        return;
    }

    if (usedCountries.has(answer)) {
        mistakes++;
        if (mistakes >= 2) {
            addMessage(`${answer}は既に使用されています。2回連続で間違えたためゲームオーバーです！`, 'system');
            addPlayAgainButton();
        } else {
            addMessage(`${answer}は既に使用されています。もう一度試してください。`, 'system');
        }
        return;
    }

    mistakes = 0;
    usedCountries.add(answer);
    currentCountry = answer;
    addMessage(`プレイヤー: ${answer}`, 'player');
    isPlayerTurn = false;
    setTimeout(computerTurn, 1000);
}

function addPlayAgainButton() {
    const button = document.createElement('button');
    button.textContent = 'もう一度';
    button.classList.add('play-again');
    button.addEventListener('click', () => {
        document.getElementById('chat-container').innerHTML = '';
        startNewGame();
    });
    const chatContainer = document.getElementById('chat-container');
    chatContainer.appendChild(button);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById('submit-answer').addEventListener('click', () => {
    const answerInput = document.getElementById('answer-input');
    const answer = answerInput.value.trim();
    if (answer) {
        playerTurn(answer);
        answerInput.value = '';
    }
});

document.getElementById('answer-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('submit-answer').click();
    }
});

// 入力補助の動作を調整
const answerInput = document.getElementById('answer-input');
answerInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        this.setAttribute('list', 'country-list');
    } else {
        this.removeAttribute('list');
    }
});

answerInput.addEventListener('focus', function() {
    this.removeAttribute('list');
});

// ヘルプボタンとモーダルの機能
const modal = document.getElementById('modal');
const helpButton = document.getElementById('help-button');
const closeButton = document.getElementById('close-button');

helpButton.addEventListener('click', () => {
    modal.style.display = 'block';
    // Delay adding the 'show' class to trigger the transition
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
});

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    // Delay setting display to 'none' until after the transition
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}
