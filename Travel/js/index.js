console.log('1. Слайдер изображений в секции destinations +50\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25');

const body = document.querySelector('body');
const buttonPopUp = document.querySelectorAll('.open_pop_up');
const popUp = document.querySelector('.pop-up');
const activePopUp = document.querySelector('.active');
const closePopUp = document.querySelector('.pop-up__container');
const popUpBg = document.querySelector('.pop-up__bg');
const popUpBgActive = document.querySelector('.pop-up__bg_active');


buttonPopUp.forEach((element) => {
  element.addEventListener('click', () => {
    paddingPopUp()
    popUp.classList.add('active');
    popUpBg.classList.add('pop-up__bg_active');
    body.classList.add('body-lock');
  });
});

document.addEventListener('click', (event) => {
  if (event.target === closePopUp) {
    popUp.classList.remove('active');
    popUpBg.classList.remove('pop-up__bg_active');
    body.classList.remove('body-lock');
    body.style.paddingRight = '';
  }
});

function paddingPopUp() {
  let paddingValue = window.innerWidth - body.offsetWidth + 'px';
  body.style.paddingRight = paddingValue;
}

const popUpBody = document.querySelector('.pop-up__body');
const changePopUp = document.querySelector('.register');
const facebook = document.querySelector('.pop-up__facebook');
const google = document.querySelector('.pop-up__google');
const or = document.querySelector('.pop-up__text');

changePopUp.addEventListener('click', () => {
  if (changePopUp.textContent === 'Register') {
    document.querySelector('.pop-up__title').textContent = 'Create account';
    facebook.remove();
    google.remove();
    or.remove();
    document.querySelector('.pop-up__footer-up').textContent = '';
    changePopUp.textContent = 'Log in';
    document.querySelector('.pop-up__footer-down').textContent = 'Already have an account?';
  } else if (changePopUp.textContent === 'Log in') {
    document.querySelector('.pop-up__title').textContent = 'Log in to your account';
    document.querySelector('.pop-up__title').after(facebook);
    facebook.after(google);
    google.after(or);
    document.querySelector('.pop-up__footer-up').textContent = 'Forgot Your Password?';
    changePopUp.textContent = 'Register';
    document.querySelector('.pop-up__footer-down').textContent = 'Don’t have an account?';
  }
});

document.querySelector('.pop-up__form-button').addEventListener('click', (event) => {
  alert(`login: ${document.querySelector('.pop-up__input').value}\nPassword: ${document.querySelector('.pop-up__input_last').value}`);
});

const burgerBlock = document.querySelector('.header-menu__nav');
const burgerLinks = document.querySelectorAll('.header-menu-list__items');
const burgerIcon = document.querySelector('.header-menu-burger__icon');

burgerIcon.addEventListener('click', () => {
  burgerBlock.classList.add('burger_active');
});

document.addEventListener('click', (event) => {
  if (event.target === document.querySelector('.burger-x') || event.target !== document.querySelector('.header-menu-list') && event.target !== burgerIcon) {
    burgerBlock.classList.remove('burger_active');
  }
});

burgerLinks.forEach((element) => {
  element.addEventListener('click', () => {
    burgerBlock.classList.remove('burger_active');
  });
});

const BtnLeft = document.querySelectorAll('.btn_left');
const BtnRight = document.querySelectorAll('.btn_right');
const BtnCenter = document.querySelector('.btn_center')
const animationRight = document.querySelector('.animation-right')
const animationLeft = document.querySelector('.animation-left');
const slider = document.querySelector('.section-destination-images');
const btnColor = document.querySelector('.unlock');

const arrayBtns = [BtnLeft[2], BtnCenter, BtnRight[2]];

function removeColor(arr) {
  arr.forEach((element) => {
    element.classList.remove('unlock')
  });
  if (arrayBtns[1] === BtnLeft[2]) {
    arrayBtns[1].classList.add('unlock');
  } else if (arrayBtns[1] === BtnCenter) {
    arrayBtns[1].classList.add('unlock');
  } else { arrayBtns[1].classList.add('unlock'); }
}

function creatNewDiv() {
  const newRightDiv = document.querySelector('.left-slider').cloneNode(true);
  slider.appendChild(newRightDiv);

  const newLeftDiv = document.querySelector('.right-slider').cloneNode(true);
  slider.insertBefore(newLeftDiv, document.querySelector('.left-slider'));
}

function deleteNewDiv() {
  if (slider.children.length >= 5) {
    slider.children[0].remove();
    slider.children[slider.children.length - 1].remove();
  }
}

const moveLeft = () => {
  slider.classList.add('animation-left');
  BtnLeft.forEach((element) => { element.removeEventListener('click', moveLeft); });
  BtnRight.forEach((element) => { element.removeEventListener('click', moveRight) });
  BtnCenter.removeEventListener('click', moveCenter);
  arrayBtns.unshift(arrayBtns[2]);
  arrayBtns.pop();
  removeColor(arrayBtns);
  creatNewDiv();
};

const moveRight = () => {
  slider.classList.add('animation-right');
  BtnRight.forEach((element) => { element.removeEventListener('click', moveRight) });
  BtnLeft.forEach((element) => { element.removeEventListener('click', moveLeft); });
  BtnCenter.removeEventListener('click', moveCenter);
  arrayBtns.push(arrayBtns[0]);
  arrayBtns.shift();
  removeColor(arrayBtns);
  creatNewDiv();
};

const moveCenter = () => {
  if (BtnLeft[2].classList.contains('unlock')) {
    moveRight();
    BtnCenter.removeEventListener('click', moveCenter);
  } else if (BtnCenter.classList.contains('unlock')) {
    BtnCenter.removeEventListener('click', moveCenter);
  } else {
    moveLeft();
    BtnCenter.removeEventListener('click', moveCenter);
  }
};

BtnLeft.forEach((element) => { element.addEventListener('click', moveLeft); });
BtnCenter.addEventListener('click', moveCenter);
BtnRight.forEach((element) => { element.addEventListener('click', moveRight) });

slider.addEventListener('animationend', (animationEvent) => {
  deleteNewDiv();
  const leftItem = document.querySelector('.left-slider').innerHTML;
  const centerItem = document.querySelector('.center-slider').innerHTML;
  const rightItem = document.querySelector('.right-slider').innerHTML;

  function addEvents() {
    BtnRight.forEach((element) => { element.addEventListener('click', moveRight) });
    BtnLeft.forEach((element) => { element.addEventListener('click', moveLeft); });

    BtnCenter.addEventListener('click', moveCenter);
  }

  if (animationEvent.animationName === 'left') {
    slider.classList.remove('animation-left');
    document.querySelector('.right-slider').innerHTML = centerItem;
    document.querySelector('.center-slider').innerHTML = leftItem;
    document.querySelector('.left-slider').innerHTML = rightItem;
    addEvents()
  } else {
    slider.classList.remove('animation-right');
    document.querySelector('.right-slider').innerHTML = leftItem;
    document.querySelector('.center-slider').innerHTML = rightItem;
    document.querySelector('.left-slider').innerHTML = centerItem;
    addEvents()
  }
});
