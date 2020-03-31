import Axios from 'axios';

export async function createPrescription(prescriptionInfo){
	const prescription = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription`, {prescription: prescriptionInfo});
	return prescription.data.prescription;
}

export async function deletePrescription(prescriptionId){
	await Axios.delete(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription/${prescriptionId}`);
	return {};
}
export async function getPrescriptionByMonth(patientId){
	const data = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription/${patientId}/month`);
	return data.data.data;
}