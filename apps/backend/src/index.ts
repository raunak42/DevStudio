import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { httpHandler } from "./httpHandler";
import { socketHandler } from "./ws";

dotenv.config();

const port = 3001
const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app)

httpHandler(app)
socketHandler(httpServer)

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`)
})