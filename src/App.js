import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoutePage from "./routes/Roots.js";
import { Skeleton } from "antd";

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Skeleton active />}>
          <Switch>
            {RoutePage.map((route) =>
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            )}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}