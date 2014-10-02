define(function(require, exports, module) {
  var Surface = require('famous/core/Surface');
  var Page = require('Page');
  var pageB = new Page({ name: 'pageB' });

  var surface = new Surface({
    size: [undefined, undefined],
    properties: {
      backgroundColor: 'red'
    }
  });
  pageB.add(surface);

  surface.on('click', function() {
    pageB.jumpTo('pageA');
  });

  module.exports = pageB;
});
