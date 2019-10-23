'use strict';

//константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_COUNT = 4;

//переменные
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameField = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var fireballInput = setup.querySelector('input[name="fireball-color"]');

//массивы
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

//рандомная покраска SVG
var getNewSVGColor = function (target, colorArr) {
  target.style.fill = getRandomColor(colorArr);
};

//красим плащ по клику
wizardCoat.addEventListener('click', function () {
  getNewSVGColor(this, coatColors);
});

//красим глаза по клику
wizardEyes.addEventListener('click', function () {
  getNewSVGColor(this, eyesColors);
});

//красим фаерболл по клику
wizardFireball.addEventListener('click', function () {
  var newFireballColor = getRandomElement(fireballColors);
  wizardFireball.style.backgroundColor = newFireballColor
  fireballInput.value = newFireballColor;
});

//закрытие окна setup по ESC при отстуствии фокуса у ввода
var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameField) {
    closeSetup();
  }
}

//закрытие окна setup
var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

//открытие окна setup
var openSetup = function (evt) {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

setup.querySelector('.setup-similar').classList.remove('hidden');


//получаем случайный элемент из массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

//получаем случайное имя
var getRandomName = function () {
  var name;
  name = getRandomElement(firstNames) + ' ' + getRandomElement(lastNames);
  return name;
};

//наполняем массив похожими волшебниками
for (var i = 0; i < WIZARDS_COUNT; i++) {
  var randomWizard = {
    name: getRandomName(),
    eyes: getRandomElement(eyesColors),
    coat: getRandomElement(coatColors)
  };
  wizards.push(randomWizard);
}

//определяем темплейт
var similarList = document.querySelector('.setup-similar-list');
var similarWizard = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

//ренедерим волшебников
var renderWizard = function (wizard) {
  var wizardElement = similarWizard.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  return wizardElement;
};

//добавляем волшебников на страницу
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarList.appendChild(fragment);
