import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { httpHandler } from "./httpHandler";

dotenv.config();
const port = 3001

const app = express();
app.use(express.json());
app.use(cors());

httpHandler(app)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})