import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col
} from "reactstrap";
import jwtDecode from 'jwt-decode';
import {getPatientList} from '../../services/Patient';
import ReactTable from "react-table";

class PatientList extends React.Component  {
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
                color="primary"
                size="md"
                className="btn-fill"
                value={x.userId}
              >
                EDIT
              </Button>
      </div>
    ), selected: false}});
    this.setState({patients: patientList});
  }

  render (){
    return (
      <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5> 
              </CardHeader>
              <CardBody>
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
                          defaultPageSize={6}
                          showPaginationTop
                          showPaginationBottom={false}
                          className="-striped -highlight"
                        />
                  </CardBody>
              </Card>
          </Col>
        </Row> 
        </div>
      </>
    );
  }
}

export default PatientList;