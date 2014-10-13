define(function(require, exports, module) {
  var Surface = require('famous/core/Surface');
  var ScrollContainer = require('famous/views/ScrollContainer');
  var DataSource = require('../DataSource');

  module.exports = function(handler) {
    var ds = new DataSource();
    var msgs = ds.getArticles();
    var msgList = new ScrollContainer({
      scrollview: {direction: 1}
    });
    var lines = [];
    msgList.sequenceFrom(lines);
    msgs.forEach(function(msg, index) {
      var surf = new Surface({
        content: '<div class"a-title">' + msg.title + '</div><div class="a-desc">' + msg.desc + '</div>',
        size: [undefined, 100],
        classes: ['article-cell'],
        properties: {
          itemType: 'article',
          listIndex: index,
          textAlign: 'left',
          color: 'black'
        }
      });
      surf.artIdx = index;
      lines.push(surf);

      surf.on('click', function() {
        handler._eventInput.emit('article-item-selected', {
          url: msg.url
        });
      });
    });
    return msgList;
  };
});
