import { createContext } from "react";
import { User } from "../utils/helpers/types";

const UserContext = createContext<User | null>(null);

export default UserContext;
