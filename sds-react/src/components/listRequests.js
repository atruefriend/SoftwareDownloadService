import React, { Component } from "react";
import Api from "../Api";
import { Form, Input, Button, List, Modal } from "semantic-ui-react";
import NewRequest from "./newRequest";

class ListRequests extends Component {
  state = {
    requests: [],
    showRequest: false,
    requestId: 0
  };
  constructor(props) {
    super(props);
    this.showRequest = false;
    this.requestId = 0;
    this.search = React.createRef();
    this.getData = this.getData.bind(this);
    this.closeRequestForm = this.closeRequestForm.bind(this);
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
      let requestsList = [];
      serviceResponse.recordset.map(record => {
        requestsList.push(
          <List.Item key={record.RequestID}>
            <List.Content>
              <List.Header as="a">{record.SoftwareName}</List.Header>
              <List.Description as="a">
                <p>tags : {record.Tags}</p>
                version : {record.Version}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      });
      this.setState({ requests: requestsList });
    }
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
