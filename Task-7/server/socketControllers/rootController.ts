import { Socket } from "socket.io";
import {
  OnConnect,
  ConnectedSocket,
  SocketController,
} from "socket-controllers";

@SocketController()
export class RootController {
  @OnConnect()
  public onConnection(@ConnectedSocket() socket: Socket) {
    console.log(`client is connected with id ${socket.id}`);
  }
}
