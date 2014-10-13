define(function(require, exports, module) {
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var NavigationBar = require('famous/widgets/NavigationBar');
  var createTabBar = require('fame/widgets/TabBar');
  var Page = require('fame/core/Page');

  /**
   * A Page which has a header-content-footer layout
   * NavigationBar as header
   * TabBar as footer
   * opening options for header & footer
   * content can be set dynamically
   *
   * @class HeaderFooterView
   * @constructor
   *
   * @param {String} name name of page view
   * @param {Object} layoutOpt options for HeaderFooterLayout
   * @param {Object} layoutOpt.nav options for NavigationBar
   * @param {Object} layoutOpt.tabs options.for TabBar
   *
   * @extend Page
   * @use HeaderFooterLayout
   * @use NavigationBar
   * @use TabBar
   */
  function HeaderFooterView(name, layoutOpt) {
    Page.apply(this, [{ name: name }]);

    this.layout = new HeaderFooterLayout({
      headerSize: layoutOpt.headerSize,
      footerSize: layoutOpt.footerSize
    });

    layoutOpt.nav.size = [undefined, layoutOpt.headerSize];

    this.nav = new NavigationBar(layoutOpt.nav);
    this.tabs = createTabBar(layoutOpt.tabs.sections, layoutOpt.tabs.options);

    this.layout.header.add(this.nav);
    this.layout.footer.add(this.tabs);
    this.add(this.layout);

    this.subscribe(this.nav);
    this.subscribe(this.tabs);
    return this;
  }

  HeaderFooterView.prototype = Object.create(Page.prototype);

  HeaderFooterView.prototype.setContent = function(content) {
    this.layout.content.add(content);
  };

  module.exports = HeaderFooterView;
});
