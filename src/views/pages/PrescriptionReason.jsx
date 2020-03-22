import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import ReactTable from "react-table";
import {createPrescriptionReason, getPrescriptionReasonWithFilter, updatePrescriptionReason} from '../../services/PrescriptionReason';
import moment from 'moment';
import NotificationAlert from "react-notification-alert";

class PrescriptionReason extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shortSummary: '',
      shortSummaryState: null,
      longSummary: '',
      longSummaryState: null,
      reasonCode: '',
      reasonCodeState: null,
      prescriptionReasons: [],
      currentlySelectedPrescriptionReasonId: null,
      currentlySelectedPrescriptionReasonShortSummary: '',
      currentlySelectedPrescriptionReasonShortSummaryState: null,
      currentlySelectedPrescriptionReasonLongSummary: '',
      currentlySelectedPrescriptionReasonLongSummaryState: null,
      currentlySelectedPrescriptionReasonReasonCode: '',
      currentlySelectedPrescriptionReasonReasonCodeState: null,
      isAddFormValid: false,
      isUpdateFormValid: true,
    }
  }

  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  async addReason(){
    try {
      const prescriptionReason = {
        shortSummary: this.state.shortSummary,
        longSummary: this.state.longSummary,
        reasonCode: this.state.reasonCode,
        active: 'Y',
			};
			const savedPrescriptionReason = await createPrescriptionReason(prescriptionReason);
			
			this.setState({
				shortSummary: '',
				shortSummaryState: null,
				longSummary: '',
				longSummaryState: null,
				reasonCode: '',
				reasonCodeState: null,
				prescriptionReasons: [...this.state.prescriptionReasons, {
					prescriptionReasonId: savedPrescriptionReason.prescriptionReasonId,
					reasonCode: savedPrescriptionReason.reasonCode,
					shortSummary: savedPrescriptionReason.shortSummary,
					createdAt: moment(savedPrescriptionReason.createdAt).format("MM/DD/YYYY"),
					actions: (
						<div className="actions-right">
							<Button
								color="primary"
								size="md"
								className="btn-fill"
								onClick={e => this.updatePrescriptionReasonModal(savedPrescriptionReason.prescriptionReasonId)}
							>
								Update
							</Button>
						</div>
					),
			}]});
			this.showSuccessfulResponseMessage('Succesfully created the prescription reason');
    } catch (err) {
      this.showInternalServerErrorMessage()
    }
	}
	
	async componentDidMount(){
		try {
			const prescriptionReasons = await getPrescriptionReasonWithFilter({active: 'Y'});
			const prescriptionReasonList = prescriptionReasons.map(x => {
				return {
					prescriptionReasonId: x.prescriptionReasonId,
					reasonCode: x.reasonCode,
					shortSummary: x.shortSummary,
					createdAt: moment(x.createdAt).format("MM/DD/YYYY"),
					actions: (
						<div className="actions-right">
							<Button
								color="primary"
								size="md"
								className="btn-fill"
								onClick={e => this.updatePrescriptionReasonModal(x.prescriptionReasonId)}
							>
								Update
							</Button>
						</div>
					),
				};
			});
			this.setState({prescriptionReasons: prescriptionReasonList});
		} catch (err) {
			this.showInternalServerErrorMessage();
		}
	}

	async updatePrescriptionReason(){
		try {
			await updatePrescriptionReason(this.state.currentlySelectedPrescriptionReasonId, {
				shortSummary: this.state.currentlySelectedPrescriptionReasonShortSummary,
				longSummary: this.state.currentlySelectedPrescriptionReasonLongSummary,
				reasonCode: this.state.currentlySelectedPrescriptionReasonReasonCode,
			});

			this.setState({
				prescriptionReasons: this.state.prescriptionReasons.map(x => {
					if(x.prescriptionReasonId === this.state.currentlySelectedPrescriptionReasonId){
						return {		
							prescriptionReasonId:	this.state.currentlySelectedPrescriptionReasonId,
							shortSummary: this.state.currentlySelectedPrescriptionReasonShortSummary,
							createdAt: x.createdAt,
							reasonCode: this.state.currentlySelectedPrescriptionReasonReasonCode,
							actions: (
								<div className="actions-right">
									<Button
										color="primary"
										size="md"
										className="btn-fill"
										onClick={e => this.updatePrescriptionReasonModal(x.prescriptionReasonId)}
									>
										Update
									</Button>
								</div>
							),
						};
					} else {
						return x;
					}
				}),
				currentlySelectedPrescriptionReasonId: null,
				currentlySelectedPrescriptionReasonLongSummary: '',
				currentlySelectedPrescriptionReasonReasonCode: '',
				currentlySelectedPrescriptionReasonShortSummary: '',
				currentlySelectedPrescriptionReasonLongSummaryState: '',
				currentlySelectedPrescriptionReasonReasonCodeState: '',
				currentlySelectedPrescriptionReasonShortSummaryState: '',
			});

			this.showSuccessfulResponseMessage('Succesfully updated the prescription reason!');
		} catch (err){
			this.showInternalServerErrorMessage();
		}
	}

	async updatePrescriptionReasonModal(currentlySelectedPrescriptionReasonId){
		try {
			const prescriptionReason = await getPrescriptionReasonWithFilter({prescriptionReasonId: currentlySelectedPrescriptionReasonId});
			this.setState({
				currentlySelectedPrescriptionReasonId: prescriptionReason[0].prescriptionReasonId,
				currentlySelectedPrescriptionReasonLongSummary: prescriptionReason[0].longSummary,
				currentlySelectedPrescriptionReasonReasonCode: prescriptionReason[0].reasonCode,
				currentlySelectedPrescriptionReasonShortSummary: prescriptionReason[0].shortSummary,
			});
		} catch (err){
			this.showInternalServerErrorMessage();
		}
	}

  isAddFormValid(){
    return Object.entries(this.state).filter((x=> x[0].includes('State')  && !x[0].includes('currentlySelected') && (x[1] === null || x[1] === 'has-danger'))).length === 0;
  }

  isUpdateFormValid(){
    return Object.entries(this.state).filter(x =>  x[0].includes('State') && x[0].includes('currentlySelected') && x[1] !== null && x[1] === 'has-danger').length === 0;
  }

  setIsAddFormValid(){
    this.setState({isAddFormValid: this.isAddFormValid()});
  }

  setIsUpdateFormValid(){
    this.setState({isUpdateFormValid: this.isUpdateFormValid()});
  }

  change = (event, stateName, type, stateNameEqualTo, stateTree) => {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({[stateName + "State"]: "has-success", [stateName]: event.target.value || '' }, stateTree === 'add' ? this.setIsAddFormValid : this.setIsUpdateFormValid);
        } else {
          this.setState({[stateName + "State"]: "has-danger", [stateName]: event.target.value || '' }, stateTree === 'add' ? this.setIsAddFormValid : this.setIsUpdateFormValid);
        }
        break;
      default:
        break;
		}
	}
	
	showSuccessfulResponseMessage(message){
		var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
						{message}
          </div>
        </div>
      ),
      type: 'success',
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
	}

  showInternalServerErrorMessage(){
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            An error occured. Please try again later
          </div>
        </div>
      ),
      type: 'error',
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  render() {
    return (
      <>
			  <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Row>
						<Col md="6">
            	<Col md="12">
								<Card>
									<CardHeader>
										<CardTitle tag="h4">Prescription Reason</CardTitle>
									</CardHeader>
									<CardBody>
										<Row>
											<Col md="6">
														<FormGroup className={`has-label ${this.state.reasonCodeState}`}>
															<label>Reason Code</label>
															<Input
																name="reasoncode"
																type="text"
																onChange={e => this.change(e, "reasonCode", "length", '1', 'add')}
																value={this.state.reasonCode}
															/>
															{this.state.reasonCodeState === "has-danger" ? (
																<label className="error">
																	Please enter a valid reason code
																</label>
															) : null}
														</FormGroup>
											</Col>
											<Col md="6">
														<FormGroup className={`has-label ${this.state.shortSummaryState}`}>
															<label>Short Summary</label>
															<Input
																name="shortsummary"
																type="text"
																onChange={e => this.change(e, "shortSummary", "length", '1', 'add')}
																value={this.state.shortSummary}
															/>
															{this.state.shortSummaryState === "has-danger" ? (
																<label className="error">
																	Please enter a valid short summary
																</label>
															) : null}
														</FormGroup>
											</Col>
											<Col md="12">
														<FormGroup className={`has-label ${this.state.longSummaryState}`}>
															<label>Long Summary</label>
															<Input
																name="longsummary"
																type="text"
																onChange={e => this.change(e, "longSummary", "length", '1', 'add')}
																value={this.state.longSummary}
															/>
															{this.state.longSummaryState === "has-danger" ? (
																<label className="error">
																	Please enter a valid long summary
																</label>
															) : null}
														</FormGroup>
											</Col>
										</Row>
									</CardBody>
									<CardFooter>
										<Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isAddFormValid} onClick={e => this.addReason()}>
											Add Reason
										</Button>
									</CardFooter>
								</Card>
            	</Col>

							<Col md="12">
								<Card>
									<CardHeader>
										<CardTitle tag="h4">Update Prescription Reason</CardTitle>
									</CardHeader>
									<CardBody>
										<Row>
											<Col md="6">
														<FormGroup className={`has-label ${this.state.currentlySelectedPrescriptionReasonReasonCodeState}`}>
															<label>Reason Code</label>
															<Input
																name="reasoncode"
																type="text"
																readOnly={this.state.currentlySelectedPrescriptionReasonId === null}
																onChange={e => this.change(e, "currentlySelectedPrescriptionReasonReasonCode", "length", 1, 'update')}
																value={this.state.currentlySelectedPrescriptionReasonReasonCode}
															/>
															{this.state.currentlySelectedPrescriptionReasonReasonCodeState === "has-danger" ? (
																<label className="error">
																	Please enter a valid reason code
																</label>
															) : null}
														</FormGroup>
											</Col>
											<Col md="6">
														<FormGroup className={`has-label ${this.state.currentlySelectedPrescriptionReasonShortSummaryState}`}>
															<label>Short Summary</label>
															<Input
																name="shortsummary"
																type="text"
																readOnly={this.state.currentlySelectedPrescriptionReasonId === null}
																onChange={e => this.change(e, "currentlySelectedPrescriptionReasonShortSummary", "length", 1, 'update')}
																value={this.state.currentlySelectedPrescriptionReasonShortSummary}
															/>
															{this.state.currentlySelectedPrescriptionReasonShortSummaryState === "has-danger" ? (
																<label className="error">
																	Please enter a valid short summary
																</label>
															) : null}
														</FormGroup>
											</Col>
											<Col md="12">
														<FormGroup className={`has-label ${this.state.currentlySelectedPrescriptionReasonLongSummaryState}`}>
															<label>Long Summary</label>
															<Input
																name="longsummary"
																type="text"
																readOnly={this.state.currentlySelectedPrescriptionReasonId === null}
																onChange={e => this.change(e, "currentlySelectedPrescriptionReasonLongSummary", "length", 1, 'update')}
																value={this.state.currentlySelectedPrescriptionReasonLongSummary}
															/>
															{this.state.currentlySelectedPrescriptionReasonLongSummaryState === "has-danger" ? (
																<label className="error">
																	Please enter a valid long summary
																</label>
															) : null}
														</FormGroup>
											</Col>
										</Row>
									</CardBody>
									<CardFooter>
										<Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isUpdateFormValid || this.state.currentlySelectedPrescriptionReasonId === null} onClick={e => this.updatePrescriptionReason()}>
											Update Reason
										</Button>
									</CardFooter>
								</Card>
							</Col>
						</Col>

						<Col md="6">
							<Card>
								<CardBody>
									<ReactTable
											data={this.state.prescriptionReasons}
											filterable
											resizable={false}
											columns={[
												{
													Header: "ID",
													accessor: "prescriptionReasonId",
												},
												{
													Header: "Reason Code",
													accessor: "reasonCode"
												},
												{
													Header: "Short Summary",
													accessor: "shortSummary"
												},
												{
													Header: "Created At",
													accessor: "createdAt"
												},
												{
													Header: "Actions",
													accessor: "actions",
													sortable: false,
													filterable: false
												}
											]}
											defaultPageSize={7}
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

export default PrescriptionReason;