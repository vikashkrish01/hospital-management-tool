import axios from "axios";
import * as moment from "moment";
import {
  GET_ERRORS,
  GET_PATIENTS,
  SEND_META_DATA,
  GET_PATIENT,
  DELETE_PATIENT,
} from "../actions/actionTypes";

export const sendMetaDataToPatient = (metaData, history) => {
  return async (dispatch) => {
    dispatch({
      type: SEND_META_DATA,
      payload: metaData,
    });
    history.push("/dashboard");
  };
};

function updateObject(object, key, value) {
  object[key] = value;
  return object;
}

export const sendUpdatedData = (metaData, updatedTableData, history) => {
  return async (dispatch, getState) => {
    const dateForUpdate = moment(updatedTableData.birthDate).format(
      "YYYY-MM-DD"
    );
    const updatedPatientObject = updateObject(
      updatedTableData,
      "birthDate",
      dateForUpdate
    );
    dispatch(sendMetaDataToPatient(metaData, history));
    let needMeta = {};
    needMeta = getState().patient.patient.metaData;
    const newUpdated = updateObject(updatedPatientObject, "metaData", needMeta);
    try {
      if (Object.keys(metaData).length !== 0) {
        await axios.post(
          "http://localhost:8083/api/patient/createNewPatient",
          newUpdated
        );
        history.go("/dashboard");
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const createPatient = (patientObject, history) => {
  return async (dispatch, getState) => {
    let needMeta = {};
    needMeta = getState().patient.patient;
    console.log(needMeta);
    const da = moment(patientObject.birthDate).format("YYYY-MM-DD");
    const updatedPatientObject = updateObject(patientObject, "birthDate", da);
    Object.assign(updatedPatientObject, needMeta);
    try {
      if (Object.keys(needMeta).length !== 0) {
        await axios.post(
          "http://localhost:8083/api/patient/createNewPatient",
          updatedPatientObject
        );
        history.go("/dashboard");
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const getPatient = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8083/api/patient/getPatientById/${id}`
    );
    dispatch({
      type: GET_PATIENT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const getPatientsList = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8083/api/patient/getPatients");
  dispatch({
    type: GET_PATIENTS,
    payload: res.data,
  });
};

export const deletePatient = (id, history) => async (dispatch) => {
  await axios.delete(`http://localhost:8083/api/patient/deletePatient/${id}`);
  dispatch({
    type: DELETE_PATIENT,
    payload: id,
  });
  history.go("/dashboard");
};
