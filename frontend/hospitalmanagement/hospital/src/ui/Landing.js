import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import landingimage from "../images/landingimage.jpg";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    maxHeight: 500,
  },
  buttonName: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    width: "auto",
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={landingimage}
          title="Hosptial cover"
        />
      </Card>
      <div className={classes.buttonName}>
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Button variant="contained" color="primary">
          Sign Up
        </Button>
      </div>
    </>
  );
}
