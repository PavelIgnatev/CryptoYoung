import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TestPage = lazy(() => import("./test"));

export const Routing = () => {
  return (
    <Switch>
      213
      <Route exact path="/" component={TestPage} />
      <Redirect to="/" />
    </Switch>
  );
};
