import React, {Component} from 'react'
import { Button, Message, Table, Tab} from 'semantic-ui-react'
import CampaingInstance from '../ethereum/campaing';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class RequestRow extends Component {
    state = {
        loadingApprove: false,
        loadingFinalize: false,
        errorMessage:'',
    }
    onWaitApprove () {
        this.setState({loadingApprove:!this.state.loadingApprove});
    }
    onWaitFinalize () {
        this.setState({loadingFinalize: !this.state.loadingFinalize});
    }

    onApprove = async (event) =>{
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const campaing = CampaingInstance(this.props.address);
        this.setState({errorMessage: ''});
        this.onWaitApprove();
        try{
            await campaing.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.replaceRoute(`/campaing/${this.props.address}/request`);
        } catch(err){
            this.setState({errorMessage: err.value});
        }
        this.onWaitApprove();
    }

    onFinalize = async(event) =>{
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const campaing = CampaingInstance(this.props.address);
        this.setState({errorMessage: ''});
        this.onWaitFinalize();
        try{
            await campaing.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.replaceRoute(`/campaing/${this.props.address}/request`);
        } catch(err){
            this.setState({errorMessage: err.value});
        }
        this.onWaitFinalize();
    }
 
    render() {
        const { Row, Cell} = Table;
        const {request, approversCount} = this.props;
        const ready = request.approvalCount > (approversCount/2);
        return (
            <Row disabled={request.complete} positive={ready && !request.complete} >
                <Cell>{this.props.id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    { request.complete ? null:(
                        <Button color='green' loading={this.state.loadingApprove} onClick={event => this.onApprove(event)}>Approve</Button>

                    )}
                </Cell>
                <Cell>
                    { request.complete ? null:(
                    <Button color='red' loading={this.state.loadingFinalize} onClick={event => this.onFinalize(event)}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;