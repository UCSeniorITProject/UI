import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col
} from "reactstrap";
import {getPatientWithFilter} from '../../services/Patient';
import ReactTable from "react-table";
import { withRouter } from 'react-router';
import moment from 'moment';
class PatientList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    }
  }

  async componentDidMount() {
    try {
      const patients = await getPatientWithFilter({active: 'Y'});
      const patientList = patients.map(x => {return {patientId: x.patientUserId, firstName: x.firstName, lastName: x.lastName, birthDate: moment(x.dateOfBirth).format("MM/DD/YYYY"), gender: x.gender === 'M' ? 'Male' : 'Female', actions: (
        <div className="actions-right">
                <Button
                  color="primary"
                  size="md"
                  className="btn-fill"
                  value={x.userId}
                  onClick={e => this.props.history.push(`/admin/patient/profile/${x.patientId}/`)}
                >
                  EDIT
                </Button>
        </div>
      ), selected: false}});
      this.setState({patients: patientList});
    } catch (err){
      console.log(err);
    }
  }

  render (){
    return (
      <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Patient List</h5> 
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
                              Header: "Birth Date",
                              accessor: "birthDate"
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

export default withRouter(PatientList);