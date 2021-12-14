import { Router } from "@reach/router";
import IndexPage from "./pages";
import "./styles/globals.scss";
import NotFound from "./pages/not-found";

const getRoutes: () => JSX.Element = () => {
  const defaultLink = "/";

  return (
    <Router>
      <IndexPage path={defaultLink} />
      <NotFound default />
    </Router>
  );
};

export default getRoutes;
