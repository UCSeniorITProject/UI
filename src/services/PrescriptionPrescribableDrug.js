import Axios from 'axios';

export async function createPrescriptionPrescribableDrug(prescriptionPrescribableDrugInfo, patientId){
	const prescriptionPrescribableDrug = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug/${patientId}`, {prescriptionPrescribableDrug: prescriptionPrescribableDrugInfo});
  return prescriptionPrescribableDrug.data.prescriptionPrescribableDrug;
}

export async function getPrescriptionPrescribableDrugCountForLastYear(patientId){
	const prescriptionPrescribableDrug = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug/patient/${patientId}/prescribable-count`);
	return prescriptionPrescribableDrug.data.data;
}

export async function getCountOfPrescribablePerDoctor(patientId){
	const countOfPrescribablePerDoctor = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug/patient/${patientId}/doctor-count`);
	return countOfPrescribablePerDoctor.data.data;
}