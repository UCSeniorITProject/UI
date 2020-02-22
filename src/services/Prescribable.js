import Axios from 'axios';

export async function createPrescribable(prescribable){
  const prescribableToSave = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable`, {prescribable});

  return prescribableToSave.data.prescribable;
}

export async function getPrescribableWithFilter(filter){
	const prescribables = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable`, {params: filter});

	return prescribables.data.prescribables;
}