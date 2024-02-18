
require('@nomiclabs/hardhat-waffle');

//chainstack  https://nd-030-728-955.p2pify.com/8bdf19c8c8d900a6212a1da413b0333f
//alchamy  https://eth-sepolia.g.alchemy.com/v2/XxDsEUlX1eSMbZEKtjyFWM0itBm7n2Uj
module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia:{
      url: 'https://nd-030-728-955.p2pify.com/8bdf19c8c8d900a6212a1da413b0333f',
      accounts: [ 'f1b783c595f67cd1f1700fa0638dd9f6483177f5760d114e75d2b31588ba5618' ]
    }
  }
};

// contract Address = 0x07f4A27B7821a5A75a48Cc084d78D93eE805BD34