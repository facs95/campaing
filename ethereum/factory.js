import web3 from './web3';
import CampaingFactory from './build/CampaingFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaingFactory.interface),
    '0x9D9EA0CB001c91F9901957D809937a25c391811f'
);

export default instance;