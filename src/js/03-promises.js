import Notiflix from 'notiflix';

const elements = {
form: document.querySelector('.form'),
delay: document.querySelector('[name="delay"]'),
step: document.querySelector('[name="step"]'),
amount: document.querySelector('[name="amount"]'),
button: document.querySelector('[type="submit"]'),
};
elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();

  let delay = Number(elements.delay.value);
  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);
  let position;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
    res({ position, delay });
      } else {
        rej({ position, delay });
      };
    }, delay);
  });
  
  promise
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};

