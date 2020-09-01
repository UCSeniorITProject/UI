import Axios from 'axios';

export async function getDrugTypesWithFilter(filter){
	const drugTypes = await Axios.get(`${process.env.REACT_APP_API_URL}/api/pharmacy-service/drug-type`, {params: filter});
	return drugTypes.data.drugTypes;
}