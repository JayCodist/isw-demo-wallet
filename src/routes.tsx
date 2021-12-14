import { Router, Redirect } from "@reach/router";
import Dashboard from "./pages/dashboard";
import AirTime from "./pages/airtime-data/airtime";
import Data from "./pages/airtime-data/data";
import RechargeHistory from "./pages/airtime-data/history";
import TransferAccount from "./pages/transfer/transfer-to-account";
import TransferECash from "./pages/transfer/transfer-to-ecash";
import TransferLink from "./pages/transfer/transfer-link";
import TransferHistory from "./pages/transfer/transfer-history";
import PayBills from "./pages/pay-bills";
import Services from "./pages/services";
import "./styles/globals.scss";
import NotFound from "./pages/not-found";

const getRoutes: () => JSX.Element = () => {
  const defaultLink = "/transfer/transfer-to-account";

  return (
    <Router>
      <Redirect from="/" to={defaultLink} noThrow />
      <Dashboard path="/dashboard" />

      <AirTime path="/airtime-data/recharge-airtime" />
      <Data path="/airtime-data/recharge-data" />
      <RechargeHistory path="/airtime-data/recharge-history" />

      <TransferAccount path={defaultLink} />
      <TransferECash path="/transfer/transfer-to-ecash" />
      <TransferLink path="/transfer/transfer-link" />
      <TransferHistory path="/transfer/transfer-history" />

      <PayBills path="/pay-bills" />
      <Services path="/services" />

      <NotFound default />
    </Router>
  );
};

export default getRoutes;
