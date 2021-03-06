import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AuthenticationService from "./AuthenticationService";
import QueryDataService from "../api/QueryDataService";

import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles/SingleQueryStyles";

import EditIcon from "@material-ui/icons/Edit";
import { Card } from "react-bootstrap";
import Chip from "@material-ui/core/Chip";

import SolutionComponent from "./SolutionComponent";

class SingleQueryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      username: AuthenticationService.getLoggedInUsername(),
      query: {},
      solutions: [],
      categories: [],
    };
  }

  componentDidMount() {
    QueryDataService.retrieveQuery(this.state.username, this.state.id).then(
      (response) =>
        this.setState({
          query: response.data,
          categories: response.data.categoryList,
        })
    );
    QueryDataService.retriveSolutions(this.state.id).then((response) =>
      this.setState({
        solutions: response.data,
        len: response.data.length,
      })
    );
  }

  render() {
    const { query, categories, solutions } = this.state;
    const { classes } = this.props;

    const sol =
      this.state.len > 0 ? (
        solutions.map((c) => <SolutionComponent solution={c} />)
      ) : (
        <h4 style={{ border: "30px" }}>No Solution Posted Yet.</h4>
      );
    return (
      <div>
        <HeaderComponent
          login={false}
          register={false}
          logout={true}
          logot={this.props.logout}
        />
        <div className={classes.main}>
          <div className={classes.query}>
            <Paper
              className={classes.paper}
              style={{
                marginTop: "20px",
              }}
            >
              <Card
                style={{
                  textAlign: "left",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                <Card.Header>
                  <div
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    {query.title}
                    <span style={{ float: "right" }}>
                      <EditIcon />
                      {query.username}
                    </span>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{query.description}</Card.Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "left",
                      flexWrap: "wrap",
                    }}
                  >
                    {categories.map((cat) => (
                      <Chip
                        key={cat}
                        id={cat}
                        style={{
                          margin: "2px",
                          backgroundColor: "#1C8EF9",
                          color: "white",
                        }}
                        label={cat}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
              {sol}
            </Paper>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default withStyles(styles)(SingleQueryComponent);
