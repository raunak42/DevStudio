import express from "express"
import cors from "cors"

const port = 3001

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello world")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})