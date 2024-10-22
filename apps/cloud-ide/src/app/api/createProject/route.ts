import { copyS3Folder } from "@/app/operations/aws";
import { NextRequest } from "next/server";

export interface createProjectProps {
    userId: string;
    framework: string;
    title: string;
    projectId: string
}

export const POST = async (req: NextRequest) => {
    const body: createProjectProps = await req.json();
    const { message, status } = await copyS3Folder(body.framework, body.userId, body.projectId)
    console.log({ message, status })
    return Response.json({ userId: body.userId, projectId: body.projectId })
}