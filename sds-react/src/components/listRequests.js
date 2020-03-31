import React, { Component } from "react";
import Api from "../Api";
import { Form, Input, Button, List, Modal } from "semantic-ui-react";
import NewRequest from "./newRequest";

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
          <List.Item key={record.RequestID}>
            <List.Content>
              <List.Header as="a">{record.SoftwareName}</List.Header>
              <List.Description as="a">
                <div>
                  <p>tags : {record.Tags}</p>
                  version : {record.Version}
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
        <Form.Group widths="equal">
          <input
            type="text"
            defaultValue=""
            fluid
            name="txtSearch"
            ref={this.search}
            placeholder="Search..."
            onChange={this.bindData}
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
