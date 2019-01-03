import React, {Component} from 'react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import { Button, Form, Message, Input} from 'semantic-ui-react';
import {Router} from '../../routes.js';

class newCampaing extends Component {
    state = {
        minimumContributtion: '',
        errorMessage: '',
        transactionInProgress: false
    }
    onInputChange = (event) => {
        this.setState({minimumContributtion: event.target.value});
    }
    onWait = () => {
        this.setState({transactionInProgress: !this.state.transactionInProgress})
    }
    onSubmit = async (event, onWait) => {
        event.preventDefault();
        this.setState({errorMessage: ''});
        const accounts = await web3.eth.getAccounts();
        this.onWait();
        try{
            await factory.methods.createCampaign(web3.utils.toWei(this.state.minimumContributtion, 'ether'))
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.onWait();
    };

    render () {
        return (
            <Layout>
                <h3>Create a new campaing!!</h3>
                <Form 
                error={!!this.state.errorMessage} 
                onSubmit={event => this.onSubmit(event, this.onWait)} 
                loading={this.state.transactionInProgress}
                >
                    <Form.Field>
                        <label>Minimum Contributtion</label>
                        <Input 
                            label= 'ETH' 
                            labelPosition='right' 
                            placeholder='0.000'
                            value = {this.state.minimumContributtion}    
                            onChange={event => this.onInputChange(event)}
                        >
                        </Input>
                        <Message
                            error
                            header='Ups!'
                            content={this.state.errorMessage}
                        />
                    </Form.Field>
                    <Button primary>Submit</Button>
                </Form>
            </Layout>
        );
    }
}

export default  newCampaing;
