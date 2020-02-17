import Axios from 'axios';

export async function getDrugWithFilter(filter){
  const drugs = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/drug`, {params: filter});
  return drugs.data.drugs;
};

export async function createDrug(drugInfo){
  const drug = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/drug`, {drug: drugInfo});
  return drug.data.drug;
}

export async function updateDrug(drugId, drugInfo){
  const drug = await Axios.patch(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/drug/${drugId}`, {drug: drugInfo});
  return drug.data.drug;
}