import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Button, Grid} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaing from '../../../ethereum/campaing';
import RequestTable from '../../../components/RequestTable';
class Request extends Component {
    
    static async getInitialProps(props) {
        const campaing = new Campaing(props.query.address);
        const summary = await campaing.methods.getSummary().call();
        const requestCount = await campaing.methods.getRequestCount().call();
        const request = await  Promise.all(
            Array(parseInt(requestCount)).fill().map( (element,index) => {
                return campaing.methods.requests(index).call();
            }
        ));
        // console.log(requestCount);
        console.log(request);
        return {
            request: request, 
            address: props.query.address,
            approversCount: summary[1],
            managerAdress: summary[3],
            requestCount: summary[4]
        };
    }

    render (){
        
        return (
            <Layout>
                <Grid columns={2} style={{paddingTop:'10px'}}>
                    <Grid.Column floated='left' width={10}>
                        <h1>All the request for this campaing!</h1>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                        <Link route={`/campaing/${this.props.address}/request/newRequest`}>
                            <a>
                                <Button primary>Create New Request</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                    <RequestTable 
                        address={this.props.address}
                        approversCount={this.props.approversCount}
                        requestCount={this.props.requestCount} 
                        request={this.props.request}>
                    </RequestTable>
                </Grid>

            </Layout>
        )
    }
}

export default Request;