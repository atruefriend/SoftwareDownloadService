import React, { Component } from "react";
import ReactDom from "react-dom";
import "semantic-ui-css/semantic.min.css";
import Api from "../Api";
import {
  Form,
  Select,
  Input,
  Label,
  Button,
  TextArea,
  Modal,
  Header
} from "semantic-ui-react";

class NewRequest extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.requestId = props.requestId;
    this.close = props.closeForm;
    this.state.softwareName = "";
    this.state.tags = "";
    this.state.downloadUrl = "";
    this.state.version = "";
    this.state.reason = "";
    this.state.isFree = 1;
    this.state.teamLead = 0;
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.createNewRequest = this.createNewRequest.bind(this);
    this.renderRequiredField = this.renderRequiredField.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.getRequestForRequestId = this.getRequestForRequestId.bind(this);
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

  renderRequiredField(props) {
    if (props.name === "softwareName") {
      if (this.state.softwareName === "") {
        return (
          <Label basic color="red" pointing>
            Please enter a software name.
          </Label>
        );
      } else {
        return null;
      }
    } else if (props.name === "reason") {
      if (this.state.reason === "") {
        return (
          <Label basic color="red" pointing>
            Please enter a reason, why you want this software.
          </Label>
        );
      } else {
        return null;
      }
    } else if (props.name === "teamLead") {
      if (this.state.teamLead === 0) {
        return (
          <Label basic color="red" pointing>
            Please select your team lead.
          </Label>
        );
      } else {
        return null;
      }
    }
    return null;
  }

  async getRequestForRequestId(e) {
    if (this.requestId !== 0) {
      const params = [{ name: "requestId", value: this.requestId }];
      const serviceResponse = await Api.GetData("getRequests", params);
      if (serviceResponse !== null && serviceResponse !== undefined) {
        const requestData = serviceResponse.recordset[0];
        this.updateState("txtSoftwareName", requestData.SoftwareName);
        this.updateState("txtTags", requestData.Tags);
        this.updateState("txtDownloadUrl", requestData.DownloadUrl);
        this.updateState("txtVersion", requestData.Version);
        this.updateState("txtReason", requestData.Reason);
        this.updateState("cmbIsFree", requestData.FreePaid);
        this.updateState("cmbTeamLead", requestData.TeamLead);
      }
    }
  }

  componentDidMount() {
    this.getRequestForRequestId();
  }

  createNewRequest(e) {
    if (this.validate(e)) {
      const res = Api.PostData("newRequest", this.buildData());
      alert("Request created successfully!");
      this.props.closeForm();
    } else {
      //error;
      alert("Please resolve form errors");
    }
  }

  buildData() {
    const data = {
      softwareName: this.state.softwareName,
      tags: this.state.tags,
      downloadUrl: this.state.downloadUrl,
      version: this.state.version,
      reason: this.state.reason,
      isFree: this.state.isFree,
      teamLead: this.state.teamLead
    };
    return JSON.stringify(data);
  }

  validate(e) {
    if (
      this.state.softwareName === "" ||
      this.state.reason === "" ||
      this.state.teamLead === 0
    ) {
      return false;
    }
    return true;
  }

  handleSelectionChange(e, data) {
    const name = data.name;
    const value = data.value;
    this.updateState(name, value);
  }

  handleChangeValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.updateState(name, value);
  }

  updateState(name, value) {
    switch (name) {
      case "txtSoftwareName":
        this.setState({ softwareName: value });
        break;
      case "txtTags":
        this.setState({ tags: value });
        break;
      case "txtDownloadUrl":
        this.setState({ downloadUrl: value });
        break;
      case "txtVersion":
        this.setState({ version: value });
        break;
      case "txtReason":
        this.setState({ reason: value });
        break;
      case "cmbIsFree":
        this.setState({ isFree: value });
        break;
      case "cmbTeamLead":
        this.setState({ teamLead: value });
        break;
      default:
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
          <this.renderRequiredField name="softwareName"></this.renderRequiredField>
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
          <TextArea
            name="txtReason"
            type="text"
            placeholder="Meri Marzi"
            value={this.state.reason}
            onChange={this.handleChangeValue}
          ></TextArea>
          <this.renderRequiredField name="reason"></this.renderRequiredField>
        </Form.Field>
        <Form.Field>
          <Select
            name="cmbIsFree"
            placeholder="Is Free"
            options={this.isFreeOptions}
            onChange={this.handleSelectionChange}
          ></Select>
        </Form.Field>
        <Form.Field>
          <Select
            name="cmbTeamLead"
            placeholder="Team Lead"
            options={this.teamLeadOptions}
            onChange={this.handleSelectionChange}
          ></Select>
          <this.renderRequiredField name="teamLead"></this.renderRequiredField>
        </Form.Field>
        <Form.Field>
          <Button name="btnCreateReq" positive onClick={this.createNewRequest}>
            Create Request
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default NewRequest;
