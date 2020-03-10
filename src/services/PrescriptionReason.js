import Axios from 'axios';

export async function createPrescriptionReason(prescriptionReasonToSave){
  const prescriptionReason = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason`, {prescriptionReason: prescriptionReasonToSave});

  return prescriptionReason.data.prescriptionReason;
}

export async function getPrescriptionReasonWithFilter(filter){
	const prescriptionReasons = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason`, {params: filter});
	return prescriptionReasons.data ? prescriptionReasons.data.prescriptionReasons : [];
}

export async function updatePrescriptionReason(prescriptionReasonId, fieldsToUpdate){
	const prescriptionReason = await Axios.patch(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason/${prescriptionReasonId}`, {prescriptionReason: fieldsToUpdate});

	return prescriptionReason.data.prescriptionReason;
}