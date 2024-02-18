
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia:{
      url: 'https://eth-sepolia.g.alchemy.com/v2/XxDsEUlX1eSMbZEKtjyFWM0itBm7n2Uj',
      accounts: [ 'f1b783c595f67cd1f1700fa0638dd9f6483177f5760d114e75d2b31588ba5618' ]
    }
  }
};