'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;
var barHeight;
var barColor;

// functions
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCloudWithShadow = function (ctx, x, y) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x + 10, y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var getRandomColor = function () {
  return 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.1) + 0.1) + ')';
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

// main render
window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var barX;
  var barY;

  renderCloudWithShadow(ctx, CLOUD_X, CLOUD_Y);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  renderText(ctx, 'Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + GAP * 2);
  renderText(ctx, 'Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + GAP * 4);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    barX = CLOUD_X + GAP + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i);
    barY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP - (BAR_MAX_HEIGHT * times[i] / maxTime);
    barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
    barColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor();

    // player names
    renderText(ctx, names[i], CLOUD_X + GAP + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    // player times
    renderText(ctx, Math.floor(times[i]), CLOUD_X + GAP + BAR_GAP + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_Y + CLOUD_HEIGHT - FONT_GAP - GAP - ((BAR_MAX_HEIGHT * times[i]) / maxTime) - FONT_GAP);
    // render bars
    renderBar(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
  }
};
