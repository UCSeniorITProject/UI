import React from "react";
import classnames from "classnames";
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class InsuranceInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFormValid: false,
      insuranceName: '',
      insuranceNameState: null,
      insuranceCoPayAmount: '',
      insuranceCoPayAmountState: null,
      insurancePlanNo: '',
      insurancePlanNoState: null,
    };
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };


  change = async (event, stateName, type, stateNameEqualTo, maxValue) => {
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

    if(event.target.value){
      this.props.onChildStateChange(stateName, event.target.value);
    }
    this.setState({ [stateName]: event.target.value });
  };

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }

  isFormValid(){
    return Object.entries(this.state).filter(x => x[0].includes('State') && x[1] ===null || x[0].includes('State') && x[1].includes('has-danger')).length === 0;
  }

  isValidated = () => {
    return this.isFormValid();
  };

  render () {
    return (<>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <h5 className="info-text">
          Now, onto the insurance information.
        </h5>
        <Row className="justify-content-center mt-5">
          <Col sm="6">
          <InputGroup
              className={classnames(this.state.insuranceNameState, {
                "input-group-focus": this.state.insuranceNameState
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-caps-small" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="insurancename"
                placeholder="Insurance Name"
                type="text"
                onChange={e => this.change(e, "insuranceName", "length", 1)}
                onFocus={e => this.setState({ insuranceNameFocus: true })}
                onBlur={e => this.setState({ insuranceNameFocus: false })}
              />
              {this.state.insuranceNameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="6">
            <InputGroup
                className={classnames(this.state.insurancePlanNoState, {
                  "input-group-focus": this.state.insurancePlanNoState
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="tim-icons icon-caps-small" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="insurancePlanNo"
                  placeholder="Plan Number"
                  type="text"
                  onChange={e => this.change(e, "insurancePlanNo", "length", 1)}
                  onFocus={e => this.setState({ insurancePlanNoFocus: true })}
                  onBlur={e => this.setState({ insurancePlanNoFocus: false })}
                />
                {this.state.insurancePlanNoState === "has-danger" ? (
                  <label className="error">This field is required.</label>
                ) : null}
              </InputGroup>
          </Col>
          <Col sm="6">
            <InputGroup
                className={classnames(this.state.insuranceCoPayAmountState, {
                  "input-group-focus": this.state.insuranceCoPayAmountState
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="tim-icons icon-money-coins" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="insuranceCoPayAmount"
                  placeholder="Co-Pay Amount"
                  type="text"
                  onChange={e => this.change(e, "insuranceCoPayAmount", "length", 1)}
                  onFocus={e => this.setState({ insuranceCoPayAmountFocus: true })}
                  onBlur={e => this.setState({ insuranceCoPayAmountFocus: false })}
                />
                {this.state.insuranceCoPayAmountState === "has-danger" ? (
                  <label className="error">This field is required.</label>
                ) : null}
              </InputGroup>
          </Col>
        </Row>
      </>)
  }
}

export default InsuranceInfo;