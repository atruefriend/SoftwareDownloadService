import React, { Component } from "react";
import Api from "../Api";
import {
  Form,
  Input,
  Button,
  List,
  Modal,
  Icon,
  Menu,
  Radio,
} from "semantic-ui-react";
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
    activeMenuItem: 0,
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

  handleActiveMenu(item, e) {
    this.setState({ activeMenuItem: item });
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
          <div className="col-md-6">
            <div className="col-md-12">
              <div className="content-box-header">
                <div className="panel-title">
                  <a
                    href=""
                    onClick={this.showRequestForm.bind(this, record._id, 0)}
                  >
                    {record.SoftwareName}
                  </a>
                </div>

                <div className="panel-options">#{record.Version}</div>
              </div>
              <div className="content-box-large box-with-header">
                {record.Reason}
                <br />
                <br />

                <div>
                  <ul className="subdown">
                    <li className="left">
                      {dateFormat(record.CreationDate, "mmm-ddS-yyyy")}
                    </li>
                    <li
                      className={
                        record.FreePaid == 1 ? "price free" : "price paid"
                      }
                    >
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
              </div>
            </div>
          </div>
        );
      }
    });
    this.setState({ requests: requestsList });
  }

  showRequestForm(id, requestState, e) {
    e.preventDefault();
    this.setState({ requestId: id });
    this.setState({ requestState: requestState });
    this.setState({ showRequest: true });
  }

  closeRequestForm(e) {
    this.setState({ showRequest: false });
  }

  render() {
    return (
      <React.Fragment>
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
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="logo">
                  <h1>
                    <a>Software Download Service</a>
                  </h1>
                </div>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group form">
                      <input
                        type="text"
                        name="txtSearch"
                        ref={this.search}
                        placeholder="Search..."
                        onChange={this.bindData}
                        className="form-control"
                      />
                      <span className="input-group-btn">
                        <Form.Button
                          name="btn btn-primary"
                          color="facebook"
                          onClick={this.getData}
                        >
                          Search
                        </Form.Button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group form">
                      <span className="input-group-btn">
                        <Form.Button
                          name="btnNewRequest"
                          onClick={this.showRequestForm.bind(this, 0, 0)}
                          positive
                        >
                          New Request
                        </Form.Button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-md-2">
              <Menu vertical>
                <Menu.Item>
                  <Icon name="user"></Icon>
                  <span className="heading">Nikhil Gupta</span>
                </Menu.Item>
                <Menu.Item>
                  <span className="heading">Requests</span>
                  <Menu.Menu>
                    <Menu.Item
                      name="All Requests"
                      active={this.state.activeMenuItem === 0}
                      onClick={this.handleActiveMenu.bind(this, 0)}
                    />
                    <Menu.Item
                      name="Completetd Requests"
                      active={this.state.activeMenuItem === 1}
                      onClick={this.handleActiveMenu.bind(this, 1)}
                    />
                    <Menu.Item
                      name="Pending Requests"
                      active={this.state.activeMenuItem === 2}
                      onClick={this.handleActiveMenu.bind(this, 2)}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <span className="heading">My Requests</span>
                  <Menu.Menu>
                    <Menu.Item
                      name="All Requests"
                      active={this.state.activeMenuItem === 3}
                      onClick={this.handleActiveMenu.bind(this, 3)}
                    />
                    <Menu.Item
                      name="Completetd Requests"
                      active={this.state.activeMenuItem === 4}
                      onClick={this.handleActiveMenu.bind(this, 4)}
                    />
                    <Menu.Item
                      name="Pending Requests"
                      active={this.state.activeMenuItem === 5}
                      onClick={this.handleActiveMenu.bind(this, 5)}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    name="btnNewRequest"
                    onClick={this.showRequestForm.bind(this, 0, 0)}
                    positive
                  >
                    New Request
                  </Button>
                </Menu.Item>
              </Menu>
            </div>
            <div className="col-md-10 top-spacing">
              <div className="row">{this.state.requests}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListRequests;
