import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Grid } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import AddRequestForm from '../../../components/addRequestForm';
class newRequest extends Component {
    static async getInitialProps(props) {
        return {
            address: props.query.address
        };
    }

    render (){
        
        return (
            <Layout>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <h1 style={{display: 'flex', justifyContent: 'center', paddingBottom: '20px', paddingTop:'15px'}}>Create a new request!</h1>
                        <AddRequestForm address={this.props.address}></AddRequestForm>
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default newRequest;