import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import PickPrescribable from "./PrescribeSteps/ChoosePrescribable";
import PickPatient from "./PrescribeSteps/ChoosePatient";
import PickPrescribableReasons from "./PrescribeSteps/ChoosePrescribableReason";
import PickPharmacy from "./PrescribeSteps/ChoosePharmacy";

class Prescribe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			patientId: null,
			prescribables: [],
			isChoosePrescribablePageDone: false,
			prescribableReasonsMapped: [],
			steps: [
				{
					stepName: "Pick Patient",
					stepIcon: "tim-icons icon-single-02",
					component: PickPatient,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
					},
				},
				{
					stepName: "Pick Prescribable",
					stepIcon: "tim-icons icon-single-02",
					component: PickPrescribable,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
					},
				},
				{
					stepName: "Pick Reasons",
					stepIcon: "tim-icons icon-single-02",
					component: PickPrescribableReasons,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
						getParentStateValue: this.getParentStateValue.bind(this),
					},
				},
				{
					stepName: "Pick Pharmacy",
					stepIcon: "tim-icons icon-single-02",
					component: PickPharmacy,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
						getParentStateValue: this.getParentStateValue.bind(this),
					},
				}
			],
		};
  }

	getParentStateValue(stateName){
		return this.state[stateName];
	}

  onChildStateChange(stateName, value){
    return this.setState({[stateName]: value});
  }

  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              validate
              steps={this.state.steps}
              title="Create a prescription"
              description="This wizard will facilitate the patient prescription process"
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              progressbar
              color="blue"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Prescribe;