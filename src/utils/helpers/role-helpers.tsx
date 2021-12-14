import { RouteComponentProps } from "@reach/router";
import { FunctionComponent } from "react";
import { PermissionsInterface, User, UserType } from "./types";

export const isIssuer: (
  permissionsMap: PermissionsInterface
) => boolean = permissionsMap => {
  return Boolean(
    permissionsMap.ROLE_SERVICE_MANAGER && !permissionsMap.ROLE_CAN_ADD_ISSUER
  );
};

interface RouteGuardProps {
  currentUser: User | null;
  component: FunctionComponent<RouteComponentProps>;
  allowedUserTypes: UserType[];
  path: string;
}

export const RouteGuard: FunctionComponent<RouteGuardProps> = ({
  component: RouteComponent,
  path
}) => {
  return <RouteComponent path={path} />;
};

// const permissions = [
//   {
//     "authority": "ROLE_CAN_ADD_ISSUER"
//   },
//   {
//     "authority": "ROLE_CAN_SEE_ALL_ISSUERS"
//   },

//   {
//     "authority": "ROLE_SERVICE_MANAGER"
//   },
//   {
//     "authority": "ROLE_CAN_SEE_ISSUER_PAGE"
//   }
// ]
