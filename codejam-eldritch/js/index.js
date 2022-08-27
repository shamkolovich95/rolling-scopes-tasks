const introBtn = document.querySelector('.first-btn');
const ancients = document.querySelector('.ancients');
const restartBtn = document.querySelector('.second-btn');
const selectedCard = document.querySelector('.choosen-card');
const curcles = document.querySelectorAll('.stade__curles');
const stadeLevel = document.querySelectorAll('.stade__title');
const container = document.querySelector('.container');
const deckBtn = document.querySelector('.deck-btn');
const deck = document.querySelector('.deck');
const cardTop = document.querySelector('.top');
const cardBottom = document.querySelector('.bottom');
const level = document.querySelector('.difficulties');
const chooseLevel = container.querySelector('.choosen-level');
const again = document.querySelector('.again');

import { default as blue } from '../images/cards/blue/index.js';
import { default as brown } from '../images/cards/brown/index.js';
import { default as green } from '../images/cards/green/index.js';
import { default as ancientAll } from '../images/ancients/ancients.js';

let arrOne = function () {
  let arr1, arr2, arr3;
  let one, two, three = [];
  let ancient;
  selectedCard.lastChild.classList.contains('first') ? ancient = 0 :
    selectedCard.lastChild.classList.contains('second') ? ancient = 1 :
      selectedCard.lastChild.classList.contains('third') ? ancient = 2 : ancient = 3;

  if (chooseLevel.textContent === 'Средний') {
    return [getCurrentArray(green), getCurrentArray(brown), getCurrentArray(blue)];
  } else if (chooseLevel.textContent !== 'Средний') {
    one = getDifficultArray(green);
    console.log(ancientAll[1].equal.greenCards)
    if (one.length < ancientAll[ancient].equal.greenCards) {
      for (let i = one.length; i < ancientAll[ancient].equal.greenCards; i) {
        let item = green[getRandomNum(green)];
        if (item.difficulty === 'normal' && !one.includes(item)) {
          one.push(green[getRandomNum(green)]);
          i++
        }
      }
    }

    two = getDifficultArray(brown);
    if (two.length < ancientAll[ancient].equal.brownCards) {
      for (let i = two.length; i < ancientAll[ancient].equal.brownCards; i) {
        let item = brown[getRandomNum(brown)];
        if (item.difficulty === 'normal' && !two.includes(item)) {
          two.push(item);
          i++
        }
      }
    }

    three = getDifficultArray(blue);
  }
  arr1 = getCurrentArray(one);
  arr2 = getCurrentArray(two);
  arr3 = getCurrentArray(three);
  return [arr1, arr2, arr3];
}

function getDifficultArray(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (chooseLevel.textContent === 'Легкий') {
      if (arr[i].difficulty !== 'hard') {
        res.push(arr[i]);
      }
    } else if (chooseLevel.textContent === 'Тяжелый') {
      if (arr[i].difficulty !== 'easy') {
        res.push(arr[i]);
      }
    } else if (chooseLevel.textContent === 'Очень тяжелый') {
      if (arr[i].difficulty === 'hard') {
        res.push(arr[i]);
      }
    }
    else if (chooseLevel.textContent === 'Очень легкий') {
      if (arr[i].difficulty === 'easy') {
        res.push(arr[i]);
      }
    }
  }
  return res;
}


function getCurrentArray(color) {
  const arr = [];
  for (let i = 0; i < color.length; i++) {
    arr.push(`./images/cards/${color[i].color}/${color[i].id}.png`);
  }
  return arr
}

introBtn.addEventListener('click', () => {
  introBtn.classList.add('click');
  ancients.classList.add('visible');
  restartBtn.classList.add('visible');
});

restartBtn.addEventListener('click', () => document.location.reload());

ancients.addEventListener('click', (event) => {
  let target = event.target.closest('.card');
  if (target) {
    ancients.classList.remove('visible');
    container.classList.add('visible');
    selectedCard.append(target);
    madeDesk();
  }
  level.classList.add('visible');
});

level.addEventListener('click', (event) => {
  let target = event.target.closest('.difficulties__item');
  if (target) {
    level.classList.add('click');
    chooseLevel.textContent = target.textContent;
    deckBtn.classList.add('visible');

    let result;
    const array = arrOne();
    const res = getRandomCards(array);
    result = getResult(res);

    cardTop.addEventListener('click', () => {
      let img = cardBottom.firstChild;
      let item;
      cardBottom.classList.add('visible');
      if (result[0].length !== 0) {
        stadeLevel[0].style.color = "rgb(28, 182, 213)";
        item = result[0][getRandomNum(result[0])];
        result[0].splice(result[0].indexOf(item), 1);
        img.src = item;
        img.src.includes('green') ? curcles[0].childNodes[1].textContent = curcles[0].childNodes[1].textContent - 1 :
          img.src.includes('brown') ? curcles[0].childNodes[3].textContent = curcles[0].childNodes[3].textContent - 1 :
            curcles[0].childNodes[5].textContent = curcles[0].childNodes[5].textContent - 1;
      } else if (result[1].length !== 0) {
        stadeLevel[1].style.color = "rgb(28, 182, 213)";
        item = result[1][getRandomNum(result[1])];
        result[1].splice(result[1].indexOf(item), 1);
        img.src = item;
        img.src.includes('green') ? curcles[1].childNodes[1].textContent = curcles[1].childNodes[1].textContent - 1 :
          img.src.includes('brown') ? curcles[1].childNodes[3].textContent = curcles[1].childNodes[3].textContent - 1 :
            curcles[1].childNodes[5].textContent = curcles[1].childNodes[5].textContent - 1;
      } else {
        stadeLevel[2].style.color = "rgb(28, 182, 213)";
        item = result[2][getRandomNum(result[2])];
        result[2].splice(result[2].indexOf(item), 1);
        img.src = item;
        img.src.includes('green') ? curcles[2].childNodes[1].textContent = curcles[2].childNodes[1].textContent - 1 :
          img.src.includes('brown') ? curcles[2].childNodes[3].textContent = curcles[2].childNodes[3].textContent - 1 :
            curcles[2].childNodes[5].textContent = curcles[2].childNodes[5].textContent - 1;
      }
      if (result[2].length === 0) {
        deckBtn.classList.add('click');
        cardTop.style.visibility = 'hidden';
        again.classList.add('visible');
        again.addEventListener('click', () => document.location.reload());
      }
    });
  }
});

deckBtn.addEventListener('click', () => {
  deck.classList.add('visible');
  deckBtn.classList.remove('visible');
});

function madeDesk() {
  selectedCard.lastChild.classList.contains('first') ? getCurclesNum(ancientAll[0]) :
    selectedCard.lastChild.classList.contains('second') ? getCurclesNum(ancientAll[1]) :
      selectedCard.lastChild.classList.contains('third') ? getCurclesNum(ancientAll[2]) : getCurclesNum(ancientAll[3]);
}

function getCurclesNum(array) {
  for (let i = 0; i < 3; i++) {
    let stage;
    i === 0 ? stage = array.firstStage :
      i === 1 ? stage = array.secondStage : stage = array.thirdStage;
    let values = Object.values(stage);
    curcles[i].childNodes[1].textContent = values[0];
    curcles[i].childNodes[3].textContent = values[2];
    curcles[i].childNodes[5].textContent = values[1];
  }
}

function getRandomCards(array) {
  let result = [];
  let arr;
  for (let i = 1; i < 6; i += 2) {
    let queue = [];
    for (let j = 0; j < 3; j++) {
      i === 1 ? arr = array[0] : i === 3 ? arr = array[1] : arr = array[2];
      for (let k = 0; k < curcles[j].childNodes[i].textContent; k++) {
        let item = arr[getRandomNum(arr)];
        arr.splice(arr.indexOf(item), 1);
        if (!queue.includes(item)) {
          queue.push(item);
        }
      }
    }
    result.push(queue);
  }
  return result;
}

function getResult(array) {
  let result = [];
  let arr;
  for (let i = 0; i < 3; i++) {
    let queue = [];
    for (let j = 1; j < 6; j += 2) {
      j === 1 ? arr = array[0] : j === 3 ? arr = array[1] : arr = array[2];
      for (let k = 0; k < curcles[i].childNodes[j].textContent; k++) {
        queue.push(arr.pop());
      }
    }
    result.push(queue);
  }
  console.log('Итоговый массив: ', result);
  return result;
}

function getRandomNum(arr) {
  return Math.floor(Math.random() * arr.length);
}
