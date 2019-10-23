'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

setup.querySelector('.setup-similar').classList.remove('hidden');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_COUNT = 4;

var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomName = function () {
  var name;
  name = getRandomElement(firstNames) + ' ' + getRandomElement(lastNames);
  return name;
};

var wizards = [];

for (var i = 0; i < WIZARDS_COUNT; i++) {
  var randomWizard = {
    name: getRandomName(),
    eyes: getRandomElement(eyesColors),
    coat: getRandomElement(coatColors)
  };
  wizards.push(randomWizard);
}

var similarList = document.querySelector('.setup-similar-list');
var similarWizard = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizard.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarList.appendChild(fragment);
