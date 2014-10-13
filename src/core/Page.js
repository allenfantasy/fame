/* Page:
 *
 * 1) Binding with Model/Collection
 * 2) can switch to any other page, after registered in App
 */

define(function(require, exports, module) {
  'use strict';
  var View = require('famous/core/View');
  function Page(options) {
    View.apply(this, arguments);
    // Properties:
    // name
    // app
    // globals
    // model/collection
  }

  Page.prototype = Object.create(View.prototype);
  Page.prototype.constructor = Page;

  Page.prototype.getName = function() {
    return this.getOptions().name;
  };

  Page.prototype.setApp = function(app) {
    return this.setOptions({app: app});
  };

  Page.prototype.getApp = function(app) {
    return this.getOptions().app;
  };

  Page.prototype.jumpTo = function(pageName) {
    this.getApp().switchToPage(pageName);
  };

  module.exports = Page;
});
