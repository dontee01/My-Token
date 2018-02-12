pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/token/ERC20Basic.sol';
import 'zeppelin-solidity/contracts/token/BasicToken.sol';

import 'zeppelin-solidity/contracts/token/PausableToken.sol';


contract TestTokenIco is PausableToken {
    using SafeMath for uint256;

    string public name = "Test Token";
    string public symbol = "TST";
    uint256 public decimals = 18;

    uint256 public totalSupply = 100 * (10 ** decimals);

    address public fundsWallet;

    uint256 public tokens;
    uint256 public rate = 500;
    
    // amount of raised money in wei
    uint256 public weiRaised;


    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    function TestTokenIco(address _fundsWallet, uint256 initialSupply) {
        fundsWallet = _fundsWallet;
        if (initialSupply > 0) {
            totalSupply = initialSupply;
        }

        // initially assign all tokens to the fundsWallet
        balances[fundsWallet] = totalSupply;
        Transfer(0x0, fundsWallet, totalSupply);
    }

    function transferToken(address _to, uint256 _value) returns (bool) {
        balances[fundsWallet] = balances[fundsWallet].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(fundsWallet, _to, _value);
        return true;
    }

  // fallback function can be used to buy tokens
  function ()public payable {
    // transferToken(msg.sender, msg.value);
    // forwardFunds();
    buyTokens(msg.sender);
  }

  // low level token purchase function
  function buyTokens(address beneficiary) public payable {
    require(beneficiary != 0x0);
    // require(validPurchase());

    uint256 weiAmount = msg.value;

    // calculate token amount to be created
    uint256 tokens = weiAmount * rate;
    // uint256 tokens = weiAmount.mul(rate);
    // uint256 tokens = 700;

    // update state
    weiRaised = weiRaised + weiAmount;
    // weiRaised = weiRaised.add(weiAmount);

    transferToken(beneficiary, tokens);
    TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

    forwardFunds();
  }

  // send ether to the fund collection wallet
  // override to create custom fund forwarding mechanisms
  function forwardFunds() internal {
    fundsWallet.transfer(msg.value);
  }

  // @return true if the transaction can buy tokens
//   function validPurchase() internal constant returns (bool) {
//     uint256 current = block.number;
//     bool withinPeriod = current >= startBlock && current <= endBlock;
//     bool nonZeroPurchase = msg.value != 0;
//     return withinPeriod && nonZeroPurchase;
//   }

  // @return true if crowdsale event has ended
//   function hasEnded() public constant returns (bool) {
//     return block.number > endBlock;
//   }

}