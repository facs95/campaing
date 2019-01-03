import React, {Component} from 'react'
import { Button, Form, Input, Message} from 'semantic-ui-react'
import CampaingInstance from '../ethereum/campaing';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class ContributeForm extends Component {

    state = {
        value : '',
        loading: false,
        errorMessage: ''
    }
    onWait = () => {
        this.setState({loading: !this.state.loading});
    }
    
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({errorMessage: ''})
        const campaing = new CampaingInstance(this.props.address)
        const accounts = await web3.eth.getAccounts();
        this.onWait();
        try{
            await campaing.methods.contribute().send(
                {
                    from:accounts[0],
                    value: web3.utils.toWei(this.state.value, 'ether')
                }
                );
            Router.replaceRoute(`/campaing/${this.props.address}`);
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.onWait();
    }
    render() {
        return (
            <Form error={!!this.state.errorMessage} >
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        value = {this.state.value} 
                        onChange ={event => this.setState({value: event.target.value})}
                        label={{ basic: true, content: 'ETH' }}
                        labelPosition='right'
                        placeholder='Amount to contribute' />
                </Form.Field>
                <Button 
                    loading={this.state.loading}
                    onClick= {event => this.onSubmit(event, this.onWait)}
                    primary 
                > 
                    Contribute!
                </Button>
                <Message
                    error
                    header='Ups!'
                    content={this.state.errorMessage}
                />
            </Form>
        )      
    }
}

export default ContributeForm;