import playList from './playList.js';
import lang from './language.js';
let randomNum, time;
let playNum = 0;
let x = 'en';
let y = 0;
const img = new Image();
let currentFunction;

const ul = document.querySelector('.play-list');

playList.forEach((Element) => {
  const playItem = document.createElement('li');
  playItem.classList.add('.play-item')
  playItem.textContent = Element['title'];
  ul.append(playItem);
});

const eng = document.querySelector('.english');
const rus = document.querySelector('.russian');
const columnRight = document.querySelector('.column-right');
const allListRight = columnRight.querySelectorAll('ul');
const timer = document.querySelector('.time');
const week = document.querySelector('.date');

const showTime = function () {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timer.textContent = currentTime;

  const showDate = function () {
    const options = { month: 'long', day: 'numeric', weekday: 'long', };
    const currentDate = date.toLocaleDateString(x, options);
    week.textContent = currentDate;
  };
  showDate(x);

  const getTimeOfDay = function () {
    const hello = document.querySelector('.day-time');
    let greeding, timer;
    if (date.getHours() >= 6 && date.getHours() < 12) {
      time = lang['en'].time[0]; timer = lang[x].time[0]; greeding = lang[x].greeding[0];
    }
    else if (date.getHours() >= 12 && date.getHours() < 18) {
      time = lang['en'].time[1]; timer = lang[x].time[1]; greeding = lang[x].greeding[1];
    }
    else if (date.getHours() >= 18 && date.getHours() < 24) {
      time = lang['en'].time[2]; timer = lang[x].time[2]; greeding = lang[x].greeding[2];
    }
    else if (date.getHours() >= 0 && date.getHours() < 6) {
      time = lang['en'].time[3]; time = lang[x].time[3]; greeding = lang[x].greeding[3];
    }
    hello.textContent = greeding + ' ' + timer;
  };
  getTimeOfDay(x);

  setTimeout(showTime, 1000);
};
showTime();

eng.addEventListener('click', () => {
  x = 'en';
  y = 0;
  name.placeholder = lang[x].inputName;
  allListRight[2].children[0].childNodes[0].textContent = lang[x].english;
  allListRight[2].children[1].childNodes[0].textContent = lang[x].russian;
  getWeather(x);
  getQuotes(y);
});

rus.addEventListener('click', () => {
  x = 'ru';
  y = 1;
  name.placeholder = lang[x].inputName;
  allListRight[2].children[0].childNodes[0].textContent = lang[x].english;
  allListRight[2].children[1].childNodes[0].textContent = lang[x].russian;
  getWeather(x);
  getQuotes(y);
});

const city = document.querySelector('.city');
const name = document.querySelector('.input');
const checkbox = document.querySelectorAll('.checkbox');
name.placeholder = lang[x].inputName;

const creatName = function () {
  function getLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('lang', x);
    localStorage.setItem('lang-quotes', y);
    localStorage.setItem('background', JSON.stringify(img.src));
    checkbox.forEach(() => {
      for (let i = 0; i < checkbox.length; i++) {
        localStorage.setItem('checked' + i, JSON.stringify(checkbox[i].checked));
      }
    });
  }
  window.addEventListener('beforeunload', getLocalStorage);

  function setLocalStorage() {
    if (localStorage.length !== 0 && localStorage.getItem('city')) {
      name.value = localStorage.getItem('name');
      city.value = localStorage.getItem('city');
      x = localStorage.getItem('lang');
      y = localStorage.getItem('lang-quotes');
      img.src = JSON.parse(localStorage.getItem('background'));
      checkbox.forEach(() => {
        for (let i = 0; i < checkbox.length; i++) {
          checkbox[i].checked = JSON.parse(localStorage.getItem('checked' + i));
        }
      });
    }
  }
  setLocalStorage();
  window.addEventListener('load', setLocalStorage);
};
creatName();

const wrapper = document.querySelector('.wrapper');

const getRandomNum = (function () {
  return randomNum = (Math.floor(Math.random() * 20) + 1).toString().padStart(2, '0');
})();

const btnLeft = document.querySelector('.left-arrow');
const btnRight = document.querySelector('.right-arrow');

const setBg = function () {
  img.src = `https://raw.githubusercontent.com/shamkolovich95/stage1-tasks/assets/images/${time}/${randomNum}.jpg`;
  img.onload = () => wrapper.style.backgroundImage = `url(${img.src})`;
  currentFunction = setBg;
};
setBg();

allListRight[1].children[0].children[0].children[1].addEventListener('click', setBg);

const getSlidePrev = () => {
  randomNum > 1 ? randomNum = (randomNum - 1).toString().padStart(2, '0') : randomNum = 20;
  if (img.src.includes('unsplash')) currentFunction = getLinkToImageUnsplash;
  else if (img.src.includes('flickr')) currentFunction = getLinkToImageFlick;
  currentFunction();
};
btnLeft.addEventListener('click', getSlidePrev);
const getSlideNext = () => {
  randomNum < 20 ? randomNum = (+randomNum + 1).toString().padStart(2, '0') : randomNum = '01';
  if (img.src.includes('unsplash')) currentFunction = getLinkToImageUnsplash;
  else if (img.src.includes('flickr')) currentFunction = getLinkToImageFlick;
  currentFunction();
};
btnRight.addEventListener('click', getSlideNext);

async function getLinkToImageUnsplash() {
  const url = `https://api.unsplash.com/photos/random?&query=${time}&client_id=r9rfmircAnvIf04Z4ImjFE4BBuYDRSQP0dKls50FUD0`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.regular;
  img.onload = () => wrapper.style.backgroundImage = `url(${img.src})`;
  currentFunction = getLinkToImageUnsplash;
}

allListRight[1].children[1].children[0].children[1].addEventListener('click', getLinkToImageUnsplash);

async function getLinkToImageFlick() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0acd9d5799f3bb6ea92d2400749323bf&tags=${time}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[getRandomNumber(data.photos.photo)].url_l;
  img.onload = () => wrapper.style.backgroundImage = `url(${img.src})`;
  currentFunction = getLinkToImageFlick;
}

allListRight[1].children[2].children[0].children[1].addEventListener('click', getLinkToImageFlick);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${x}&appid=5a038b724e23cd19d3051ef5cc0f36c8&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  try {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    windSpeed.textContent = `${lang[x].wind}: ${Math.floor(data.wind.speed)} ${lang[x].count}`;
    humidity.textContent = `${lang[x].humidity}: ${data.main.humidity}%`;
  } catch (e) {
    alert(e);
  }
}
getWeather(x);

city.addEventListener('change', () => getWeather());

const button = document.querySelector('.button');
const audio = new Audio();
audio.src = playList[playNum]['src'];
ul.childNodes[playNum].classList.add('item-active');
const volumeBar = document.querySelector(".volume-percentage");
audio.volume = 0.75;
volumeBar.style.width = audio.volume * 100 + '%';

const playAudio = () => {
  button.classList.contains('active') ? audio.play() : audio.pause();
  ul.childNodes.forEach((Element) => Element.classList.remove('item-active'));
  ul.childNodes[playNum].classList.add('item-active');
};

const musicTitle = document.querySelector('.music-title');

audio.addEventListener("loadeddata", () => {
  document.querySelector(".length").textContent = getTimeCodeFromNum(audio.duration);
  musicTitle.textContent = playList[playNum]['title'];
});

audio.addEventListener('ended', () => {
  playNext();
});

const timeline = document.querySelector(".timeline");
const timelineWidth = window.getComputedStyle(timeline).width;

timeline.addEventListener("click", (event) => {
  const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
});

const volumeSlider = document.querySelector(".volume-slider");

volumeSlider.addEventListener('click', (event) => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  audio.volume = event.offsetX / parseInt(sliderWidth);
  volumeBar.style.width = audio.volume * 100 + '%';
});

const volumeBtn = document.querySelector(".volume-button");

volumeBtn.addEventListener("click", () => {
  const volumeIcon = document.querySelector(".volume");
  audio.muted = !audio.muted;
  volumeIcon.classList.toggle('icono-volumeMute');
  volumeIcon.classList.toggle('icono-volume');
  audio.muted ? volumeBar.style.width = 0 : volumeBar.style.width = audio.volume * 100 + '%';
});

volumeBtn.addEventListener('mouseover', () => {
  volumeSlider.classList.add('barScale')
});

document.querySelector(".volume-container").addEventListener('mouseleave', () => {
  volumeSlider.classList.remove('barScale')
});

const progressBar = document.querySelector('.progress');

setInterval(() => {
  progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
  document.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime);
}, 500)

function getTimeCodeFromNum(num) {
  let seconds = Math.floor(num);
  let minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

const btnToggle = () => {
  button.classList.toggle('active')
}

button.addEventListener('click', btnToggle)
button.addEventListener('click', playAudio)

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const playPrev = () => {
  playNum !== 0 ? playNum-- : playNum = playList.length - 1;
  audio.src = playList[playNum]['src'];
  musicTitle.textContent = playList[playNum]['title'];
  button.classList.add('active');
  playAudio();
};

const playNext = () => {
  playNum < playList.length - 1 ? playNum++ : playNum = 0;
  audio.src = playList[playNum]['src'];
  musicTitle.textContent = playList[playNum]['title'];
  button.classList.add('active');
  playAudio();
};

btnPrev.addEventListener('click', playPrev);
btnNext.addEventListener('click', playNext);

const quotersText = document.querySelector('.quoters-text');
const quotersAuthor = document.querySelector('.quoters-author');
const quotersBtn = document.querySelector('.footer-button');

function getQuotes() {
  const quotes = './js/data.json';
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      const row = getRandomNumber(data[y]);
      quotersText.textContent = data[y][row].quote;
      quotersAuthor.textContent = data[y][row].author;
    });
}
getQuotes(y);

function getRandomNumber(arr) {
  return (Math.floor(Math.random() * arr.length - 1) + 1);
}

quotersBtn.addEventListener('click', getQuotes);

const burgerBtn = document.querySelector('.burger-icon');
const burger = document.querySelector('.pop-up');
const burgerContainer = burger.querySelector('.pop-up__container')

burgerBtn.addEventListener('click', () => {
  burger.classList.toggle('visible');
  burgerBtn.classList.toggle('white');
});

document.addEventListener('click', (event) => {
  if (!burgerContainer.contains(event.target) && event.target !== burgerBtn) {
    burger.classList.remove('visible');
    burgerBtn.classList.remove('white');
  }
});

const todo = document.querySelector('.todo');
const burgerBlock = document.querySelector('.burger-todo');
const burgerContainerTodo = document.querySelector('.burger-todo__container');
const greedingHello = document.querySelector('.hello');
const quotersBlock = document.querySelector('.quoters-block');
const musicBlock = document.querySelector('.music');
const weatherBlock = document.querySelector('.weather');

todo.addEventListener('click', () => {
  burgerBlock.classList.toggle('visible');
  todo.classList.toggle('rotate');
});

todo.addEventListener('mouseover', () => {
  todo.classList.add('todo-hover');
});

todo.addEventListener('mouseout', () => {
  todo.classList.remove('todo-hover');
});

document.addEventListener('click', (e) => {
  if (!burgerContainerTodo.contains(e.target) && e.target !== todo) {
    document.querySelector('.burger-todo').classList.remove('visible');
    todo.classList.remove('rotate');
  }
});

checkbox.forEach(elem => {
  elem.addEventListener('click', () => {
    checkbox[0].checked ? timer.classList.remove('show-hidden') : timer.classList.add('show-hidden');
    checkbox[1].checked ? week.classList.remove('show-hidden') : week.classList.add('show-hidden');
    checkbox[2].checked ? greedingHello.classList.remove('show-hidden') : greedingHello.classList.add('show-hidden');
    checkbox[3].checked ? quotersBlock.classList.remove('show-hidden') : quotersBlock.classList.add('show-hidden');
    checkbox[4].checked ? musicBlock.classList.remove('show-hidden') : musicBlock.classList.add('show-hidden');
    checkbox[5].checked ? weatherBlock.classList.remove('show-hidden') : weatherBlock.classList.add('show-hidden');
  });
});

window.addEventListener('load', () => {
  checkbox.forEach(() => {
    if (!checkbox[0].checked) {
      timer.classList.add('show-hidden');
    }
    if (!checkbox[1].checked) {
      week.classList.add('show-hidden');
    }
    if (!checkbox[2].checked) {
      greedingHello.classList.add('show-hidden');
    }
    if (!checkbox[3].checked) {
      quotersBlock.classList.add('show-hidden');
    }
    if (!checkbox[4].checked) {
      musicBlock.classList.add('show-hidden');
    }
    if (!checkbox[5].checked) {
      weatherBlock.classList.add('show-hidden');
    }
  });
});

const menuItemLeft = document.querySelectorAll('.menu__item');
const burgerTitle = document.querySelector('.title');
const burgerTitleUnder = document.querySelector('.title__under');
const burgerColumnRightText = document.querySelector('.column-right__text');

menuItemLeft.forEach(elem => {
  elem.addEventListener('click', () => {
    burgerTitle.textContent = elem.textContent;
    if (elem.classList.contains('two')) {
      burgerTitleUnder.textContent = 'see a new inspiring photo each day';
      burgerColumnRightText.textContent = 'Links';
      allListRight.forEach(elem => elem.classList.add('display'));
      allListRight[1].classList.add('visible');
      allListRight[1].classList.remove('display');
    }
    else if (elem.classList.contains('three')) {
      burgerTitleUnder.textContent = 'choose current language';
      burgerColumnRightText.textContent = 'Change';
      allListRight.forEach(elem => elem.classList.add('display'));
      allListRight[2].classList.add('visible');
      allListRight[2].classList.remove('display');
    }
    else if (elem.classList.contains('one')) {
      burgerTitleUnder.textContent = 'customize your dashboard';
      burgerColumnRightText.textContent = 'Show';
      allListRight.forEach(elem => elem.classList.add('display'));
      allListRight[0].classList.remove('display');
      allListRight[0].classList.add('visible');
    }
    menuItemLeft.forEach(elem => {
      elem.classList.remove('hover');
      elem.classList.remove('menu__item-choose');
    });
    elem.classList.add('menu__item-choose');
  });
  elem.addEventListener('mouseover', () => {
    if (!elem.classList.contains('menu__item-choose')) elem.classList.add('hover');
  });
  elem.addEventListener('mouseout', () => {
    if (elem.classList.contains('hover')) elem.classList.remove('hover');
  });
});

function todoList() {
  const listTodo = document.querySelector('.pop-up__list');
  let list = [];
  if (localStorage.getItem('todo')) {
    list = JSON.parse(localStorage.getItem('todo'));
    out();
  }
  const input = document.querySelector('.pop-up__input');
  input.addEventListener('change', () => {
    if (input.value.length !== 0) {
      let temp = {};
      temp.todo = input.value;
      temp.checked = false;
      let i = list.length;
      list[i] = temp;
      out();
      localStorage.setItem('todo', JSON.stringify(list));
      input.value = '';
    }
  });

  function out() {
    let out = '';
    list.forEach((item, i) => {
      out += `
      <li>
        <input type='checkbox' class='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}'>${item.todo}</label>
      </li>`;
    });
    listTodo.innerHTML = out;
  }

  listTodo.addEventListener('change', (e) => {
    let classInput = e.target.getAttribute('class');
    let valueLabel = listTodo.querySelector('[for=' + classInput + ']');
    list.forEach(item => {
      if (item.todo === valueLabel.innerHTML) {
        item.checked = !item.checked;
        localStorage.setItem('todo', JSON.stringify(list));
      }
    });
  });
}
todoList();

console.log('1. Часы и календарь +15\n2. Приветствие +10.\n3. Смена фонового изображения +20.\n4. Виджет погоды +15.\n5. Виджет цитата дня +10./n6. Аудиоплеер +15.\n7. Продвинутый аудиоплеер +20.\n8. Перевод приложения на два языка +15/-1,5.\n10. Получение фонового изображения от API +10.\n11. Настройки приложения +20/-3.\n12. Дополнительный функционал +10.');
