import Axios from 'axios';

export async function getUserWithFilter(filter){
  const users = await Axios.get(`${process.env.REACT_APP_API_URL}/api/security-management/user`, {
    params: filter,
  });
  
  return users && users.data ? users.data : [];
}

export async function createUser(userInfo){
  const user = await Axios.post(`${process.env.REACT_APP_API_URL}/api/security-management/user`, {
    user: userInfo,
  });

  return user.data.user;
}

export async function refreshAccessToken(refreshToken){
  const tokens = await Axios.post(`${process.env.REACT_APP_API_URL}/api/security-management/token/refresh`, {
    refreshToken,
  });
  if(tokens !== undefined && tokens !== null && 'data' in  tokens){
    return tokens.data;
  }
  return null;
}

export async function patchUser(userId, dataToUpdate){
	const patient = await Axios.patch(`${process.env.REACT_APP_API_URL}/api/security-management/user/${userId}`, {user:  dataToUpdate});
	return patient.data.patient;
}