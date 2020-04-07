import Axios from 'axios';

export async function getRoleWithFilter(filter) {
	const roles = await Axios.get(`${process.env.REACT_APP_API_URL}/api/security-service/role`, {params: filter});
	return roles.data.roles;
};