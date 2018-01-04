import React from "react";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  HeaderContainer: {
    width: "100% !important",
    padding: "0 !important",
  },
};

const PageHeader = ({ classes, location }) => {
  return (
    <Grid className={classes.HeaderContainer}>
      <Row>
        <Col xsHidden smHidden md={12} lg={12}>
          {location.pathname === "/" ||
          location.pathname === "/404-page-not-found" ? (
            <Masthead />
          ) : (
            <MastheadBar location={location} />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <MastheadBar location={location} />
        </Col>
      </Row>
    </Grid>
  );
};

export default injectSheet(styles)(PageHeader);
