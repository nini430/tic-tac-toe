import {
  ConnectedSocket,
  SocketController,
  MessageBody,
  OnMessage,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";

let connected: number = 1;
@SocketController()
export class GameController {
  @OnMessage("update_game")
  public updateGame(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server,
    @MessageBody() { board, roomId }: any
  ) {
    socket.to(roomId).emit("on_game_update", { board });
  }
  @OnMessage("finish_game")
  public finishGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, message }: any
  ) {
    socket.to(roomId).emit("on_game_finish", message);
  }

  @OnMessage("try_again")
  public requestNewGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { name, roomId }: any
  ) {
    socket.emit("try_success", { wait: connected !== 2 });
    socket
      .to(roomId)
      .emit("on_continue", {
        msg: `${name} wants to continue`,
        start: connected === 2 ? true : false,
      });
    if (connected !== 2) {
      connected++;
    } else {
      connected--;
    }
  }

  @OnMessage("reject")
  public rejectNewGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { name, roomId }: any
  ) {
    socket
      .to(roomId)
      .emit("on_reject", { msg: `${name} doesn't wants to continue` });
  }
}
