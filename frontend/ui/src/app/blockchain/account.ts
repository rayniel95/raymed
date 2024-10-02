import { config } from "./config";
import { getAccount } from "wagmi/actions";

export const account = getAccount(config)