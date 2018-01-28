App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('TestTokenIco.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutTokenArtifact = data;
      App.contracts.TutToken = TruffleContract(TutTokenArtifact);

      // Set the provider for our contract.
      App.contracts.TutToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
    $(document).on('click', '#purchaseButton', App.buyIco);
  },

  handleTransfer: function() {
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var TutTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutToken.deployed().then(function(instance) {
        TutTokenInstance = instance;

        return TutTokenInstance.transferToken(toAddress, amount, {from: account});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },


  buyIco: function() {
    event.preventDefault();

    var amt = parseInt($('#TTPurchaseAmount').val());
    // console.log(amount);
    // var toAddress = $('#TTTransferAddress').val();

    console.log('Purchase ' + amt + ' worth of TT');

    var TutTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      // var account = accounts[0];
      var account = web3.eth.defaultAccount;
      console.log(account);
      var amount = web3.toWei(amt, "ether");

      App.contracts.TutToken.deployed().then(function(instance) {
        TutTokenInstance = instance;

// inst.sendTransaction({ from: account1, value: web3.toWei(5, "ether")})
        return TutTokenInstance.sendTransaction({from: account, value: amount});
        // return TutTokenInstance.buyTokens(account).send({from: account, value: amount});
      }).then(function(result) {
        alert('Purchase Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function(adopters, account) {
    console.log('Getting balances...');

    var TutTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutToken.deployed().then(function(instance) {
        TutTokenInstance = instance;

        return TutTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#TTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
