import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import PickPatient from "./PrescribeSteps/ChoosePatient";
import CreatePatient from "./PrescribeSteps/CreatePatient";
var steps = [
  {
    stepName: "Pick Patient",
    stepIcon: "tim-icons icon-single-02",
    component: PickPatient
  },
  {
    stepName: "Pick Drugs",
    stepIcon:  "tim-icons icon-simple-add",
    component: CreatePatient,
  }
];
class Prescribe extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              validate
              steps={steps}
              navSteps
              validate
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