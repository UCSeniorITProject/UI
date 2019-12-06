import Axios from 'axios';

export async function getPatientList(doctorId){
  const patients = await Axios.get(`${process.env.REACT_APP_API_URL}/api/patient-service/patient/list?doctorId=${doctorId}`);
  return patients.data || {patients: []};
}