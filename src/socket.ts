import { io } from "socket.io-client";
import { logInfo } from "./logs/logger";

logInfo(`Socket server: ${process.env.REACT_APP_BE_ROOT ?? ""}`);
export const appSocket = io(process.env.REACT_APP_BE_ROOT ?? "", {
  autoConnect: false,
});
