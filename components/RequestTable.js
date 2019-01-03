import React, {Component} from 'react'
import { Button, Message, Table, Tab} from 'semantic-ui-react'
import CampaingInstance from '../ethereum/campaing';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
import RequestRow from './RequestRow';
class ContributeForm extends Component {

    state = {
        value : '',
        loading: false,
        errorMessage: ''
    }
    // onWait = () => {
    //     this.setState({loading: !this.state.loading});
    // }
    
    // onSubmit = async (event) => {
    //     event.preventDefault();
    //     this.setState({errorMessage: ''})
    //     const campaing = new CampaingInstance(this.props.address)
 
    // }
    onApprove = async (event) => {
        event.preventDefault();
        this.setState({errorMessage:''});
        const campaing = new CampaingInstance(this.props.address);
        await campaing.methods.approveRequest()
    }

    renderRow = () => {
        const {request,approversCount} = this.props;
        return request.map((requests, index) => {
            return <RequestRow key={index}
                address={this.props.address}
                id={index} 
                request={requests}
                approversCount={approversCount}>
            </RequestRow>
        })

    }
    render() {
        const {Header, Row, HeaderCell, Body} = Table;
        return (
            <Table celled >
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRow()}
                </Body>
            </Table>
        )      
    }
}

export default ContributeForm;