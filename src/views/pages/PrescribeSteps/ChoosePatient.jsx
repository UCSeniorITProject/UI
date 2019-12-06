
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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
    }
  }

  async componentDidMount() {
    const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
    const patients = await getPatientList(decodedToken.userID);
    this.setState({patients: patients.patients})
  }

  render() {
    return (
      <>
        <h5 className="info-text">
          Start by picking a patient
        </h5>
        <ReactTable
                    data={this.state.patients}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Patient ID",
                        accessor: "office"
                      },
                      {
                        Header: "First Name",
                        accessor: "name"
                      },
                      {
                        Header: "Last Name",
                        accessor: "position"
                      },
                      {
                        Header: "Age",
                        accessor: "age"
                      },
                      {
                        Header: "Gender",
                        accessor: "age"
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
      </>
    );
  }
}

export default PickPatient;
