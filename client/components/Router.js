import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import OrdersTotalPage from "./OrderTotalsPage";
import MealsPage from "./MealsPage";
import ApiConsole from "./ApiConsole";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={OrdersTotalPage} />
      <Route exact path="/meals" component={MealsPage} />
      <Route exact path="/apiconsole" component={ApiConsole} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
