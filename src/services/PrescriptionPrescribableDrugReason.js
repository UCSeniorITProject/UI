import Axios from "axios";

export async function createPrescriptionPrescribableDrugReason(
  prescriptionPrescribableDrugReasonInfo
) {
  const prescriptionPrescribableDrugReason = await Axios.post(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug-reason`,
    {
      prescriptionPrescribableDrugReason: prescriptionPrescribableDrugReasonInfo,
    }
  );
  return prescriptionPrescribableDrugReason.data
    .prescriptionPrescribableDrugReason;
}

export async function getPrescriptionPrescribableDrugReasonBreakdownForDoctor(
  doctorId
) {
  const prescriptionPrescribableDrugReasonBreakdown = await Axios.get(
    `${process.env.REACT_APP_API_URL}/api/pharmacy-service/prescription-prescribable-drug-reason/doctor/${doctorId}/breakdown`
  );
  return prescriptionPrescribableDrugReasonBreakdown.data.data;
}
