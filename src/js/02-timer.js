import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  button: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId;
const currentDate = new Date().getTime();

elements.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const targetDate = selectedDates[0].getTime();
    let ms = targetDate - currentDate;

    if (ms < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      elements.button.disabled = false;
      elements.button.addEventListener('click', handlerClick);
    }
  },
};

function addLeadingZero(number) {
  return ('0' + number).slice(-2);
}

const calendars = flatpickr(elements.input, options);

function handlerClick() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  elements.button.disabled = true;
  elements.input.disabled = true;
  let targetDate = new Date(elements.input.value).getTime();
  let ms = targetDate - currentDate;

  intervalId = setInterval(() => {
    elements.button.disabled = true;
    elements.input.disabled = true;
    ms -= 1000;
    elements.seconds.textContent = addLeadingZero(convertMs(ms).seconds);
    elements.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
    elements.hours.textContent = addLeadingZero(convertMs(ms).hours);
    elements.days.textContent = addLeadingZero(convertMs(ms).days);

    if (ms <= 0) {
      clearInterval(intervalId);
      elements.seconds.textContent = '00';
      elements.minutes.textContent = '00';
      elements.hours.textContent = '00';
      elements.days.textContent = '00';
    elements.input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
