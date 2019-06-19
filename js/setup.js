'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
var wizards = [];

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomArrayCount = function (arrayName) {
  return Math.round(Math.random() * (arrayName.length - 1));
};

var getWizardName = function () {
  var randomFirstName = WIZARD_FIRST_NAMES[getRandomArrayCount(WIZARD_FIRST_NAMES)];
  var randomLastName = WIZARD_LAST_NAMES[getRandomArrayCount(WIZARD_LAST_NAMES)];
  return randomFirstName + ' ' + randomLastName;
};

var getRandomCoat = function () {
  return COAT_COLORS[getRandomArrayCount(COAT_COLORS)];
};

var getRandomEyes = function () {
  return EYE_COLORS[getRandomArrayCount(EYE_COLORS)];
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

// render wizard
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
