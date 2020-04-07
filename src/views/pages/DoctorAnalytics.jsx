import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { Line, Pie, Bar } from "react-chartjs-2";
import React from "react";
import {getPrescriptionByMonthForDoctor} from '../../services/Prescription';
import {getPrescribableBreakdown, getPrescribableBreakdownByPatientForDoctor, getNumPrescribablesPerMonthForDoctor} from '../../services/Prescribable';
import {getPrescriptionPrescribableDrugReasonBreakdownForDoctor} from '../../services/PrescriptionPrescribableDrugReason';
class DoctorAnalytics extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			doctorId: this.props.match.params.id,
			prescriptionsByMonthData: {},
			prescribableBreakdown: {},
			reasonBreakdown: {},
			patientBreakdown: {},
			prescribablesByMonth: {},
		}
	}

	async componentDidMount(){
		try {
			const [prescriptionsByMonthForDoctor, prescribableBreakdown, reasonBreakdown, prescribableBreakdownForPatient, prescribablesByMonth] = await Promise.all([
				getPrescriptionByMonthForDoctor(this.state.doctorId),
				getPrescribableBreakdown(this.state.doctorId),
				getPrescriptionPrescribableDrugReasonBreakdownForDoctor(this.state.doctorId),
				getPrescribableBreakdownByPatientForDoctor(this.state.doctorId),
				getNumPrescribablesPerMonthForDoctor(this.state.doctorId),
			]);
			this.setState({
				prescriptionsByMonthData: this.getPrescriptionByMonthChart(prescriptionsByMonthForDoctor),
				prescribableBreakdown: this.getPrescribableBreakdownChart(prescribableBreakdown),
				reasonBreakdown: this.getReasonBreakdownChart(reasonBreakdown),
				patientBreakdown: this.getPatientBreakDownChart(prescribableBreakdownForPatient),
				prescribablesByMonth: this.getPrescribablesByMonthChart(prescribablesByMonth),
			})
		} catch (err){
			this.showErrorLoadingDataMessage();
		}
	}

	getPrescribablesByMonthChart (data) {
		const canvas = document.getElementById('prescribablesByMonth');
		let ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
		gradientStroke.addColorStop(0, "rgba(253,93,147,0)");
		return {
      labels: data.map(x=>x.createdAt),
      datasets: [
        {
          label: "Prescriptions",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#ff5991",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: data.map(x=>x.numPrescribables),
        }
      ]
    };
	}

	getPrescriptionByMonthChart (data) {
		const canvas = document.getElementById('prescriptionByMonth');
		let ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
		gradientStroke.addColorStop(0, "rgba(253,93,147,0)");
		return {
      labels: data.map(x=>x.createdAt),
      datasets: [
        {
          label: "Prescriptions",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#ff5991",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: data.map(x=>x.numPrescriptions),
        }
      ]
    };
	}

	getPatientBreakDownChart(data){
		return {
				labels: data.map(x=>`${x.patientName}`),
				datasets:[
					{
						pointRadius: 0,
						pointHoverRadius: 0,
						backgroundColor: ["#00c09d", "#e2e2e2"],
						borderWidth: 0,
						data: data.map(x=>x.numPrescribables),
					}
				],
		};
	};

	getReasonBreakdownChart(data){
		return {
				labels: data.map(x=>x.prescribableReasonName),
				datasets:[
					{
						pointRadius: 0,
						pointHoverRadius: 0,
						backgroundColor: ["#00c09d", "#e2e2e2"],
						borderWidth: 0,
						data: data.map(x=>x.numPrescribableReason),
					}
				],
		};
	};

	getPrescribableBreakdownChart(data){
		return {
				labels: data.map(x=>x.prescribableName),
				datasets:[
					{
						pointRadius: 0,
						pointHoverRadius: 0,
						backgroundColor: ["#00c09d", "#e2e2e2"],
						borderWidth: 0,
						data: data.map(x=>x.numPrescribables),
					}
				],
		};
	};

	showErrorLoadingDataMessage(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						An error occurred while loading patient data. Please try again later or contact your administrator!
					</div>
				</div>
			),
			type: 'error',
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
							<Card className="card-chart">
										<CardHeader>
											<Row>
												<Col className="text-left" sm="6">
													<CardTitle tag="h2">Total Prescriptions By Month</CardTitle>
												</Col>
											</Row>
										</CardHeader>
										<CardBody>
											<div className="chart-area">
												<Line
													id="prescriptionByMonth"
													data={this.state.prescriptionsByMonthData}
													options={{maintainAspectRatio: false}}
												/>
											</div>
										</CardBody>
									</Card>
							</Col>
							<Col md="6">
						<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Prescribable Breakdown</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Pie
												id="prescribableBreakdown"
												data={this.state.prescribableBreakdown}
												options={{
													maintainAspectRatio: false,
													cutoutPercentage: 70,
													legend: {
														display: true
													},
											
													tooltips: {
														backgroundColor: "#f5f5f5",
														titleFontColor: "#333",
														bodyFontColor: "#666",
														bodySpacing: 4,
														xPadding: 12,
														mode: "nearest",
														intersect: 0,
														position: "nearest"
													},
											
													scales: {
														yAxes: [
															{
																display: 0,
																ticks: {
																	display: false
																},
																gridLines: {
																	drawBorder: false,
																	zeroLineColor: "transparent",
																	color: "rgba(255,255,255,0.05)"
																}
															}
														],
											
														xAxes: [
															{
																display: 0,
																barPercentage: 1.6,
																gridLines: {
																	drawBorder: false,
																	color: "rgba(255,255,255,0.1)",
																	zeroLineColor: "transparent"
																},
																ticks: {
																	display: false
																}
															}
														]
													}}}
											/>
										</div>
									</CardBody>
								</Card>
						</Col>
						<Col md="6">
						<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Reason Breakdown</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Pie
												id="reasonBreakdown"
												data={this.state.reasonBreakdown}
												options={{
													maintainAspectRatio: false,
													cutoutPercentage: 70,
													legend: {
														display: true
													},
											
													tooltips: {
														backgroundColor: "#f5f5f5",
														titleFontColor: "#333",
														bodyFontColor: "#666",
														bodySpacing: 4,
														xPadding: 12,
														mode: "nearest",
														intersect: 0,
														position: "nearest"
													},
											
													scales: {
														yAxes: [
															{
																display: 0,
																ticks: {
																	display: false
																},
																gridLines: {
																	drawBorder: false,
																	zeroLineColor: "transparent",
																	color: "rgba(255,255,255,0.05)"
																}
															}
														],
											
														xAxes: [
															{
																display: 0,
																barPercentage: 1.6,
																gridLines: {
																	drawBorder: false,
																	color: "rgba(255,255,255,0.1)",
																	zeroLineColor: "transparent"
																},
																ticks: {
																	display: false
																}
															}
														]
													}}}
											/>
										</div>
									</CardBody>
								</Card>
						</Col>
						<Col md="6">
							<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Total of Each Prescribable</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Bar
												id="prescriptionReasonCount"
												data={this.state.prescribableBreakdown}
												options={{
													maintainAspectRatio: false,
													legend: {
														display: false
													},
													tooltips: {
														backgroundColor: "#f5f5f5",
														titleFontColor: "#333",
														bodyFontColor: "#666",
														bodySpacing: 4,
														xPadding: 12,
														mode: "nearest",
														intersect: 0,
														position: "nearest"
													},
													responsive: true,
													scales: {
														yAxes: [
															{
																gridLines: {
																	drawBorder: false,
																	color: "rgba(253,93,147,0.1)",
																	zeroLineColor: "transparent"
																},
																ticks: {
																	suggestedMin: 60,
																	suggestedMax: 125,
																	padding: 20,
																	fontColor: "#9e9e9e"
																}
															}
														],
														xAxes: [
															{
																gridLines: {
																	drawBorder: false,
																	color: "rgba(253,93,147,0.1)",
																	zeroLineColor: "transparent"
																},
																ticks: {
																	padding: 20,
																	fontColor: "#9e9e9e"
																}
															}
														]
													}
												}}
											/>
										</div>
									</CardBody>
								</Card>
						</Col>
						<Col md="6">
						<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Patient Prescribable Breakdown</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Pie
												id="patientBreakdown"
												data={this.state.patientBreakdown}
												options={{
													maintainAspectRatio: false,
													cutoutPercentage: 70,
													legend: {
														display: true
													},
											
													tooltips: {
														backgroundColor: "#f5f5f5",
														titleFontColor: "#333",
														bodyFontColor: "#666",
														bodySpacing: 4,
														xPadding: 12,
														mode: "nearest",
														intersect: 0,
														position: "nearest"
													},
											
													scales: {
														yAxes: [
															{
																display: 0,
																ticks: {
																	display: false
																},
																gridLines: {
																	drawBorder: false,
																	zeroLineColor: "transparent",
																	color: "rgba(255,255,255,0.05)"
																}
															}
														],
											
														xAxes: [
															{
																display: 0,
																barPercentage: 1.6,
																gridLines: {
																	drawBorder: false,
																	color: "rgba(255,255,255,0.1)",
																	zeroLineColor: "transparent"
																},
																ticks: {
																	display: false
																}
															}
														]
													}}}
											/>
										</div>
									</CardBody>
								</Card>
						</Col>
						<Col md="12">
							<Card className="card-chart">
										<CardHeader>
											<Row>
												<Col className="text-left" sm="6">
													<CardTitle tag="h2">Total Prescribables By Month</CardTitle>
												</Col>
											</Row>
										</CardHeader>
										<CardBody>
											<div className="chart-area">
												<Line
													id="prescribablesByMonth"
													data={this.state.prescribablesByMonth}
													options={{maintainAspectRatio: false}}
												/>
											</div>
										</CardBody>
									</Card>
							</Col>
					</Row>
				</div>
			</>
		)
	}
};

export default DoctorAnalytics;