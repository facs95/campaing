pragma solidity ^0.4.17;

contract CampaingFactory {
    address[] public deployedCampaigns;
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaing(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns()public view returns(address[]){
        return deployedCampaigns;
    }
    
}


contract Campaing {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool)approvers;
    uint public approversCount;
    
    
    modifier restricted() {
        require(msg.sender == manager, "Not authorized");
        _;
    }
    
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    
    function contribute()  public payable{
        require(msg.value > minimumContribution, "Insufficient Funds");
        approvers[msg.sender] = true;
        approversCount++;
        
    }
    
    function createRequest(string description,uint value,address recipient)
        public restricted{
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            approvalCount: 0,
            complete: false
        });
        
        requests.push(newRequest);
        
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender] == true, "Must be sender");
        require(!requests[index].approvals[msg.sender], "Should be first approval");
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2), "approvalcount");
        require(!request.complete, "request.complete");
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (uint,uint,uint,address,uint){
        return (
            minimumContribution,
            approversCount,
            address(this).balance,
            manager,
            requests.length
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
    
}



