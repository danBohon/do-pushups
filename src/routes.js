import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Comps from "./components/comps/Comps";
import Create from "./components/create/Create";

export default (
  <Switch>
    <Route path="/comps" component={Comps} />
    <Route path="/create" component={Create} />
    <Route path="/" component={Home} />
  </Switch>
);
