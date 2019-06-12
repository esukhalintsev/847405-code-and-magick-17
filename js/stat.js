'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 115, 35);
  ctx.fillText('Список результатов:', 115, 55);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + GAP + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP - ((BAR_HEIGHT * times[i]) / maxTime) - FONT_GAP);
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.1) + 0.1) + ')';
    ctx.fillRect(CLOUD_X + GAP + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP - ((BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
