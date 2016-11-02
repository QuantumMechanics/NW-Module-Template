class MyModuleCtrl {
	// Set services as constructor parameter
    constructor($location, Alert, Wallet) {
        'ngInject';

        // Declaring services
        this._location = $location;
        this._Alert = Alert;
        this._Wallet = Wallet;

        // If no wallet show alert and redirect to home
        if (!this._Wallet.current) {
            this._Alert.noWalletLoaded();
            this._location.path('/');
            return;
        }

        /**
         * Here is where you initialize the properties
         */ 
    }

    /**
     *  Here is where you put the methods
     */
}

export default MyModuleCtrl;