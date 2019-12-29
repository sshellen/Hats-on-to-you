import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App/App";
import Loader from "./App/Loader"
import Context from "./Components/Context"

const routes = (
  <BrowserRouter basename={"/hats"} Provider={Context}>
    <Switch>
      <Route path="/" component={Loader} exact default />
      <Route path="/app" component={App} />
    </Switch>
  </BrowserRouter>
);

export default routes;
