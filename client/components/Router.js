import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import OrdersTotalPage from './OrderTotalsPage';
import MealsPage from './MealsPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={OrdersTotalPage} />
      <Route exact path="/meals" component={MealsPage} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;