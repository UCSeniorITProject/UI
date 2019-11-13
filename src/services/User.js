import Axios from 'axios';

export async function getUserWithFilter(filter){
  const users = await Axios.get(`${process.env.REACT_APP_API_URL}/api/security-management/user`, {
    params: filter,
  });

  return users.data;
}