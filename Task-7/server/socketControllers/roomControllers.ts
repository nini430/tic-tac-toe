import { Socket, Server } from "socket.io";
import {
  OnMessage,
  ConnectedSocket,
  SocketController,
  MessageBody,
  SocketIO,
} from "socket-controllers";

@SocketController()
export class RoomController {
  @OnMessage("join_room")
  public async joinRoom(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server,
    @MessageBody() { roomId, username }: any
  ) {
    console.log(`User with id ${socket.id} is trying to join room ${roomId}`);

    const connectedSockets = io.sockets.adapter.rooms.get(roomId);
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    if (connectedSockets && connectedSockets.size === 2) {
      socket.emit("error", "Room is full of people,please try another one");
    } else {
      await socket.join(roomId);
      socket.emit(
        "join_succesful",
        connectedSockets?.size === 2
          ? { start: true, yourSymbol: "x", msg: "You Joined to this Room!" }
          : { start: false, msg: "You joined to this room" }
      );

      if (connectedSockets && connectedSockets.size === 2) {
        socket
          .to(roomId)
          .emit("start_game", { start: false, yourSymbol: "o", username });
      }
    }
  }
}
