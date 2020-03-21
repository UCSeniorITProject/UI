import Axios from 'axios';

export async function createPrescriptionPrescribableDrugReason(prescriptionPrescribableDrugReasonInfo){
	const prescriptionPrescribableDrugReason = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug-reason`, {prescriptionPrescribableDrugReason: prescriptionPrescribableDrugReasonInfo});
	return prescriptionPrescribableDrugReason.data.prescriptionPrescribableDrugReason;
}