import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Modal,
  Label,
  Button,
  Form,
  Input,
  Col,
  Row

} from "reactstrap"
import { addCountry } from "./../../backend/backend_helper"

import CountresTable from './CountresTable'
class Dashboard extends Component {

  state = {
    isOpen: false,
    data: {},
    done: false
  }

  save = () => {

    addCountry(this.state.data).then(() => {
      this.setState({
        isOpen: false,
        data: {},
        done: true
      })
    })

  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>abc task | countries</title>
          </MetaTags>
          <Container fluid>
            <h4>countries</h4>
            <button
              style={{
              marginBottom:30,
              marginTop:20
              }}
              onClick={() => this.setState({ isOpen: true })}
              type="button"
              className="btn btn-success "
            >
              <i className="bx bx-plus font-size-16 align-middle me-2"></i>{" "}
                      Add Country
                    </button>
            <CountresTable getCountries={{ flag: this.state.done, cb: () => this.setState({ done: false }) }} />
          </Container>
          <Modal
            isOpen={this.state.isOpen}
            toggle={() => {
              this.setState({ isOpen: !this.state.isOpen })
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Add Country
                            </h5>
              <button
                type="button"
                onClick={() => {
                  this.setState({ isOpen: false })
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>


                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-3 col-form-label"
                  >
                    name
                      </Label>
                  <Col sm={9}>
                    <Input
                      value={this.state.data.name}
                      onChange={(data) => { this.setState({ data: { ...this.state.data, name: data.target.value } }) }}
                      type="email"
                      className="form-control"
                      id="horizontal-email-Input"
                    />
                  </Col>
                </div>

                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-3 col-form-label"
                  >
                    name AR
                      </Label>
                  <Col sm={9}>
                    <Input
                      value={this.state.data.nameAR}
                      onChange={(data) => { this.setState({ data: { ...this.state.data, nameAR: data.target.value } }) }}
                      type="email"
                      className="form-control"
                      id="horizontal-email-Input"
                    />
                  </Col>
                </div>

                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-3 col-form-label"
                  >
                    flag
                      </Label>
                  <Col sm={9}>
                    <Input
                      value={this.state.data.flag}
                      onChange={(data) => { this.setState({ data: { ...this.state.data, flag: data.target.value } }) }}
                      type="email"
                      className="form-control"
                      id="horizontal-email-Input"
                    />
                  </Col>
                </div>

                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-3 col-form-label"
                  >
                    currency
                      </Label>
                  <Col sm={9}>
                    <Input
                      value={this.state.data.currency}
                      onChange={(data) => { this.setState({ data: { ...this.state.data, currency: data.target.value } }) }}
                      type="email"
                      className="form-control"
                      id="horizontal-email-Input"
                    />
                  </Col>
                </div>

                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-3 col-form-label"
                  >
                    phone code
                      </Label>
                  <Col sm={9}>
                    <Input
                      value={this.state.data.phoneCode}
                      onChange={(data) => { this.setState({ data: { ...this.state.data, phoneCode: data.target.value } }) }}
                      type="email"
                      className="form-control"
                      id="horizontal-email-Input"
                    />
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label
                    htmlFor="horizontal-email-Input"
                    className="col-sm-3 col-form-label"
                  >
                    time zone
                      </Label>
                  <Col sm={9}>
                    <Input
                      value={this.state.data.timeZone}
                      onChange={(data) => { this.setState({ data: { ...this.state.data, timeZone: data.target.value } }) }}
                      type="email"
                      className="form-control"
                      id="horizontal-email-Input"
                    />
                  </Col>
                </div>
              </Form>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {

                  this.setState({ isOpen: !this.state.isOpen })

                }}
                className="btn btn-secondary "
                data-dismiss="modal"
              >
                Close
                            </button>
              <button
                type="button"
                className="btn btn-primary "
                onClick={this.save}
              >
                Save changes
                            </button>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard;
