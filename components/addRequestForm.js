import React, {Component} from 'react'
import { Button, Form, Input, Message} from 'semantic-ui-react'
import CampaingInstance from '../ethereum/campaing';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class addRequestForm extends Component {

    state = {
        description : '',
        amount:'',
        recipient: '',
        loading: false,
        errorMessage: '',
    }
    onSubmit = async () => {
        event.preventDefault();
        const campaing = new CampaingInstance(this.props.address);
        const accounts = await web3.eth.getAccounts();
        this.setState({errorMessage: ''})
        this.onWait();
        try {
            console.log(this.props.address);
            await campaing.methods.createRequest(
                    this.state.description, 
                    web3.utils.toWei(this.state.amount, 'ether'), 
                    this.state.recipient).send(
                {
                    from:accounts[0]
                });
            Router.pushRoute(`/campaing/${this.props.address}/request`);
        } catch(err){
            this.setState({errorMessage: err.message});
        }
        this.onWait();
    }
    onWait = () => {
        this.setState({loading: !this.state.loading});
    }

    onInputChange = () => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    render() {
        return (
            <Form error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input name = "description" 
                        value = {this.state.description} 
                        onChange ={event => this.onInputChange(event)} 
                        placeholder='Description' />
                </Form.Field>
                <Form.Field>
                    <label>Amount</label>
                    <Input
                        name = "amount"
                        value = {this.state.amount} 
                        onChange ={event => this.onInputChange(event)}  
                        placeholder='Amount' label={{ basic: true, content: 'ETH' }} labelPosition='right'/>
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        name = 'recipient'
                        value = {this.state.recipient} 
                        onChange ={event => this.onInputChange(event)} 
                        placeholder='Recipient'/>
                </Form.Field>
                <Button  
                    loading={this.state.loading}
                    onClick= {event => this.onSubmit(event, this.onWait)}
                    primary fluid>Create Request!</Button>
                <Message
                    error
                    header='Ups!'
                    content={this.state.errorMessage}
                />
            </Form>
        )      
    }
}

export default addRequestForm;