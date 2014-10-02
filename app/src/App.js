/* V1.0
 *
 * 1) a page controller which can switch between pages, the basic unit is `Page`
 * 2) a widget controller which can display widgets when certain event is fired, the basic unit is `Widget`
 * 3) page & widget could be (un)registered
 * 4) global knowledge sharing
 *
 * V2.0
 * 1) routing URL functionalities
 * 2) Navbar support
 *
 * App can be add to context.
 */
define(function(require, exports, module) {
  'use strict';
  var Entity = require('famous/core/Entity');
  var View = require('famous/core/View');
  var Transform = require('famous/core/Transform');
  var RenderController = require('famous/views/RenderController');

  function App() {
    View.apply(this, arguments);
    this._id = Entity.register(this);
    this._switcher = new RenderController({
      //overlap: false,
      inTransition: { curve: 'easeIn', duration: 1000 },
      outTransition: { curve: 'easeOut', duration: 1000 }
    });
    this._switcher.inTransformFrom(App.Default.inTransform);
    this._switcher.outTransformFrom(App.Default.outTransform);

    this._pages = {};
    this._currentPage = null;

    this.add(this._switcher);
  }

  App.Default = {
    inTransform: function(progress) {
      return Transform.translate(window.innerWidth * (1.0 - progress), 0, 0);
    },
    outTransform: function(progress) {
      return Transform.translate(window.innerWidth * (progress - 1.0), 0, 0);
    }
  };

  App.prototype = Object.create(View.prototype);
  App.prototype.constructor = App;

  App.prototype.registerPage = function(page) {
    var pageName = page.getName();
    if (!this._pages[pageName]) {
      this._pages[pageName] = page;
      page.setApp(this);
      if (this._currentPage === null) {
        this._currentPage = page;
        this._switcher.show(page);
      }
    }
    else
      throw new Error('Duplicated page name!');
  };

  App.prototype.switchToPage = function(pageName) {
    // TODO: set inTransform/outTransform
    var page = this._pages[pageName];
    if (!page) {
      throw new Error('Unregistered page name!');
      return;
    }
    this._currentPage = page;
    this._switcher.show(page);
  };

  App.prototype.registerWidget = function(widget) {};

  module.exports = App;
});
