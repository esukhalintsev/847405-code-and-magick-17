'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;


var CLOUD_X = 100; //облако по Х 100
var CLOUD_Y = 10; //облако по У 10
var GAP = 10; // отступ
var TEXT_WIDTH = 20;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var PADDING_TOP = 100;
var BAR_MARGIN = 50;

var barHeight = CLOUD_HEIGHT - PADDING_TOP - TEXT_HEIGHT;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 115, 45);
  ctx.fillText('Список результатов:', 115, 65);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + TEXT_WIDTH + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
    ctx.fillRect(CLOUD_X + TEXT_WIDTH + (BAR_MARGIN + GAP) * i, CLOUD_Y * GAP, BAR_WIDTH, (barHeight * times[i] / maxTime));
  };

};
