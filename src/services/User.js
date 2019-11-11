import Axios from 'axios';

export async function getUserWithFilter(filter, token){
  const users = await Axios.get(`${process.env.REACT_APP_API_URL}/security-management/user?${filter}`);
}