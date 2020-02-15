import Axios from 'axios';

export async function getDrugWithFilter(filter){
  const drugs = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/drug`, {params: filter});
  return drugs.data.drugs;
};