System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters:[],
        execute: function() {
            exports_1("config", config = {
                prefix: 'app/',
                color: 'blue',
                logo: 'dist/images/logo.jpg',
                title: 'Monotor admin',
                project: 'Monotor admin project'
            });
        }
    }
});
