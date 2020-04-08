import React, { Component } from "react";
import ReactDom from "react-dom";
import Api from "../Api";
import "semantic-ui-css/semantic.min.css";
import {
  Form,
  Select,
  Input,
  Label,
  Button,
  TextArea,
  Modal,
  Header,
} from "semantic-ui-react";

class NewRequest extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.requestId = props.requestId;
    this.requestState = Number(props.requestState);
    this.state.softwareName = "";
    this.state.tags = "";
    this.state.downloadUrl = "";
    this.state.version = "";
    this.state.reason = "";
    this.state.isFree = "";
    this.state.teamLead = "";
    this.state.downloadLocation = "";
    this.state.comments = "";
    this.state.hideBtnCreateRequest = "show";
    this.state.hideComments = "hide";
    this.state.hideDownloadLocation = "hide";
    this.state.hideBtnApprove = "hide";
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.createNewRequest = this.createNewRequest.bind(this);
    this.renderRequiredField = this.renderRequiredField.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.getRequestForRequestId = this.getRequestForRequestId.bind(this);
  }
  formStyles = {
    marginRight: 20,
    marginTop: 20,
    marginLeft: 20,
  };

  isFreeOptions = [
    { key: 1, text: "Free", value: 1 },
    { key: 2, text: "Paid", value: 2 },
  ];

  teamLeadOptions = [
    { key: 1, text: "Anil Kumar Modest", value: 1 },
    { key: 2, text: "Gaurav Sharma", value: 2 },
    { key: 3, text: "Ankit Kumar Garg", value: 3 },
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
      if (this.state.teamLead === "") {
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
    try {
      if (this.requestId !== 0) {
        const params = [{ name: "requestId", value: this.requestId }];
        const serviceResponse = await Api.GetData("getRequests", params);
        let reqState = 0;
        if (serviceResponse !== null && serviceResponse !== undefined) {
          const requestData = serviceResponse;
          reqState = requestData.RequestState.StateID;
          this.updateState("txtSoftwareName", requestData.SoftwareName);
          this.updateState("txtTags", requestData.Tags);
          this.updateState("txtDownloadUrl", requestData.DownloadUrl);
          this.updateState("txtVersion", requestData.Version);
          this.updateState("txtReason", requestData.Reason);
          this.updateState("cmbIsFree", requestData.FreePaid);
          this.updateState("cmbTeamLead", requestData.TeamLead);
        }
        this.setState({ hideBtnCreateRequest: "hide" });
        this.setState({ hideDownloadLocation: "hide" });
        this.setState({ hideComments: "hide" });
        this.setState({ hideBtnApprove: "hide" });
        if (this.requestState >= reqState) {
          if (this.requestState == 1) {
            this.setState({ hideBtnCreateRequest: "hide" });
            this.setState({ hideDownloadLocation: "hide" });
            this.setState({ hideComments: "show" });
            this.setState({ hideBtnApprove: "show" });
          } else if (this.requestState == 2) {
            this.setState({ hideBtnCreateRequest: "hide" });
            this.setState({ hideDownloadLocation: "show" });
            this.setState({ hideComments: "show" });
            this.setState({ hideBtnApprove: "show" });
          } else if (
            this.requestState == 3 ||
            this.requestState == 4 ||
            this.requestState == 5
          ) {
            this.setState({ hideBtnCreateRequest: "hide" });
            this.setState({ hideDownloadLocation: "show" });
            this.setState({ hideComments: "show" });
            this.setState({ hideBtnApprove: "hide" });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getRequestForRequestId();
  }

  async createNewRequest(e) {
    if (this.validate(e)) {
      const res = await Api.PostData("newRequest", this.buildData());
      alert("Request created successfully!");
      if (this.props.closeForm !== null) {
        this.props.closeForm();
      }
    } else {
      //error;
      alert("Please resolve form errors");
    }
  }

  async approveRequest(isApprove, e) {
    if (this.requestId !== 0) {
      try {
        let stateId = this.requestState;
        if (isApprove) {
          if (this.requestState === 1) {
            stateId = 2;
          } else if (this.requestState === 2) {
            stateId = 4;
          }
        } else {
          if (this.requestState === 1) {
            stateId = 3;
          } else if (this.requestState === 2) {
            stateId = 5;
          }
        }
        const params = {
          requestId: this.requestId,
          comments: this.state.comments,
          downloadLocation: this.state.downloadLocation,
          stateId: stateId,
        };

        const res = await Api.PostData(
          "approveRequest",
          JSON.stringify(params)
        );
        alert("Request " + (isApprove ? "Approved!" : "Rejected!"));
        if (this.props.closeForm !== null) {
          this.props.closeForm();
        }
      } catch (err) {
        console.log("Error occurred " + err);
      }
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
      teamLead: this.state.teamLead,
    };
    return JSON.stringify(data);
  }

  validate(e) {
    if (
      this.state.softwareName === "" ||
      this.state.reason === "" ||
      this.state.teamLead === ""
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
      case "txtComments":
        this.setState({ comments: value });
        break;
      case "txtDlownloadLocation":
        this.setState({ downloadLocation: value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <h2 className="ui heading no-anchor">Software Request</h2>
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
              placeholder="Free/Paid"
              options={this.isFreeOptions}
              onChange={this.handleSelectionChange}
              value={this.state.isFree}
            ></Select>
          </Form.Field>
          <Form.Field>
            <Select
              name="cmbTeamLead"
              placeholder="Team Lead"
              options={this.teamLeadOptions}
              onChange={this.handleSelectionChange}
              value={this.state.teamLead}
            ></Select>
            <this.renderRequiredField name="teamLead"></this.renderRequiredField>
          </Form.Field>

          <Form.Field className={this.state.hideBtnCreateRequest}>
            <Button
              disabled={this.requestId === 0 ? false : true}
              name="btnCreateReq"
              positive
              onClick={this.createNewRequest}
            >
              Create Request
            </Button>
          </Form.Field>
          <Form.Field className={this.state.hideComments}>
            <label>Comments</label>
            <TextArea
              name="txtComments"
              type="text"
              placeholder="It's Okay!"
              value={this.state.comments}
              onChange={this.handleChangeValue}
            ></TextArea>
          </Form.Field>
          <Form.Field className={this.state.hideDownloadLocation}>
            <label>Download Location</label>
            <input
              name="txtDlownloadLocation"
              type="text"
              placeholder="Python"
              value={this.state.downloadLocation}
              onChange={this.handleChangeValue}
            ></input>
          </Form.Field>
          <Form.Field className={this.state.hideBtnApprove}>
            <Button.Group>
              <Button
                name="btnReject"
                onClick={this.approveRequest.bind(this, false)}
              >
                Reject
              </Button>
              <Button.Or />
              <Button
                name="btnApproved"
                positive
                onClick={this.approveRequest.bind(this, true)}
              >
                Approved
              </Button>
            </Button.Group>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default NewRequest;
