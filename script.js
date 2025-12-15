// Получаем элементы
const ruBtn = document.getElementById('ruBtn');
const kzBtn = document.getElementById('kzBtn');
const description = document.getElementById('description');
const disclaimer = document.getElementById('disclaimer');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');

// Тексты на двух языках
const texts = {
    ru: {
        description: "Этот сервис предназначен для анализа текста с использованием искусственного интеллекта. Он помогает структурировать мысли, обратить внимание на повторяющиеся темы и задать вопросы для саморефлексии.",
        disclaimer: "Данный сервис не является психологической консультацией, не ставит диагнозы и не заменяет работу с психологом. Результаты анализа носят ознакомительный характер.",
        analyzeBtn: "Проанализировать текст"
    },
    kz: {
        description: "Бұл сервис мәтінді жасанды интеллект арқылы талдауға арналған. Ол ойларды құрылымдауға, қайталанатын тақырыптарға назар аударуға және өзін-өзі талдауға арналған сұрақтар қоюға көмектеседі.",
        disclaimer: "Бұл сервис психологиялық кеңес бермейді, диагноз қоймайды және психологпен жұмыс жасаудың орнына алмайды. Талдау нәтижелері тек танысу мақсатында.",
        analyzeBtn: "Мәтінді талдау"
    }
};

// Функция переключения языка
function setLanguage(lang) {
    description.textContent = texts[lang].description;
    disclaimer.textContent = texts[lang].disclaimer;
    analyzeBtn.textContent = texts[lang].analyzeBtn;
    result.textContent = ''; // обнуляем предыдущий результат
}

// События на кнопки переключения языка
ruBtn.addEventListener('click', () => setLanguage('ru'));
kzBtn.addEventListener('click', () => setLanguage('kz'));

// Кнопка анализа текста через сервер Flask
analyzeBtn.addEventListener("click", async () => {
    const text = document.getElementById("userText").value;
    if (!text.trim()) {
        alert("Введите текст!");
        return;
    }

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        result.textContent = data.result;
    } catch (error) {
        result.textContent = "Ошибка соединения с сервером.";
        console.error(error);
    }
});


