import {
  GET_PATIENTS,
  GET_PATIENT,
  DELETE_PATIENT,
  SEND_META_DATA,
} from "../actions/actionTypes";

const initialState = {
  columns: [
    { title: "Patient Name", field: "patientName" },

    {
      title: "System generated Id",
      field: "systemIdNumber",
      editable: "never",
    },
    {
      title: "Official ID number",
      field: "officialIdNumber",
    },
    { title: "Birth Year", field: "birthDate", type: "date" },
    { title: "Email", field: "email" },
    {
      title: "Created On",
      field: "created_At",
      type: "date",
      editable: "never",
    },
    {
      title: "Updated On",
      field: "updated_At",
      type: "date",
      editable: "never",
    },
    { title: "Other Details", editable: "never", field: "metaData" },
  ],
  patients: [],
  forDisplayTable: [],
  patient: {},
};

function updateObject(object, key, value) {
  value = value.replace(/\"/g, "  ");
  object[key] = value.split(",").join("||");
  return object;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      if (action.payload.length > 0) {
        let forCopyCheck = [];
        forCopyCheck = action.payload;
        let finalDisplayList = [];
        finalDisplayList = forCopyCheck.map((eachData) => {
          return updateObject(
            eachData,
            "metaData",
            JSON.stringify(eachData.metaData).slice(
              1,
              JSON.stringify(eachData.metaData).length - 1
            )
          );
        });
        return {
          ...state,
          patients: action.payload,
          forDisplayTable: finalDisplayList,
        };
      } else {
        return state;
      }
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };

    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(
          (patient) => patient.systemIdNumber !== action.payload
        ),
      };
    case SEND_META_DATA:
      return {
        ...state,
        patient: { ...state.patient, metaData: action.payload },
      };
    default:
      return state;
  }
}
