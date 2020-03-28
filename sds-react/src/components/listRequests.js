import React, { Component } from "react";
import Api from "../Api";
import { Form, Input, Button } from "semantic-ui-react";
import NewRequest from "./newRequest";

class ListRequests extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  formStyles = {
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20
  };
  componentDidMount() {
    //debugger;
    //
  }
  getData(e) {
    const requests = Api.GetData("getRequests", null);
    console.log(requests);
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
      </Form>
    );
  }
}

export default ListRequests;
