import { RouteComponentProps } from "@reach/router";
import { FunctionComponent } from "react";

const IndexPage: FunctionComponent<RouteComponentProps> = () => {
  return (
    <main className="content-layout">
      <h1 className="title vertical-margin spaced thin">Index Page</h1>
    </main>
  );
};

export default IndexPage;
