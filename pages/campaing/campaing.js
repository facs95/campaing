import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaing from '../../ethereum/campaing'
import { Card, Button, Grid } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';

class showCampaing extends Component {
    static async getInitialProps(props) {
        const campaing = new Campaing(props.query.address);
        const summary = await campaing.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            approversCount: summary[1],
            balance: summary[2],
            managerAdress: summary[3],
            requestCount: summary[4]
        };
    }

    renderCampaingSummary(){
        const items = [
            {
              header: web3.utils.fromWei(this.props.minimumContribution, 'ether'),
              description: 'Minimum possible contribution to this campaing',
              meta: 'Minimum Contribution',
            },
            {
              header: web3.utils.fromWei(this.props.balance, 'ether'),
              description: 'Total Balance of this campaing so far, help make it better!',
              meta: 'Total Balance',
            },
            {
                href:`/campaing/${this.props.address}/request`,  
              header: this.props.requestCount,
              description:
                'Total requests so far.',
              meta: 'Requests',
            },
            {
                header: this.props.approversCount,
                description:
                  'Total nunmber of contributors to this campaign, you can become part of this list!',
                meta: 'Contributors',
              },
          ]
        
        return <Card.Group items={items} />
    }

    
    render () {
        
        return (
            <Layout>
                <h2 style={{display: 'flex', justifyContent: 'center', paddingBottom: '20px'}}>Welcome to {this.props.address} Campaing!!</h2>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCampaingSummary()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}></ContributeForm>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaing/${this.props.address}/request`}>
                                <Button primary> View Requests </Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default showCampaing