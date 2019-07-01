'use strict';

// константы
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

// переменные
var wizards = [];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupBlock = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');
var inputName = setupBlock.querySelector('.setup-user-name');
var wizardSetup = document.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardCoatInput = document.querySelector('input[name="coat-color"]');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.querySelector('input[name="fireball-color"');

setupBlock.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

// закрытие попап по ESC
var onPopupEscPress = function (evt) {
  if (document.activeElement === inputName) {
    return;
  } else {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }
  }
};
// открытие попап
var openPopup = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// закрытие попап
var closePopup = function () {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

// рандомное значение от min до max
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// рандомное значение из массива
var getRandomArrayCount = function (arrayName) {
  return Math.round(Math.random() * (arrayName.length - 1));
};

// покраска плаща по клику
var fillCoatColor = function () {
  var randomCoatColor = COAT_COLORS[getRandomInt(0, COAT_COLORS.length)];
  wizardCoat.style.fill = randomCoatColor;
  wizardCoatInput.value = randomCoatColor;
};

wizardCoat.addEventListener('click', function () {
  fillCoatColor();
});


// покраска глаз по клику
var fillEyesColor = function () {
  var randomEyesColor = EYES_COLORS[getRandomInt(0, EYES_COLORS.length)];
  wizardEyes.style.fill = randomEyesColor;
  wizardEyesInput.value = randomEyesColor;
};

wizardEyes.addEventListener('click', function () {
  fillEyesColor();
});

// покраска фаербола по клику
var fillFireballColor = function () {
  var randomFireballColor = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length)];
  wizardFireball.style.background = randomFireballColor;
  wizardFireballInput.value = randomFireballColor;
};

wizardFireball.addEventListener('click', function () {
  fillFireballColor();
});

// получение имени
var getWizardName = function () {
  var randomFirstName = WIZARD_FIRST_NAMES[getRandomArrayCount(WIZARD_FIRST_NAMES)];
  var randomLastName = WIZARD_LAST_NAMES[getRandomArrayCount(WIZARD_LAST_NAMES)];
  return randomFirstName + ' ' + randomLastName;
};

// выбор случайного цвета плаща
var getRandomCoat = function () {
  return COAT_COLORS[getRandomArrayCount(COAT_COLORS)];
};

// выбор случайного цвета глаз
var getRandomEyes = function () {
  return EYES_COLORS[getRandomArrayCount(EYES_COLORS)];
};

// wizards array
for (var i = 0; i < WIZARDS_COUNT; i++) {
  var randomWizard = {
    name: getWizardName(),
    coatColor: getRandomCoat(),
    eyesColor: getRandomEyes()
  };
  wizards.push(randomWizard);
}

// рендер волшебников
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);
