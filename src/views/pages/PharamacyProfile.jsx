import {withRouter} from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import React from 'react';
import classnames from 'classnames';
import NotificationAlert from "react-notification-alert";
import {getPharmacyById, deletePharmacy, patchPharmacy} from '../../services/Pharmacy';
import { throws } from 'assert';

class PharmacyProfile extends React.Component {
  constructor(props) {
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
      isFormValid:true,
    };
  }

  async componentDidMount(){
    const pharmacyId = this.props.match.params.id;
    const pharmacy = await getPharmacyById(pharmacyId);
    this.setState({
      pharmacyName: pharmacy.pharmacyName,
      zipCode: pharmacy.zipCode,
      address: pharmacy.address,
      city: pharmacy.city,
      state: pharmacy.state,
    });
  }

  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }

  verifyPhone = value => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(phoneRegex.test(value)){
      return true;
    }
    return false;
  };

  async deletePharmacy(){
    const pharmacyId = this.props.match.params.id;
    try {
      await deletePharmacy(pharmacyId);
      this.props.history.push('/admin/pharmacy/list');
    } catch (err){
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              A pharmacy with history cannot be deleted!
            </div>
          </div>
        ),
        type: 'warning',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      if(this.refs){
        this.refs.notificationAlert.notificationAlert(options);
      }
    }
  }

  isFormValid(){
    return Object.entries(this.state).filter(x => x[1] !== null && x[0].includes('State') && x[1].includes('has-danger')).length === 0;
  }

  async updatePharmacy(){
    if(!this.isFormValid()){
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              Please fix all validation errors before saving!
            </div>
          </div>
        ),
        type: 'warning',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      if(this.refs){
        this.refs.notificationAlert.notificationAlert(options);
      }

      return;
    }
    console.log(this.state)
    const pharmacyId = this.props.match.params.id;
    const pharmacyInfo = {
      pharmacyName: this.state.pharmacyName,
      state: this.state.state,
      city: this.state.city,
      zipCode: this.state.zipCode,
      address: this.state.address,
      active: 'Y',
    };
    try {
      await patchPharmacy(pharmacyId, pharmacyInfo);
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              Succesfully updated the pharmacy!
            </div>
          </div>
        ),
        type: 'success',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      if(this.refs){
        this.refs.notificationAlert.notificationAlert(options);
      }
    } catch (error){
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              An error occured while saving, please try again later.
            </div>
          </div>
        ),
        type: 'warning',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      if(this.refs){
        this.refs.notificationAlert.notificationAlert(options);
      }
    }
  }

  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger"});
        }
        break;
      case "phone":
        if(this.verifyPhone(event.target.value)){
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({[stateName]: event.target.value});
  };

  render(){
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Pharmacy Profile</h5>
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
                            defaultValue={this.state.pharmacyName}
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
                            defaultValue={this.state.address}
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
                            defaultValue={this.state.city}
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
                            defaultValue={this.state.state}
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
                            defaultValue={this.state.zipCode}
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
                  <Button className="btn-fill pull-left" color="danger" type='submit' onClick={e => this.deletePharmacy()}>
                    Delete Pharmacy
                  </Button>
                  <Button className="btn-fill pull-right" color="primary" type="submit" onClick={e => this.updatePharmacy()}>
                    Update Pharmacy
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

export default withRouter(PharmacyProfile);