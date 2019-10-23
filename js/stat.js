'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 50;
var TEXT_WIDTH = 30;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var barHeight;
var barColor;
var BAR_MAX_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, columnWidth, columnHeight, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
};

var getMaxElement = function (arr) {
  var maxElemenent = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElemenent) {
      maxElemenent = arr[i];
    }
  }
  return maxElemenent;
};

var getRandomColor = function () {
  return 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.1) + 0.1) + ')';
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var barX;
  var barY;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y * 3);
  renderText(ctx, 'Список результатов: ', CLOUD_X + GAP * 2, CLOUD_Y * 5);

  for (var i = 0; i < names.length; i++) {

    barX = (CLOUD_X + TEXT_WIDTH + GAP * 2 + (TEXT_WIDTH + GAP + BAR_WIDTH) * i);
    barY = (CLOUD_HEIGHT - GAP - TEXT_HEIGHT);
    barHeight = -((BAR_MAX_HEIGHT * times[i]) / maxTime);
    barColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor();
    
    //names
    renderText(ctx, names[i], CLOUD_X + TEXT_WIDTH + GAP * 2 + (TEXT_WIDTH + GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 2);

    //times
    renderText(ctx, Math.round(times[i]), CLOUD_X + TEXT_WIDTH + GAP * 2 + (TEXT_WIDTH + GAP + BAR_WIDTH) * i, (CLOUD_HEIGHT - GAP * 2 - GAP - (BAR_MAX_HEIGHT * times[i] / maxTime) - (GAP * 2)));

    //bars
    renderBar(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
  }
};
