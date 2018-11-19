import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
 //we are in the browser
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server *or* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/64d33447ee794a7abb3b20a340020c76'
    );

    web3 = new Web3(provider);
}
export default web3;