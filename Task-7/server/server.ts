import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import "reflect-metadata";
import cookieSession from "cookie-session"

import authRouter from "./routes/auth";
import SocketServer from "./socket";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieSession({secret:"secret",secureProxy:true,domain:"https://venerable-cendol-ceb673.netlify.app"}))



dotenv.config();
app.use(cors({origin:"https://venerable-cendol-ceb673.netlify.app",credentials:true}));
app.use(express.json()) ;
const port = 8000; 

const server = http.createServer(app);

app.use("/api/auth", authRouter) ; 

server.listen(process.env.PORT||port);

const io = SocketServer(server) ;

server.on("listening", () => {
  console.log(`Server running at port ${port}`);
});
