const elements = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};

elements.startBtn.addEventListener('click', handlerStartClick);
elements.stopBtn.addEventListener('click', handlerStopClick);

elements.stopBtn.disabled = true;
console.log(elements.startBtn)

let changeColorId = null

function handlerStartClick() {
    elements.body.style.backgroundColor = getRandomHexColor();
    elements.startBtn.disabled = true;
    elements.stopBtn.disabled = false;
    changeColorId = setInterval(() => {
        elements.body.style.backgroundColor = getRandomHexColor();
    },1000);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

  function handlerStopClick() {
    clearInterval(changeColorId);
    elements.stopBtn.disabled = true;
    elements.startBtn.disabled = false;
  }