import angular from 'angular';

// Create the module where our functionality can attach to
let simpleTransferModule = angular.module('app.simpleTransfer', []);

// Include our UI-Router config settings
import SimpleTransferConfig from './simpleTransfer.config';
simpleTransferModule.config(SimpleTransferConfig);

// Controllers
import SimpleTransferCtrl from './simpleTransfer.controller';
simpleTransferModule.controller('SimpleTransferCtrl', SimpleTransferCtrl);

export default simpleTransferModule;
