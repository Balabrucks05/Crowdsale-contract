//SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Crowdsale is Ownable{
    IERC20 public token; // The token being sold
    uint256 public rate; //Nummber of tokens per 1 Ether
    address payable public wallet; //Where ether will be sent

    constructor(
        uint256 _rate,
        address _wallet,
        IERC20 _token
    )Ownable(msg.sender){
        require(_rate > 0, "Rate must be positive");
        require(_wallet != address(0), "Invalid wallet address");
        require(address(_token) != address(0), "Invalid token address");

        rate= _rate;
        wallet = payable(_wallet);
        token = _token;
    }
    //Functions to buy tokens
    function buyTokens() public payable{
        uint256 tokensToBuy = msg.value * rate;
        require(tokensToBuy  <= token.balanceOf(address(this)), "Not enough tokens in the contract");

        //Transfer tokens to the buyer
        token.transfer(msg.sender, tokensToBuy);

        //send Ether to the wallet
        wallet.transfer(msg.value);
    }

    //owner can withdraw the leftover tokens
            function withdrawTokens(uint256 amount) public onlyOwner{
            token.transfer(owner(), amount);
        }
}