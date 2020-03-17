import React from "react";
import { getPharmacyWithFilter } from "../../../services/Pharmacy";
import ReactTable from "react-table";
import {
  Button,
  Row,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import className from "classnames";
class ChoosePharmacy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pharmacies: [],
			selectedPharmacy: null,
			currentlySelectedPharmacyName: '',
    }
  }

  isValidated(){
    return this.state.selectedPharmacy !== null;
  }
  
  async componentDidMount(){
    const pharmacies = await getPharmacyWithFilter({active: 'Y'});
    this.setState({pharmacies: pharmacies.map(x => {
			return {
				pharmacyId: x.pharmacyId,
				pharmacyName: x.name,
				pharmacyStreet: x.address,
				pharmacyState: x.state,
				pharmacyZipCode: x.zipCode,
				actions: (
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
										className={className("btn-icon", "btn-link", "like", {"btn-neutral": this.state.selectedPharmacyId === Number(x.pharmacyId)})}
										size="sm"
										color={this.state.selectedPatientID === Number(x.patientId) ? "white" : 'blue'}
										onClick={e=> {this.props.onChildStateChange('pharmacyId', x.pharmacyId); this.setState({currentlySelectedPharmacyName: `${x.name}`, selectedPharmacyId: Number(x.patientId)})}}
									>
										<i className="tim-icons icon-check-2" />
									</Button>{" "}
					</div>
				)
			}
		})});
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
							<b>Pharmacy Picker (Currently Selected Pharmacy: {this.state.currentlySelectedPharmacyName})</b>
						</h5>
					</Col>
					<Col md="3">
						<Button
								className="animation-on-hover float-right"
								color="success"
								id="addPatient"
								type="button"
								onClick={e => this.props.history.push('/admin/pharmacy/new')}
							>
								Add Patient
							</Button>
					</Col>
				</Row>

					<ReactTable
											data={this.state.pharmacies}
											filterable
											resizable={false}
											columns={[
												{
													Header: "Pharmacy ID",
													accessor: "pharmacyId",
												},
												{
													Header: "Name",
													accessor: "pharmacyName"
												},
												{
													Header: "Street",
													accessor: "pharmacyStreet"
												},
												{
													Header: "State",
													accessor: "pharmacyState"
												},
												{
													Header: "Zip Code",
													accessor: "pharmacyZipCode"
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