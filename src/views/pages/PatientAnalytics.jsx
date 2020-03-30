import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { Line, Pie, Bar } from "react-chartjs-2";
import moment from 'moment';
import React from "react";
import {getPrescriptionByMonth} from '../../services/Prescription';
import {getPrescribableByMonth} from '../../services/Prescribable';
import {getPrescribablesByReason, getPrescriptionReasonCount} from '../../services/PrescriptionReason';
import {getPrescriptionPrescribableDrugCountForLastYear, getCountOfPrescribablePerDoctor} from '../../services/PrescriptionPrescribableDrug';
class PatientAnalytics extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			patientId: this.props.match.params.id,
			prescriptionsByMonthData: {},
			prescribablesByReason: {},
			prescriptionPrescribableDrugTotalForYear: {},
			countOfPrescrtibablePerDoctor: {},
			prescriptionReasonCount: {},
			prescribableByMonths: {},
		};
	}

	async componentDidMount(){
		try {
			const [
				prescriptionsByMonth,
				prescribablesByReason,
				prescriptionPrescribableDrugTotalForYear,
				countOfPrescrtibablePerDoctor,
				prescriptionReasonCount,
				prescribableByMonth] = await Promise.all([
				getPrescriptionByMonth(this.state.patientId),
				getPrescribablesByReason(this.state.patientId),
				getPrescriptionPrescribableDrugCountForLastYear(this.state.patientId),
				getCountOfPrescribablePerDoctor(this.state.patientId),
				getPrescriptionReasonCount(this.state.patientId),
				getPrescribableByMonth(this.state.patientId),
			]);
			this.setState({
				prescriptionsByMonthData: this.createPrescriptionsByMonthChart(prescriptionsByMonth),
				prescribablesByReason: this.createPrescribablesByReasonChart(prescribablesByReason),
				prescriptionPrescribableDrugTotalForYear: this.createPrescriptionPrescribableDrugTotalForYear(prescriptionPrescribableDrugTotalForYear),
				countOfPrescrtibablePerDoctor: this.getCountOfPrescribablePerDoctor(countOfPrescrtibablePerDoctor),
				prescriptionReasonCount: this.getPrescriptionReasonCountChart(prescriptionReasonCount),
				prescribableByMonths: this.getPrescribableByMonthChart(prescribableByMonth),
			}); 
		} catch (err) {
			console.log(err)
			this.showErrorLoadingDataMessage();
		}
	}

	getPrescribableByMonthChart (data) {
		const canvas = document.getElementById('prescribableByMonth');
		let ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
		gradientStroke.addColorStop(0, "rgba(253,93,147,0)");
		return {
      labels: data.map(x=>x.createdAt),
      datasets: [
        {
          label: "Prescribables",
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

	getPrescriptionReasonCountChart (data){
		const canvas = document.getElementById('prescriptionReasonCount');
		let ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
		gradientStroke.addColorStop(0, "rgba(253,93,147,0)");
		return {
      labels: data.map(x=>x.reasonCode),
      datasets: [
        {
          label: "Reasons",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#ff5991",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: data.map(x=>x.numReason),
        }
      ]
    };
	}

	getCountOfPrescribablePerDoctor(data){
		return {
			labels: data.map(x=>x.doctorName),
			datasets: [
				{
					pointRadius: 0,
					pointHoverRadius: 0,
					backgroundColor: ["#00c09d", "#e2e2e2"],
					borderWidth: 0,
					data: data.map(x=>x.numPrescriptions),
				}
			]
		}
	}

	createPrescribablesByReasonChart(data){
		return {
				labels: data.map(x=>`${x.prescribableName}: ${x.reasonCode}`),
				datasets:[
					{
						pointRadius: 0,
						pointHoverRadius: 0,
						backgroundColor: ["#00c09d", "#e2e2e2"],
						borderWidth: 0,
						data: data.map(x=>x.numPrescriptions),
					}
				],
		};
	};

	createPrescriptionPrescribableDrugTotalForYear(data){
		const canvas = document.getElementById('prescriptionPrescribableDrugTotalForYearChart');
		let ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
		gradientStroke.addColorStop(0, "rgba(253,93,147,0)");
		return {
      labels: data.map(x=>x.prescribableName),
      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#ff5991",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: data.map(x=>x.prescriptionCount),
        }
      ]
    };
	}

	createPrescriptionsByMonthChart(data){
		const canvas = document.getElementById('prescriptionsByMonth');
		let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

    return {
			labels: data.map(x => moment(x.createdAt).format('MMMM YYYY')),
      datasets: [
        {
          label: "Prescriptions By Month",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
					pointRadius: 4,
          data: data.map(x => x.numPrescriptions)
        }
      ]
    };
	}

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
												id="prescriptionsByMonth"
												data={this.state.prescriptionsByMonthData}
												options={{maintainAspectRatio: false}}
											/>
										</div>
									</CardBody>
								</Card>
						</Col>
						<Col md="4">
						<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Prescribables By Reason</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Pie
												id="prescribablesByReason"
												data={this.state.prescribablesByReason}
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
						<Col md="4">
							<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Total of Each Prescription</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Bar
												id="prescriptionPrescribableDrugTotalForYearChart"
												data={this.state.prescriptionPrescribableDrugTotalForYear}
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
						<Col md="4">
						<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<CardTitle tag="h2">Prescriptions by Doctor</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Pie
												id="prescribablesByDoctor"
												data={this.state.countOfPrescrtibablePerDoctor}
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
												<CardTitle tag="h2">Total of Each Reason</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Bar
												id="prescriptionReasonCount"
												data={this.state.prescriptionReasonCount}
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
												<CardTitle tag="h2">Total Prescribable By Month</CardTitle>
											</Col>
										</Row>
									</CardHeader>
									<CardBody>
										<div className="chart-area">
											<Line
												id="prescribableByMonth"
												data={this.state.prescribableByMonths}
												options={{maintainAspectRatio: false}}
											/>
										</div>
									</CardBody>
								</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default PatientAnalytics;