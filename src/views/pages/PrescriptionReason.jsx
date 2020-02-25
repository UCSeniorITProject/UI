import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

class PrescriptionReason extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shortSummary: '',
      shortSummaryState: null,
      longSummary: '',
      longSummaryState: null,
      reasonCode: '',
      reasonCodeState: null,
      prescriptionReasons: [],
      currentlySelectedPrescriptionReasonId: null,
      currentlySelectedPrescriptionReasonShortSummary: '',
      currentlySelectedPrescriptionReasonShortSummaryState: null,
      currentlySelectedPrescriptionReasonLongSummary: '',
      currentlySelectedPrescriptionReasonLongSummaryState: null,
      currentlySelectedPrescriptionReasonReasonCode: '',
      currentlySelectedPrescriptionReasonReasonCodeState: null,
      isAddFormValid: false,
      isUpdateFormValid: true,
    }
  }

  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  addReason(){
    try {
      const prescriptionReason = {
        shortSummary: this.state.shortSummary,
        longSummary: this.state.longSummary,
        reasonCode: this.state.reasonCode,
        active: 'Y',
      };
    } catch (err) {
      this.showInternalServerErrorMessage()
    }
  }

  isAddFormValid(){
    return Object.entries(this.state).filter((x=> x[0].includes('State')  && !x[0].includes('currentlySelected') && (x[1] === null || x[1] === 'has-danger'))).length === 0;
  }

  isUpdateFormValid(){
    return Object.entries(this.state).filter(x =>  x[0].includes('State') && x[0].includes('currentlySelected') && x[1] !== null && x[1] === 'has-danger').length === 0;
  }

  setIsAddFormValid(){
    this.setState({isAddFormValid: this.isAddFormValid()});
  }

  setIsUpdateFormValid(){
    this.setState({isUpdateFormValid: this.isUpdateFormValid()});
  }

  change = (event, stateName, type, stateNameEqualTo, stateTree) => {
    this.setState({ [event.target.name]: event.target.value});
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({[stateName + "State"]: "has-success", [stateName]: event.target.value || '' }, stateTree === 'add' ? this.setIsAddFormValid : this.setIsUpdateFormValid);
        } else {
          this.setState({ [stateName + "State"]: "has-danger", [stateName]: event.target.value || '' }, stateTree === 'add' ? this.setIsAddFormValid : this.setIsUpdateFormValid);
        }
        break;
      default:
        break;
    }
  }

  showInternalServerErrorMessage(){
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            An error occured. Please try again later
          </div>
        </div>
      ),
      type: 'error',
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Prescription Reason</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                          <FormGroup className={`has-label ${this.state.reasonCodeState}`}>
                            <label>Reason Code</label>
                            <Input
                              name="reasoncode"
                              type="text"
                              onChange={e => this.change(e, "reasonCode", "length", '1', 'add')}
                            />
                            {this.state.reasonCodeState === "has-danger" ? (
                              <label className="error">
                                Please enter a valid reason code
                              </label>
                            ) : null}
                          </FormGroup>
                    </Col>
                    <Col md="6">
                          <FormGroup className={`has-label ${this.state.shortSummaryState}`}>
                            <label>Short Summary</label>
                            <Input
                              name="shortsummary"
                              type="text"
                              onChange={e => this.change(e, "shortSummary", "length", '1', 'add')}
                            />
                            {this.state.shortSummaryState === "has-danger" ? (
                              <label className="error">
                                Please enter a valid short summary
                              </label>
                            ) : null}
                          </FormGroup>
                    </Col>
                    <Col md="12">
                          <FormGroup className={`has-label ${this.state.longSummaryState}`}>
                            <label>Long Summary</label>
                            <Input
                              name="longsummary"
                              type="text"
                              onChange={e => this.change(e, "longSummary", "length", '1', 'add')}
                            />
                            {this.state.longSummaryState === "has-danger" ? (
                              <label className="error">
                                Please enter a valid long summary
                              </label>
                            ) : null}
                          </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isAddFormValid} onClick={e => this.addReason()}>
                    Add Reason
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

export default PrescriptionReason;