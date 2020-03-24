import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Select, Input, Label, Button } from "semantic-ui-react";

class NewRequest extends Component {
  formStyles = {
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20
  };

  isFreeOptions = [
    { key: 1, text: "Yes", value: 1 },
    { key: 2, text: "No", value: 2 }
  ];

  teamLeadOptions = [
    { key: 1, text: "Anil Kumar Modest", value: 1 },
    { key: 2, text: "Gaurav Sharma", value: 2 },
    { key: 3, text: "Ankit Kumar Garg", value: 3 }
  ];

  render() {
    return (
      <Form style={this.formStyles}>
        <Form.Field>
          <label>Software Name</label>
          <input type="text" placeholder="Python"></input>
        </Form.Field>
        <Form.Field>
          <label>Tags</label>
          <input type="text" placeholder="scripting, formula"></input>
        </Form.Field>
        <Form.Field>
          <label>Download url</label>
          <Input label="http://" placeholder="mysite.com" />
        </Form.Field>
        <Form.Field>
          <label>Version</label>
          <input type="text" placeholder="6.0"></input>
        </Form.Field>
        <Form.Field>
          <label>Reason</label>
          <input type="text" placeholder="Meri Marzi"></input>
        </Form.Field>
        <Form.Field>
          <label>Is Free</label>
          <Select placeholder="Is Free" options={this.isFreeOptions}></Select>
        </Form.Field>
        <Form.Field>
          <label>Team Lead</label>
          <Select
            placeholder="Team Lead"
            options={this.teamLeadOptions}
          ></Select>
        </Form.Field>
        <Form.Field>
          <Button positive>Create Request</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default NewRequest;
