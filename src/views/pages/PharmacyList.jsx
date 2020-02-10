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
import { withRouter } from 'react-router';
import { getPharmacyWithFilter } from "../../services/Pharmacy";
class PharmacyList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      pharmacies: [],
      isPatientPicked: false,
    }
  }

  async componentDidMount() {
		const pharmacies = await getPharmacyWithFilter({active: 'Y'});
    const pharmacyList = pharmacies.map(x => {return {name: x.name, address: x.address, state: x.state, zipCode: x.zipCode, city: x.city, actions: (
      <div className="actions-right">
              <Button
                color="primary"
                size="md"
                className="btn-fill"
                value={x.userId}
                onClick={e => this.props.history.push(`/admin/pharmacy/profile/${x.pharmacyId}/`)}
              >
                EDIT
              </Button>
      </div>
    ), selected: false}});
    this.setState({pharmacyList});
  }

  render (){
    return (
      <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Pharmacy List</h5> 
              </CardHeader>
              <CardBody>
                  <ReactTable
                          data={this.state.pharmacyList}
                          filterable
                          resizable={false}
                          columns={[
                            {
                              Header: "Name",
                              accessor: "name",
                            },
                            {
                              Header: "Address",
                              accessor: "address"
                            },
                            {
                              Header: "State",
                              accessor: "state"
                            },
                            {
                              Header: "Zip Code",
                              accessor: "zipCode"
                            },
                            {
                              Header: "City",
                              accessor: "city"
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

export default withRouter(PharmacyList);