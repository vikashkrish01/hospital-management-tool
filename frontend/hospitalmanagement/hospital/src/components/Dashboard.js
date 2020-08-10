import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import * as patientAction from "../actions/patientActions";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MetaFinalForm from "./MetaFinalForm";

const Dashboard = (props) => {
  const [status, setStatus] = useState(false);
  const [metaStatus, setMetaStatus] = useState(false);
  const [oldMetaDataKey, setoldMetaDataKey] = useState("");
  const [patientUpdateTableData, setPatientUpdateTableData] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateFlagForButton, setUpdateFlagForButton] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  useEffect(() => {}, [props.patientMetaForUpdate]);

  useEffect(() => {
    props.onGetPatients();
  }, []);

  useEffect(() => {
    if (oldMetaDataKey !== "" && updateFlag === true) {
      props.onGetPatient(oldMetaDataKey, props.history);
    }
  }, [oldMetaDataKey, updateFlag]);

  useEffect(() => {
    if (props.statusForMetaData && updateFlag !== true) {
      setMetaStatus(
        Object.keys(props.statusForMetaData).length !== 0 ? true : false
      );
    }
  }, [props.statusForMetaData]);

  const classes = useStyles();
  return (
    <>
      <MetaFinalForm
        updateMetaData={props.patientMetaForUpdate}
        patientUpdateData={patientUpdateTableData}
        updateFlag={updateFlagForButton}
        history={props.history}
      />
      {updateFlag ? (
        <div className={classes.root}>
          <Alert
            severity="success"
            onClose={() => {
              setUpdateFlag(false);
            }}
          >
            Added to the Update list . Now change the other details and Save.
          </Alert>
        </div>
      ) : null}
      {metaStatus ? (
        <div className={classes.root}>
          <Alert
            severity="success"
            onClose={() => {
              setMetaStatus(false);
            }}
          >
            Added to the Others list . Now add the Patient in the table
          </Alert>
        </div>
      ) : null}
      {status ? (
        <div className={classes.root}>
          <Alert
            severity="error"
            onClose={() => {
              setStatus(false);
            }}
          >
            Add the Other Details First
          </Alert>
        </div>
      ) : null}
      <MaterialTable
        title="Patient Table"
        columns={props.columns}
        data={props.patients}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (resolve(props.onPatientCreate(newData, props.history))) {
                } else {
                  reject(setStatus(true));
                }
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(setPatientUpdateTableData(newData));
                resolve(setoldMetaDataKey(oldData.systemIdNumber));
                resolve(setUpdateFlag(true));
                resolve(setUpdateFlagForButton(true));
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(
                  props.deletePatientById(oldData.systemIdNumber, props.history)
                );
              }, 600);
            }),
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patient.forDisplayTable,
    patientMetaForUpdate: state.patient.patient,
    columns: state.patient.columns,
    statusForMetaData: state.patient.patient.metaData,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPatientCreate: (newData, history) =>
      dispatch(patientAction.createPatient(newData, history)),
    onGetPatients: () => dispatch(patientAction.getPatientsList()),
    onGetPatient: (officialKey, history) =>
      dispatch(patientAction.getPatient(officialKey, history)),
    deletePatientById: (id, history) =>
      dispatch(patientAction.deletePatient(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
