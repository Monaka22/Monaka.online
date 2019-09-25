import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Header from "./components/headerComponent";
import Chaewon from "./components/cheawonComponent";
import Ruka from "./components/rukaComponent";
import Fuka from "./components/fukaComponent";
import Manaka from "./components/manakaComponent";
import Suzuka from "./components/suzukaComponent";

function App() {
  return (
    <div>
      <Router>
          <Layout>
            <Header />
            <Switch>
              <div style={{paddingTop : 65}}>
                <Route exact={true} path="/" component={Chaewon} />
                <Route exact={true} path="/ruka" component={Ruka} />
                <Route exact={true} path="/fuka" component={Fuka} />
                <Route exact={true} path="/manaka" component={Manaka} />
                <Route exact={true} path="/suzuka" component={Suzuka} />
              </div>
            </Switch>
          </Layout>
      </Router>
    </div>
  );
}

export default App;
