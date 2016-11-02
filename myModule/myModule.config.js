function MyModuleConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.myModule', {
            url: '/my-module',
            controller: 'MyModuleCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'modules/myModule/myModule.html',
            title: 'My Nano Wallet Module'
        });

};

export default MyModuleConfig;