import React, { Component } from "react";
import Api from "../Api";
import { Form, Input, Button, List } from "semantic-ui-react";
import NewRequest from "./newRequest";

class ListRequests extends Component {
  state = {
    requests: []
  };
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
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
    await Api.GetData("getRequests", null).then(response => {
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

  render() {
    return (
      <Form style={this.formStyles}>
        <Form.Group widths="equal">
          <Form.Input fluid name="txtSearch" placeholder="Search..." />
          <Form.Button name="btnSearch" color="facebook" onClick={this.getData}>
            Search
          </Form.Button>
          <Form.Button name="btnNewRequest" positive>
            New Request
          </Form.Button>
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
