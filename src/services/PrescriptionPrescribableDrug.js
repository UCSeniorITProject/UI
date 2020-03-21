import Axios from 'axios';

export async function createPrescriptionPrescribableDrug(prescriptionPrescribableDrugInfo, patientId){
	const prescriptionPrescribableDrug = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug/${patientId}`, {prescriptionPrescribableDrug: prescriptionPrescribableDrugInfo});
  return prescriptionPrescribableDrug.data.prescriptionPrescribableDrug;
}