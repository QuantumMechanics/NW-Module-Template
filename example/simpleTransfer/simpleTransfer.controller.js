import CryptoHelpers from '../../utils/CryptoHelpers';

class SimpleTransferCtrl {
	// Set services as constructor parameter
    constructor($location, Alert, Wallet, Transactions) {
        'ngInject';

        // Declaring services
        this._$location = $location;
        this._Alert = Alert;
        this._Wallet = Wallet;
        this._Transactions = Transactions;

        // If no wallet show alert and redirect to home
        if (!this._Wallet.current) {
            this._Alert.noWalletLoaded();
            this._location.path('/');
            return;
        }

        /**
         * Default simple transfer properties
         */
        this.formData = {}
        this.formData.recipient = '';
        this.formData.amount = 0;
        this.formData.message = '';
        this.formData.encryptMessage = false;
        this.formData.fee = 0;

        // To store our password and decrypted/generated private key
        this.common = {
          "password": "",
          "privateKey": ""
        }

        // Multisig data, we won't use it but it is needed anyway
        this.formData.innerFee = 0;
        this.formData.isMultisig = false;
        this.formData.multisigAccount = '';

        // Mosaic data, we won't use it but it is needed anyway
        this.formData.mosaics = null;
        this.mosaicsMetaData = null;

        // To lock our send button if transaction not finished processing
        this.okPressed = false;

        // Init fee
        this.updateFee();
    }

    /**
     * updateFee() Update transaction fee
     */
      updateFee() {
        let entity = this._Transactions.prepareTransfer(this.common, this.formData, this.mosaicsMetaData);
        this.formData.fee = entity.fee;
      }

    /**
     * send() Build and broadcast the transaction to the network
     */
    send() {
      // Disable send button;
      this.okPressed = true;

      // Decrypt/generate private key and check it. Returned private key is contained into this.common
      if (!CryptoHelpers.passwordToPrivatekeyClear(this.common, this._Wallet.currentAccount, this._Wallet.algo, true)) {
        this._Alert.invalidPassword();
        // Enable send button
        this.okPressed = false;
        return;
      } else if (!CryptoHelpers.checkAddress(this.common.privateKey, this._Wallet.network, this._Wallet.currentAccount.address)) {
        this._Alert.invalidPassword();
        // Enable send button
        this.okPressed = false;
        return;
      }

      // Build the entity to serialize
      let entity = this._Transactions.prepareTransfer(this.common, this.formData, this.mosaicsMetaData);

      // Construct transaction byte array, sign and broadcast it to the network
      return this._Transactions.serializeAndAnnounceTransaction(entity, this.common).then((res) => {
        // Check status
        if (res.status === 200) {
          // If code >= 2, it's an error
          if (res.data.code >= 2) {
            this._Alert.transactionError(res.data.message);
          } else {
            this._Alert.transactionSuccess();
          }
        }
        // Enable send button
        this.okPressed = false;
        // Delete private key in common
        this.common.privateKey = '';
      },
      (err) => {
        // Delete private key in common
        this.common.privateKey = '';
        // Enable send button
        this.okPressed = false;
        this._Alert.transactionError('Failed ' + err.data.error + " " + err.data.message);
      });
    }
}

export default SimpleTransferCtrl;