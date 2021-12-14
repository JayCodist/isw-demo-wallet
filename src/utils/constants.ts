import { Option } from "../components/select/Select";
import { UserType } from "./helpers/types";
import { resources } from "./resources";

interface Link {
  icon: string;
  title: string;
  url: string;
  allowedUserTypes: UserType[];
}

const pageSizeStr = localStorage.getItem("ITG_SAVED_PAGE_SIZE");
const pageSize = pageSizeStr ? Number(pageSizeStr) : 10;

export const initialPaginationData = { pageSize, total: 0, pageNumber: 1 };

export const allLinks: Link[] = [
  {
    icon: resources.icons.ISSUER_PROFILE,
    title: "Profile",
    url: "/profile",
    allowedUserTypes: ["ISSUER"]
  },
  {
    icon: resources.icons.INSTITUTIONS,
    title: "Issuers",
    url: "/issuers",
    allowedUserTypes: ["ISW_ADMIN"]
  },
  {
    icon: resources.icons.CONFIGURATION,
    title: "Configuration",
    url: "/configuration",
    allowedUserTypes: ["ISW_ADMIN"]
  }
];

export const defaultCardSchemeOptions = [
  {
    label: "MasterCard",
    value: "MasterCard"
  },
  {
    label: "Visa",
    value: "Visa"
  },
  {
    label: "Verve",
    value: "Verve"
  }
];

export const imageExtensions: any = {
  tiff: true,
  tif: true,
  bmp: true,
  jpg: true,
  jpeg: true,
  gif: true,
  png: true,
  eps: true
};

export const certificateConfigTypesOptions: Option[] = [
  {
    label: "Certificate (.pfx)",
    value: "certificate(.pfx)"
  },
  {
    label: "Certificate (.pem)",
    value: "certificate(.pem)"
  },
  {
    label: "Private Keystore (.ks)",
    value: "privatekeystore(.ks)"
  }
];
