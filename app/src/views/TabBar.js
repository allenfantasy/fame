define(function(require, exports, module) {
  var TabBar = require('famous/widgets/TabBar');

  module.exports = function (sections, options) {
    var tabBar = new TabBar({});
    sections.forEach(function(section, index) {
      tabBar.defineSection(index, {
        content: section,
        onClasses: options.onClasses || ['tab_button_on'],
        offClasses: options.offClasses || ['tab_button_off']
      });
    });
    tabBar.select(options.index || 0);

    return tabBar;
  }
});
