import web3 from './web3';
import CampaingFactory from './build/CampaingFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaingFactory.interface),
    '0x9e04F6C9859aeF1DA46fEcE9F84352F317E2c1C4'
);

export default instance;