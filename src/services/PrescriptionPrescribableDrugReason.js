import Axios from 'axios';

export async function createPrescriptionPrescribableDrugReason(prescriptionPrescribableDrugReasonInfo){
	const prescriptionPrescribableDrugReason = await Axios.post(`${process.env.REACT_APP_API_URL}`);
	return prescriptionPrescribableDrugReason.data.prescriptionPrescribableDrugReason;
}