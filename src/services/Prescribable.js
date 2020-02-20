import Axios from 'axios';

export async function createPrescribable(prescribable){
  const prescribableToSave = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable`, {prescribable});

  return prescribableToSave.data.prescribable;
}