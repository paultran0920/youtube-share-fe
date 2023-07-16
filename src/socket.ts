import { io } from "socket.io-client";
import { logInfo } from "./logs/logger";

logInfo(`Socket server: ${process.env.REACT_APP_WS_URL ?? ""}`);
export const appSocket = io(process.env.REACT_APP_WS_URL ?? "", {
  autoConnect: false,
});
