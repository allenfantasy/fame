define(function(require, exports, module) {
  var Surface = require('famous/core/Surface');
  var EdgeSwapper = require('famous/views/EdgeSwapper');
  var HeaderFooterView = require('views/HeaderFooterView');

  function setNavbarBack(state, target) {
    msgView.nav.setOptions({
      backContent: state? '&#x25c0;': ''
    });
    backTarget = target;
  }

  var msgView = new HeaderFooterView('messagesView', {
    headerSize: 75,
    footerSize: 50,
    nav: {
      content: 'Messages',
      moreContent: '',
      backContent: '',
      properties: {
        lineHeight: '75px',
        textAlign: 'center'
      }
    },
    tabs: {
      sections: ['Messages', 'Whatever'],
      options: {
        onClasses: ['tabbuton'],
        offClasses: ['tabbutoff']
      }
    }
  });
  var tabBarMock = require('views/tabBarMock');
  var messagesList = require('views/messagesList')(msgView);
  var webSurface = new Surface({
    classes: ['mobile-safari-fix']
  });

  var content = new EdgeSwapper({
    overlap: false,
    outTransition: false,
    size: [undefined, undefined]
  });
  msgView.setContent(content);

  var backTarget;

  // handling events
  msgView._eventInput.on('back', function() {
    content.setOptions({
      inTransition: false,
      outTransition: true
    });
    if (backTarget !== undefined)
      content.show(backTarget);
    setNavbarBack(false, undefined);
  });
  msgView._eventInput.on('select', function(button) {
    content.setOptions({
      inTransition: false,
      outTransition: false
    });

    switch (button.id) {
      case 0:
        content.show(messagesList);
        break;
      case 1:
        content.show(tabBarMock);
        break;
    }
    setNavbarBack(false, undefined);
  });
  msgView._eventInput.on('article-item-selected', function(data) {
    webSurface.setContent('<iframe width="100%" height="100%" src="' + data.url + '"></iframe>');      
    content.show(webSurface);
    setNavbarBack(true, messagesList);
  });

  // initailization
  content.show(messagesList);

  module.exports = msgView;
});
