import React, {Component} from 'react';
import factory from '../ethereum/factory';
import {Card} from 'semantic-ui-react';
import Layout from '../components/Layout';
import AddButton from '../components/AddButton'
import {Link} from '../routes';

class CampaignIndex extends Component {
    
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns: campaigns};
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description:( 
                <Link route= {`/campaing/${address}`}>
                    <a>View Campaing</a>
                </Link>),
                fluid: true
            };
        });

        return <Card.Group items={items} ></Card.Group>
    }

    render(){
        return ( 
        <Layout>
            <div>
                <h3>Open Campaings!</h3>
                <AddButton></AddButton>
                {this.renderCampaigns()}
            </div>
        </Layout>
        )
    }
}


export default CampaignIndex;