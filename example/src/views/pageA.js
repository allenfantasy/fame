define(function(require, exports, module) {
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var ImageSurface = require('famous/surfaces/ImageSurface');

  var Page = require('fame/core/Page');
  var pageA = new Page({ name: 'pageA' });

  var logo = new ImageSurface({
    size: [200, 200],
    content: '/example/content/images/famous_logo.png',
    classes: ['backfaceVisibility']
  });

  var initialTime = Date.now();
  var centerSpinModifier = new Modifier({
    origin: [0.5, 0.5],
    transform : function() {
      return Transform.rotateY(.002 * (Date.now() - initialTime));
    }
  });

  pageA.add(centerSpinModifier).add(logo);

  logo.on('click', function() {
    pageA.jumpTo('messagesView');
  });

  module.exports = pageA;
});
