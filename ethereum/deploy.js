const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaingFactory.json');

const provider = new HDWalletProvider(
    'purpose nice fashion rebuild craft pair half task magic away wisdom hockey',
    'https://rinkeby.infura.io/v3/64d33447ee794a7abb3b20a340020c76'
);

const web3 = new Web3(provider);

const deploy = async () => {
    console.log('Starting deployment');
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({gas: '5000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
};

deploy();