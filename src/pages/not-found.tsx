import { RouteComponentProps } from "@reach/router";
import { FunctionComponent } from "react";

const NotFound: FunctionComponent<RouteComponentProps> = () => {
  return (
    <main className="content-layout">
      <div className="flex center center-align column blue larger vertical-margin">
        <h1 className="title xl">404</h1>
        <h1 className="thin">Not found</h1>
      </div>
    </main>
  );
};

export default NotFound;
