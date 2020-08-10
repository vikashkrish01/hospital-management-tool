import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as patientAction from "../actions/patientActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 30,
    display: "flex",
  },
  pos: {
    marginBottom: 12,
  },
});

const MetaForm = (props) => {
  const classes = useStyles();
  const [metaData, setMetaData] = useState({
    city: "",
    healthIssue: "",
    age: "",
    address: "",
  });

  useEffect(() => {
    if (Object.keys(props.updateMetaData).length !== 0) {
      setMetaData({
        city: props.updateMetaData.metaData.city,
        healthIssue: props.updateMetaData.metaData.healthIssue,
        age: props.updateMetaData.metaData.age,
        address: props.updateMetaData.metaData.address,
      });
    }
  }, [props.updateMetaData]);

  const handleChange = (event) => {
    setMetaData({
      ...metaData,
      [event.target.id]: event.target.value,
    });
  };

  const handleAddMetaData = (event) => {
    event.preventDefault();
    props.sendMetaData(metaData, props.history);
  };

  const handleUpdateAndSave = (event) => {
    event.preventDefault();
    props.sendUpdateAndSave(metaData, props.patientUpdateData, props.history);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Other Details
        </Typography>
        <FormGroup>
          <TextField
            required
            onChange={handleChange}
            id="city"
            value={metaData.city}
            label="City"
            placeholder="City Name"
            varient="outlined"
            style={{ width: "25%" }}
          />
          <TextField
            required
            onChange={handleChange}
            id="age"
            value={metaData.age}
            label="Age"
            placeholder="Age"
            varient="outlined"
            style={{ width: "25%" }}
          />
          <TextField
            required
            onChange={handleChange}
            id="address"
            value={metaData.address}
            label="Address"
            placeholder="Address"
            varient="outlined"
            style={{ width: "25%" }}
          />
          <TextField
            required
            onChange={handleChange}
            id="healthIssue"
            value={metaData.healthIssue}
            label="Health Issue"
            placeholder="Health Issue"
            varient="outlined"
            style={{ width: "25%" }}
          />
          <br />
          <br />
          <div>
            <Button
              variant="contained"
              style={{ width: "20%", margin: "16px" }}
              color="primary"
              onClick={handleAddMetaData}
            >
              Add Other Details to the Patient
            </Button>
            <Button
              variant="contained"
              style={{ width: "20%" }}
              color="primary"
              disabled={!props.updateFlag}
              onClick={handleUpdateAndSave}
            >
              Update and Save Patient Data
            </Button>
          </div>
        </FormGroup>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.patient.patient,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMetaData: (metaData, history) =>
      dispatch(patientAction.sendMetaDataToPatient(metaData, history)),
    // onGetPatient: () => dispatch(patientAction.getPatientList()),
    sendUpdateAndSave: (metaData, updatedTableData, history) =>
      dispatch(
        patientAction.sendUpdatedData(metaData, updatedTableData, history)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetaForm);
