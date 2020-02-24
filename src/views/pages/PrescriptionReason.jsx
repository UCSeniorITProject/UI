class PrescriptionReason extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shortSummary: '',
      shortSummaryState: null,
      longSummary: '',
      longSummaryState: null,
      reasonCode: '',
      reasonCodeState: null,
      prescriptionReasons: [],
      currentlySelectedPrescriptionReasonId: null,
      currentlySelectedPrescriptionReasonShortSummary: '',
      currentlySelectedPrescriptionReasonShortSummaryState: null,
      currentlySelectedPrescriptionReasonLongSummary: '',
      currentlySelectedPrescriptionReasonLongSummaryState: null,
      currentlySelectedPrescriptionReasonReasonCode: '',
      currentlySelectedPrescriptionReasonReasonCodeState: null,
    }
  }
}