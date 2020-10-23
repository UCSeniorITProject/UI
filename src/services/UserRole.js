import Axios from "axios";

export async function getUserRoleWithFilter(filter) {
  const userRoles = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/security-service/user-role`,
    { params: filter }
  );
  return userRoles.data.userRoles;
}
