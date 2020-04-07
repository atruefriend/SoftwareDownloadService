import React, { Component } from "react";
import Api from "../Api";
import { Form, Input, Button, List, Modal, Icon } from "semantic-ui-react";
import NewRequest from "./newRequest";
import dateFormat from "dateformat";
import "../main.css";

class ListRequests extends Component {
  state = {
    requests: [],
    requestData: {},
    showRequest: false,
    requestId: 0,
    requestState: 0,
  };
  constructor(props) {
    super(props);
    this.state.requestData = {};
    this.showRequest = false;
    this.requestId = 0;
    this.requestState = 0;
    this.search = React.createRef();
    this.getData = this.getData.bind(this);
    this.closeRequestForm = this.closeRequestForm.bind(this);
    this.bindData = this.bindData.bind(this);
    this.processRequest = this.processRequest.bind(this);
  }

  componentDidMount() {
    //debugger;
    this.getData();
    this.processRequest();
  }

  processRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams !== "" && urlParams !== null && urlParams !== undefined) {
      const requestId = urlParams.get("requestId");
      const stateId = urlParams.get("stateId");
      console.log(requestId + "  " + stateId);
      if (requestId !== null) {
        this.showRequestForm(requestId, stateId);
      }
    }
  }

  async getData(e) {
    let serviceResponse = null;
    const s = this.search.current.value;
    const params = [{ name: "softwareName", value: s }];
    try {
      await Api.GetData("getRequests", params).then((response) => {
        serviceResponse = response;
      });
      if (serviceResponse !== null && serviceResponse !== undefined) {
        this.setState({ requestData: serviceResponse });
        this.bindData();
      }
    } catch (err) {
      console.log("Not able to connect service");
    }
  }

  bindData(e) {
    let requestsList = [];
    const s = this.search.current.value.toUpperCase();
    this.state.requestData.map((record) => {
      if (record.SoftwareName.toUpperCase().includes(s)) {
        requestsList.push(
          <List.Item className="item" key={record._id}>
            <List.Content>
              <List.Header
                onClick={this.showRequestForm.bind(this, record._id, 0)}
                as="a"
              >
                {record.SoftwareName}
              </List.Header>
              <p>{record.Version}</p>
              <List.Description as="div">
                <div>
                  <p>{record.Reason}</p>
                </div>
                <div>
                  <ul className="subdown">
                    <li className="left">
                      {dateFormat(record.CreationDate, "mmm-ddS-yyyy")}
                    </li>
                    <li className="price">
                      {record.FreePaid == 1 ? "Free" : "Paid"}
                    </li>
                    <li className="right">{record.Tags}</li>
                  </ul>
                </div>
                <div>
                  <Button
                    disabled={record.RequestState.State === 4 ? false : true}
                    color="vk"
                  >
                    <Icon name="download" /> Download
                  </Button>
                </div>
              </List.Description>
            </List.Content>
          </List.Item>
        );
      }
    });
    this.setState({ requests: requestsList });
  }

  showRequestForm(id, requestState, e) {
    this.setState({ requestId: id });
    this.setState({ requestState: requestState });
    this.setState({ showRequest: true });
  }

  closeRequestForm(e) {
    this.setState({ showRequest: false });
  }

  render() {
    return (
      <Form className="customform">
        <Form.Group>
          <input
            type="text"
            name="txtSearch"
            ref={this.search}
            placeholder="Search..."
            onChange={this.bindData}
            className="search"
          />
          <Form.Button name="btnSearch" color="facebook" onClick={this.getData}>
            Search
          </Form.Button>
          <Form.Button
            name="btnNewRequest"
            onClick={this.showRequestForm.bind(this, 0, 0)}
            positive
          >
            New Request
          </Form.Button>
          <Modal
            open={this.state.showRequest}
            onClose={this.closeRequestForm}
            size="small"
          >
            <Modal.Content>
              <NewRequest
                requestId={this.state.requestId}
                requestState={this.state.requestState}
                closeForm={this.closeRequestForm}
              ></NewRequest>
            </Modal.Content>
          </Modal>
        </Form.Group>
        <Form.Field>
          <List name="lstRequests" divided relaxed>
            {this.state.requests}
          </List>
        </Form.Field>
      </Form>
    );
  }
}

export default ListRequests;
