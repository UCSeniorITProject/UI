import React from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  Row,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import {createPharmacy} from '../../services/Pharmacy';
import classnames from "classnames";
class AddPharmacy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pharmacyName: '',
      zipCode: '',
      address: '',
      city: '',
      state: '',
      active: 'Y',
      pharmacyNameState: null,
      zipCodeState: null,
      addressState: null,
      cityState: null,
      stateState: null,
    };
  }

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }


  isFormValid(){
    return Object.entries(this.state).filter(x => x[0].includes('State') && x[1] ===null || x[0].includes('State') && x[1].includes('has-danger')).length === 0;
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  handleChange(event, stateName, type, stateNameEqualTo, maxValue){
    this.setState({ [event.target.name]: event.target.value});
    switch (type) {
      case "length": 
        if(this.verifyLength(event.target.value, 1)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 6)
          && event.target.value.toLowerCase() !== event.target.value) {
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "tel":
        if(this.verifyPhone(event.target.value)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      default:
        break;
    }
  }

  async createPharmacy(){
    const pharmacy = {
      pharmacyName: this.state.pharmacyName,
      state: this.state.state,
      city: this.state.city,
      zipCode: this.state.zipCode,
      address: this.state.address,
      active: this.state.active,
    };
    await createPharmacy(pharmacy);
    this.props.history.push('/admin/user-profile')
  }

  handleImageChange = imageUrl => {
    this.setState({profilePicture: imageUrl});
  }

  verifyPhone = value => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(phoneRegex.test(value)){
      return true;
    }
    return false;
  };

    // function that returns true if value is email, false otherwise
    verifyEmail = value => {
      var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(value) && value.length !== 0) {
        return true;
      }
      return false;
    };
    // function that verifies if a string has a given length or not
    verifyLength = (value, length) => {
      if (value.length >= length) {
        return true;
      }
      return false;
    };
    verifyPhone = value => {
      const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      if(phoneRegex.test(value)){
        return true;
      }
      return false;
    };
    // function that verifies if value contains only numbers
    verifyNumber = value => {
      var numberRex = new RegExp("^[0-9]+$");
      if (numberRex.test(value)) {
        return true;
      }
      return false;
    };
    change = (event, stateName, type, stateNameEqualTo, maxValue) => {
      switch (type) {
        case "length":
          if (this.verifyLength(event.target.value, stateNameEqualTo)) {
            this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
          } else {
            this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
          }
          break;
        default:
          break;
      }
  
      this.setState({ [stateName]: event.target.value || ''});
    };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Pharmacy</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                    <Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.pharmacyNameState, {
                            "input-group-focus": this.state.pharmacyNameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="firstName"
                            placeholder="Pharmacy Name"
                            type="text"
                            onChange={e => this.change(e, "pharmacyName", "length", 1)}
                            onFocus={e => this.setState({ pharmacyNameFocus: true })}
                            onBlur={e => {this.setState({ pharmacyNameFocus: false }); this.change(e, 'pharmacyName', 'length', 1)}}
                          />
                        </InputGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.addressState, {
                            "input-group-focus": this.state.addressFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-map-big" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="address"
                            placeholder="Street Address"
                            type="text"
                            onChange={e => this.change(e, "address", "length", 1)}
                            onFocus={e => this.setState({ addressFocus: true })}
                            onBlur={e => {this.setState({ addressFocus: false }); this.change(e, 'address', 'length', 1)}}
                          />
                        </InputGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.cityState, {
                            "input-group-focus": this.state.cityFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-map-big" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="city"
                            placeholder="City"
                            type="text"
                            onChange={e => this.change(e, "city", "length", 1)}
                            onFocus={e => this.setState({ cityFocus: true })}
                            onBlur={e => {this.setState({ cityFocus: false }); this.change(e, 'city', 'length', 1)}}
                          />
                        </InputGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.stateState, {
                            "input-group-focus": this.state.stateFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-map-big" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="state"
                            placeholder="State"
                            type="text"
                            onChange={e => this.change(e, "state", "length", 1)}
                            onFocus={e => this.setState({ stateFocus: true })}
                            onBlur={e => {this.setState({ stateFocus: false }); this.change(e, 'state', 'length', 1)}}
                          />
                        </InputGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.zipCodeState, {
                            "input-group-focus": this.state.zipCodeFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-map-big" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="zipcode"
                            placeholder="Zip Code"
                            type="text"
                            onChange={e => this.change(e, "zipCode", "length", 1)}
                            onFocus={e => this.setState({ zipCodeFocus: true })}
                            onBlur={e => {this.setState({ zipCodeFocus: false }); this.change(e, 'zipCode', 'length', 1)}}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isFormValid} onClick={e => this.createPharmacy()}>
                    Create Pharmacy
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(AddPharmacy);