import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col
} from "reactstrap";
import {getRoleWithFilter} from '../../services/Role';
import {getUserRoleWithFilter} from '../../services/UserRole';
import {bulkGetUserById} from '../../services/User';
import ReactTable from "react-table";
import NotificationAlert from "react-notification-alert";
class DoctorList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			doctors: [],
		};
	}

	async componentDidMount(){
		try {
			const roles = await getRoleWithFilter({roleName: 'Doctor', active:'Y'});
			if(roles.length){
				const userRoles = await getUserRoleWithFilter({roleId: roles[0].id, active: 'Y'});
				console.log(userRoles)
				const users = await bulkGetUserById(userRoles.map(x=>x.userID));
				console.log(users)
				const doctorList = users.map(x => {
					return {
						doctorId: x.id,
						firstName: x.firstName,
						lastName: x.lastName,
						actions: (
							<div className="actions-right">
								<Button
									color="blue"
									size="md"
									className="btn-fill"
									value={x.userId}
									onClick={e => this.props.history.push(`/admin/doctor/${x.id}/analytics`)}
								>
									Analytics
								</Button>
							</div>
						)
					}
				});
				this.setState({
					doctors: doctorList,
				});
			} else {
				this.showInternalServerMessage();
			}
		} catch (err) {
			console.log(err);
			this.showInternalServerMessage();
		}
	}

	showInternalServerMessage(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						An error occurred while loading the patient list.
					</div>
				</div>
			),
			type: 'warning',
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		if(this.refs){
			this.refs.notificationAlert.notificationAlert(options);
		}
	}

	render(){
		return (
			<>
				<div className="rna-container">
					<NotificationAlert ref="notificationAlert" />
				</div>
				<div className="content">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader>
									<h5 className="title">Doctor List</h5> 
								</CardHeader>
								<CardBody>
										<ReactTable
														data={this.state.doctors}
														filterable
														resizable={false}
														columns={[
															{
																Header: "Doctor ID",
																accessor: "doctorId",
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
		)
	}
}

export default DoctorList;