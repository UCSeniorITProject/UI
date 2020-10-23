import Axios from "axios";

export async function createPrescribable(prescribable) {
  const prescribableToSave = await Axios.post(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable`,
    { prescribable }
  );

  return prescribableToSave.data.prescribable;
}

export async function getPrescribableWithFilter(filter) {
  const prescribables = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable`,
    { params: filter }
  );

  return prescribables.data.prescribables;
}

export async function patchPrescribable(prescribableId, infoToPatch) {
  const prescribable = await Axios.patch(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable/${prescribableId}`,
    { prescribable: infoToPatch }
  );

  return prescribable.data.prescribable;
}

export async function getPrescribableByMonth(patientId) {
  const prescribableByMonth = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable/${patientId}/by-month`
  );
  return prescribableByMonth.data.data;
}

export async function getPrescribableBreakdown(doctorId) {
  const prescribableBreakdown = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable/doctor/${doctorId}/breakdown`
  );
  return prescribableBreakdown.data.data;
}

export async function getPrescribableBreakdownByPatientForDoctor(doctorId) {
  const prescribableBreakdown = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable/doctor/${doctorId}/patient/breakdown`
  );
  return prescribableBreakdown.data.data;
}

export async function getNumPrescribablesPerMonthForDoctor(doctorId) {
  const prescribableBreakdown = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescribable/doctor/${doctorId}/breakdown/by-month`
  );
  return prescribableBreakdown.data.data;
}
