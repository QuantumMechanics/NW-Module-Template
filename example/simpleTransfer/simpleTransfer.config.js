function SimpleTransferConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.simpleTransfer', {
            url: '/simple-transfer',
            controller: 'SimpleTransferCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'modules/simpleTransfer/simpleTransfer.html',
            title: 'Simple transfer'
        });

};

export default SimpleTransferConfig;