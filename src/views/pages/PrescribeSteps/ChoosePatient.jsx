
import React from "react";

// reactstrap components
import {
  Button,
  Row,
  Col
} from "reactstrap";

import {getPatientWithFilter} from '../../../services/Patient';
import ReactTable from "react-table";
import moment from "moment";

class PickPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      isPatientPicked: false,
      selectedPatientID: null,
      selectedIndex: null,
      currentlySelectedPatientName: '',
    }
  }

  async componentDidMount() {
    const patients = await getPatientWithFilter();
    const patientList = patients.map(x => {return {patientId: x.patientId, firstName: x.firstName, lastName: x.lastName, birthDate: moment(x.dateOfBirth).format("MM/DD/YYYY"), gender: x.gender === 'M' ? 'Male' : 'Female', actions: (
      <div className="actions-right">
              <Button
                color="warning"
                size="sm"
                className="btn-icon btn-link like btn-neutral"
                onClick={e => this.props.history.push(`/admin/patient/profile/${x.patientId}/`)}
              >
                <i className="tim-icons icon-pencil" />
              </Button >{" "}

              <Button
                className="btn-icon btn-link like btn-neutral"
                size="sm"
                color="warning"
                onClick={e=> {this.props.onChildStateChange('patientId', x.patientId); this.setState({currentlySelectedPatientName: `${x.firstName} ${x.lastName}`})}}
              >
                <i className="tim-icons icon-check-2" />
              </Button>{" "}
      </div>
    ), selected: false}});
    this.setState({patients: patientList});
  }

  isValidated = () => {
    return this.state.currentlySelectedPatientName.length !== 0;
  }
  
  render() {
    return (
      <>
      <Row>
        <Col md="9">
        <h5 className="info-text float-left">
            <b>Patient Picker (Currently Selected Patient: {this.state.currentlySelectedPatientName})</b>
          </h5>
        </Col>
        <Col md="3">
          <Button
              className="animation-on-hover float-right"
              color="success"
              id="addPatient"
              type="button"
              onClick={e => this.props.history.push('/admin/patient/new')}
            >
              Add Patient
            </Button>
        </Col>
      </Row>

        <ReactTable
                    data={this.state.patients}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Patient ID",
                        accessor: "patientId",
                      },
                      {
                        Header: "First Name",
                        accessor: "firstName"
                      },
                      {
                        Header: "Last Name",
                        accessor: "lastName"
                      },
                      {
                        Header: "Date of Birth",
                        accessor: "dob"
                      },
                      {
                        Header: "Gender",
                        accessor: "gender"
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    defaultPageSize={5}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
      </>
    );
  }
}

export default PickPatient;
