import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Select, Input, Label, Button } from "semantic-ui-react";

class NewRequest extends Component {
  state = {
    softwareName: "",
    tags: "",
    downloadUrl: "",
    version: "",
    reason: "",
    isFree: 1,
    teamLead: ""
  };
  constructor(props) {
    super(props);
    this.state.softwareName = "";
    this.state.tags = "";
    this.state.downloadUrl = "";
    this.state.version = "";
    this.state.reason = "";
    this.state.isFree = 1;
    this.state.teamLead = "";
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }
  formStyles = {
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20
  };

  isFreeOptions = [
    { key: 1, text: "Free", value: 1 },
    { key: 2, text: "Paid", value: 2 }
  ];

  teamLeadOptions = [
    { key: 1, text: "Anil Kumar Modest", value: 1 },
    { key: 2, text: "Gaurav Sharma", value: 2 },
    { key: 3, text: "Ankit Kumar Garg", value: 3 }
  ];

  handleChangeValue(e) {
    const target = e.target;
    const name = target.name;

    switch (name) {
      case "txtSoftwareName":
        this.setState({ softwareName: target.value });
        break;
      case "txtTags":
        this.setState({ tags: target.value });
        break;
      case "txtDownloadUrl":
        this.setState({ downloadUrl: target.value });
        break;
      case "txtVersion":
        this.setState({ version: target.value });
        break;
      case "txtReason":
        this.setState({ reason: target.value });
        break;
      case "cmbIsFree":
        this.setState({ isFree: target.value });
        break;
      case "cmbTeamLead":
        this.setState({ teamLead: target.value });
        break;
    }
  }

  render() {
    return (
      <Form style={this.formStyles}>
        <Form.Field>
          <label>Software Name</label>
          <input
            name="txtSoftwareName"
            type="text"
            placeholder="Python"
            value={this.state.softwareName}
            onChange={this.handleChangeValue}
          ></input>
        </Form.Field>
        <Form.Field>
          <label>Tags</label>
          <input
            name="txtTags"
            type="text"
            placeholder="scripting, formula"
            value={this.state.tags}
            onChange={this.handleChangeValue}
          ></input>
        </Form.Field>
        <Form.Field>
          <label>Download url</label>
          <Input
            name="txtDownloadUrl"
            label="http://"
            placeholder="mysite.com"
            value={this.state.downloadUrl}
            onChange={this.handleChangeValue}
          />
        </Form.Field>
        <Form.Field>
          <label>Version</label>
          <input
            name="txtVersion"
            type="text"
            placeholder="6.0"
            value={this.state.version}
            onChange={this.handleChangeValue}
          ></input>
        </Form.Field>
        <Form.Field>
          <label>Reason</label>
          <input
            name="txtReason"
            type="text"
            placeholder="Meri Marzi"
            value={this.state.reason}
            onChange={this.handleChangeValue}
          ></input>
        </Form.Field>
        <Form.Field>
          <Select
            name="cmbIsFree"
            placeholder="Is Free"
            options={this.isFreeOptions}
            value={this.state.isFree}
            onChange={this.handleChangeValue}
          ></Select>
        </Form.Field>
        <Form.Field>
          <Select
            name="cmbTeamLead"
            placeholder="Team Lead"
            options={this.teamLeadOptions}
            value={this.state.teamLead}
            onChange={this.handleChangeValue}
          ></Select>
        </Form.Field>
        <Form.Field>
          <Button name="btnCreateReq" positive>
            Create Request
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default NewRequest;
