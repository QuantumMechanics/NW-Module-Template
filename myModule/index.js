import angular from 'angular';

// Create the module where our functionality can attach to
let myModule = angular.module('app.myModule', []);

// Include our UI-Router config settings
import MyModuleConfig from './myModule.config';
myModule.config(MyModuleConfig);

// Controllers
import MyModuleCtrl from './myModule.controller';
myModule.controller('MyModuleCtrl', MyModuleCtrl);

export default myModule;
