import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

function FooterPage() {
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
      position: "relative",
      bottom: 0,
      width: "100%",
    },
    appbar: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Typography variant="h6" className={classes.title}>
          &copy; 2020 Vikash Krishnan Copyrights
        </Typography>
      </AppBar>
    </div>
  );
}

export default FooterPage;
