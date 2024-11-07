import { type Express } from "express"
import { copyS3Folder } from "./aws";

export interface createProjectProps {
    userId: string;
    framework: string;
    title: string;
    projectId: string
}

export const httpHandler = (app: Express) => {
    app.get("/", (req, res) => {
        res.json("Hello world")
    })

    app.post("/createProject", async (req, res) => {
        const body: createProjectProps = req.body;
        const { message, status } = await copyS3Folder(body.framework, body.userId, body.projectId)
        console.log({ message, status })
        if (status === 200) {
            res.json({ userId: body.userId, projectId: body.projectId })
        } else {
            res.json({ message, status })
        }
    })
}