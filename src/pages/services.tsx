import { RouteComponentProps } from "@reach/router";
import { FunctionComponent } from "react";

const IndexPage: FunctionComponent<RouteComponentProps> = props => {
  const { location } = props;
  const route = location?.pathname;
  const routeTitle = ((route || "").split("/").pop() || "")
    .replace(/^\w/, char => char.toUpperCase())
    .replace(/-./gi, chars => ` ${chars.slice(1).toUpperCase()}`);
  return (
    <main className="content-layout">
      <h1>{routeTitle}</h1>
      <p>Coming soon</p>
    </main>
  );
};

export default IndexPage;
