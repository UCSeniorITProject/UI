import Axios from 'axios';

export async function createPharmacy(pharmacy){
  const pharm = await Axios.post(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/pharmacy`, {pharmacy});
  return pharm;
}