import Axios from 'axios';

export async function createPharmacy(pharmacy){
  const pharm = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/pharmacy`, {pharmacy});
  return pharm;
}

export async function getPharmacyList(){
  const pharmacies = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/pharmacy/list`);
  return pharmacies.data.pharmacies;
};

export async function getPharmacyById(pharmacyId){
  const pharmacy = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/pharmacy/${pharmacyId}`);
  return pharmacy.data.pharmacy;
}

export async function deletePharmacy(pharmacyId){
  await Axios.delete(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/pharmacy/${pharmacyId}`);
  return {};
}

export async function patchPharmacy(pharmacyId, pharmacyInfo){
  const pharmacy = await Axios.patch(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/pharmacy/${pharmacyId}`, {pharmacy: pharmacyInfo});
  return pharmacy.data.pharmacy;
}