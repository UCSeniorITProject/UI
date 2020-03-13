import React from "react";
import { getPharmacyWithFilter } from "../../../services/Pharmacy";
import ReactTable from "react-table";
import {
  Button,
  Row,
  Col
} from "reactstrap";
class ChoosePharmacy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pharmacies: [],
      selectedPharmacy: null,
    }
  }

  isValidated(){
    return this.state.selectedPharmacy !== null;
  }
  
  async componentDidMount(){
    const pharmacies = await getPharmacyWithFilter({active: 'Y'});
    this.setState({pharmacies});
  }

  render(){
    return (
      <>
				<div className="rna-container">
					<NotificationAlert ref="notificationAlert" />
				</div>
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
    )
  }
}

export default ChoosePharmacy;