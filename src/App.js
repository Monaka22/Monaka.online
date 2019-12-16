import React, { Component, Suspense } from "react";
import "antd/dist/antd.css";
import "./App.css";
import history from "./utils/history";
import { Layout } from "antd";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PropagateLoader from "react-spinners/PropagateLoader";

import Header from "./components/headerComponent";
import Chaewon from "./components/cheawonComponent";
import Ruka from "./components/rukaComponent";
import Fuka from "./components/fukaComponent";
import Manaka from "./components/manakaComponent";
import Suzuka from "./components/suzukaComponent";
import Upload from "./components/upload";
import Delete from "./components/deletePhoto";

class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={null}>
          <LoadingOverlay
            active={this.props.isLoading}
            spinner={
              <PropagateLoader color={"#F5A623"} size={40} sizeUnit={"px"} />
            }
          >
            <Router history={history}>
            <React.Fragment>
              <Layout>
                <Header />
                <Switch>
                  <div style={{ paddingTop: 65 }}>
                    <Route exact={true} path="/" component={Chaewon} />
                    <Route exact={true} path="/ruka" component={Ruka} />
                    <Route exact={true} path="/yiren" component={Fuka} />
                    <Route exact={true} path="/manaka" component={Manaka} />
                    <Route exact={true} path="/itzy" component={Suzuka} />
                    <Route
                      exact={true}
                      path="/UploadNewPhotoByDojeed"
                      component={Upload}
                    />
                    <Route
                      exact={true}
                      path="/DeletePhotoByDojeed"
                      component={Delete}
                    />
                  </div>
                </Switch>
              </Layout>
              </React.Fragment>
            </Router>
          </LoadingOverlay>
        </Suspense>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoading: state.loading.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
