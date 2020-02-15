import Axios from 'axios';

export async function getPatientWithFilter(filter){
	const patients = await Axios.get(`${process.env.REACT_APP_API_URL}/api/patient-service/patient`, {params: filter});
  return patients.data.patients;
}

export async function createPatient(patientInfo){
  const patient = await Axios.post(`${process.env.REACT_APP_API_URL}/api/patient-service/patient`, {patient: {...patientInfo}});
  return patient.data.patient;
}

export async function patchPatient(patientId, dataToPatch){
  const patient = await Axios.patch(`${process.env.REACT_APP_API_URL}/api/patient-service/patient/${patientId}`, {patient: dataToPatch});
  return patient.data.patient;
}

export async function deletePatent(patientId){
  await Axios.patch(`${process.env.REACT_APP_API_URL}/api/patient-service/${patientId}`);
  return {};
}