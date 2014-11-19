define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var tabBarMock = new View();
  var mock = new Surface({
    content: 'whatever',
    size: [100, 30],
    properties: {
      textAlign: 'center',
      lineHeight: '30px'
    }
  });

  tabBarMock.add(new Modifier({
    origin: [.5, .5],
    align: [.5, .5]
  })).add(mock);

  module.exports = tabBarMock;
});
