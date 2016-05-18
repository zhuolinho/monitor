System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters:[],
        execute: function() {
            exports_1("config", config = {
                prefix: 'app/',
                color: '#1288C1',
                logo: 'dist/images/logo.png',
                title: 'Monotor admin',
                project: 'Monotor admin project',
                bdmkey: 'RomHDfoS6RNiOTe4Z7IDynKrM6fLX2Cg',
                usersPrivileges: {
                    '1': '管理层',
                    '2': '监管员',
                    '3': '调度员',
                    '4': '客户',
                    '6': '司机',
                    '8': '押运员'
                },
                tanks: ['CNG', 'LNG', '集格', '杜瓦瓶', '官网', '中转站']
            });
        }
    }
});
