const TestTokenIco = artifacts.require('./TestTokenIco.sol');

contract('TestTokenIco', accounts => {

  it('should have initial supply of 1,000,000 units assigned to funds wallet', async () => {
    const fundsWallet = accounts[1];
    const testToken = await TestTokenIco.new(fundsWallet);

    const expectedSupply = 1000000 * Math.pow(10, 18);
    
    const totalSupply = await testToken.totalSupply();
    assert.equal(totalSupply, expectedSupply, 'Total supply mismatch');
    
    const fundsWalletBalance = await testToken.balanceOf(fundsWallet);
    assert.equal(fundsWalletBalance.toNumber(), expectedSupply, 'Initial funds wallet balance mismatch');
  });
});