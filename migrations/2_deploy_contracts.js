var TestTokenIco = artifacts.require("./TestTokenIco.sol");

// var TutTokenCrowdsale = artifacts.require("./TutTokenCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
    // one second in the future
    const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1;
    // 20 days
    const endTime = startTime + (86400 * 20);
    const rate = new web3.BigNumber(1000);
    const initialSupply = 10000;
    const wallet = accounts[0];

    // deployer.deploy(TutTokenq).then(function() {
    //     return deployer.deploy(Banker, SilverCoin.address);
    // }).then(function() { })

    deployer.deploy(TestTokenIco, wallet, initialSupply);
}




// module.exports = function(deployer, network, accounts) {
//     // one second in the future
//     const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1;
//     // 20 days
//     const endTime = startTime + (86400 * 20);
//     const rate = new web3.BigNumber(1000);
//     const initialSupply = 10000;
//     const wallet = accounts[0];

//     // deployer.deploy(TutTokenq).then(function() {
//     //     return deployer.deploy(Banker, SilverCoin.address);
//     // }).then(function() { })

//     deployer.deploy([TutToken, initialSupply], [TutTokenCrowdsale, startTime, endTime, rate, wallet, initialSupply]);
//     // deployer.deploy(TutTokenCrowdsale, startTime, endTime, rate, wallet, initialSupply);
// }

// module.exports = function (deployer) {
//     deployer.deploy(TutToken);
// };
// deployer.deploy(SilverCoin).then(function() {
//         return deployer.deploy(Banker, SilverCoin.address);
//     }).then(function() { })