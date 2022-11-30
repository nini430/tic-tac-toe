import { Server } from "socket.io";
import { useSocketServer } from "socket-controllers";
import { RootController } from "./socketControllers/rootController";
import { RoomController } from "./socketControllers/roomControllers";
import { GameController } from "./socketControllers/gameController";

export default (httpServer) =>  {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  } );

  useSocketServer(io, {
    controllers: [RootController, RoomController, GameController],
  });

  return io;
};
