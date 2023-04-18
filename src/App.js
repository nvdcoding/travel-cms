import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoutePage from "./routes/Roots.js";
import { Skeleton } from "antd";
import { createBrowserHistory } from "history";
import PrivateRoute from "./routes/PrivateRouter";
export const history = createBrowserHistory();

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Skeleton active />}>
          <Switch>
            {RoutePage.map((route) =>
              route.authen ? (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              )
            )}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
