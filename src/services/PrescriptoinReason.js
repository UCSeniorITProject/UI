import Axios from 'axios';

export async function createPrescriptioinReason(prescriptionReason){
  const prescriptionReason = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-reason`, {prescriptionReason});

  return prescriptionReason.data.prescriptionReason;
}