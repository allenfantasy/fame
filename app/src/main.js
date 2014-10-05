/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var App = require('App');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);

    // your app here
    var app = new App();

    var pageA = require('views/pageA');
    var pageB = require('views/pageB');
    var messagesView = require('views/messagesView');

    mainContext.add(app);

    app.registerPage(pageA);
    app.registerPage(pageB);
    app.registerPage(messagesView);
});
