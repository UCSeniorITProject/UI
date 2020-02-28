import Axios from 'axios';

export async function createPrescriptionReason(prescriptionReasonToSave){
  const prescriptionReason = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason`, {prescriptionReason: prescriptionReasonToSave});

  return prescriptionReason.data.prescriptionReason;
}

export async function getPrescriptionReasonWithFilter(filter){
	const prescriptionReasons = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason`, {params: filter});
	return prescriptionReasons.data.prescriptionReasons;
}

export async function updatePrescriptionReason(prescriptionReadId, fieldsToUpdate){
	const prescriptionReason = await Axios.put(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason/${prescriptionReadId}`, {prescriptionReason: fieldsToUpdate});

	return prescriptionReason.data.prescriptionReason;
}