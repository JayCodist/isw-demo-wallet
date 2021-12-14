import { Location } from "@reach/router";
import { FunctionComponent, useState } from "react";
import getRoutes from "./routes";
import AppLayout from "./components/layout/Layout";
import { User } from "./utils/helpers/types";
import UserContext from "./context/user-context";

const demoUser: User = {
  firstname: "Johnson",
  lastname: "Uba",
  username: "johnson.uba",
  email: "johnson@gmail.com"
};

const App: FunctionComponent = () => {
  const [user] = useState<User | null>(demoUser);

  return user ? (
    <UserContext.Provider value={user}>
      <Location>
        {({ location }) => (
          <AppLayout location={location}>{getRoutes()}</AppLayout>
        )}
      </Location>
    </UserContext.Provider>
  ) : (
    <div>Loading</div>
  );
};

export default App;
