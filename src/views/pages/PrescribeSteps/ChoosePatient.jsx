
import React from "react";
import { withRouter } from 'react-router';
// reactstrap components
import {
  Button,
  Row,
  Col
} from "reactstrap";
import jwtDecode from 'jwt-decode';
import {getPatientList} from '../../../services/Patient';
import ReactTable from "react-table";

class PickPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      isPatientPicked: false,
      selectedPatientID: null,
      selectedIndex: null,
    }
  }

  async componentDidMount() {
    const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
    const patients = await getPatientList(decodedToken.userID);
    const patientList = patients.patients.map(x => {return {patientId: x.userId, firstName: x.firstName, lastName: x.lastName, age: 1, gender: 'F', actions: (
      <div className="actions-right">
              <Button
                color="warning"
                size="sm"
                className="btn-icon btn-link like btn-neutral"
                onClick={e => this.props.history.push(`/admin/patient/profile/${x.userId}/`)}
              >
                <i className="tim-icons icon-pencil" />
              </Button >{" "}

              <Button
                className="btn-icon btn-link like btn-neutral"
                size="sm"
                color="warning"
              >
                <i className="tim-icons icon-check-2" />
              </Button>{" "}
      </div>
    ), selected: false}});
    this.setState({patients: patientList});
  }

  isValidated(){
    return this.state.isPatientPicked;
  }

  onPatientSelect(){

  }

  render() {
    return (
      <>
      <Row>
        <Col md="9">
        <h5 className="info-text float-left">
            <b>Patient Picker</b>
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
                        Header: "Age",
                        accessor: "age"
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

export default withRouter(PickPatient);
