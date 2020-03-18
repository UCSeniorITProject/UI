import Axios from 'axios';

export async function createPrescription(prescriptionInfo){
	const prescription = await Axios.post(`${process.env.REACT_APP_API_URL}`, {prescription: prescriptionInfo});
	return prescription.data.prescription;
}