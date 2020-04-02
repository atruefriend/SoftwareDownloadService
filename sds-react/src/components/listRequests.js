import React, { Component } from "react";
import Api from "../Api";
import { Form, Input, Button, List, Modal, Icon } from "semantic-ui-react";
import NewRequest from "./newRequest";
import username from "username";
import dateFormat from "dateformat";
import "../main.css";

class ListRequests extends Component {
  state = {
    requests: [],
    requestData: {},
    showRequest: false,
    requestId: 0
  };
  constructor(props) {
    super(props);
    this.state.requestData = {};
    this.showRequest = false;
    this.requestId = 0;
    this.search = React.createRef();
    this.getData = this.getData.bind(this);
    this.closeRequestForm = this.closeRequestForm.bind(this);
    this.bindData = this.bindData.bind(this);
  }
  formStyles = {
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20
  };
  componentDidMount() {
    //debugger;
    //
    this.getData();
    this.getUserName();
  }
  async getUserName() {
    console.log(await username());
  }
  async getData(e) {
    let serviceResponse = null;
    const s = this.search.current.value;
    const params = [{ name: "softwareName", value: s }];
    await Api.GetData("getRequests", params).then(response => {
      serviceResponse = response;
    });
    if (serviceResponse !== null && serviceResponse !== undefined) {
      this.setState({ requestData: serviceResponse });
      this.bindData();
    }
  }

  bindData(e) {
    let requestsList = [];
    const s = this.search.current.value.toUpperCase();
    this.state.requestData.recordset.map(record => {
      if (record.SoftwareName.toUpperCase().includes(s)) {
        requestsList.push(
          <List.Item className="item" key={record.RequestID}>
            <List.Content>
              <List.Header
                onClick={this.showRequestForm.bind(this, record.RequestID)}
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
                    disabled={record.State === 4 ? false : true}
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

  showRequestForm(id, e) {
    this.setState({ requestId: id });
    this.setState({ showRequest: true });
  }

  closeRequestForm(e) {
    this.setState({ showRequest: false });
  }

  render() {
    return (
      <Form style={this.formStyles}>
        <Form.Group>
          <input
            type="text"
            fluid
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
            onClick={this.showRequestForm.bind(this, 0)}
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
