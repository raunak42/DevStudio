import { Server, Socket } from "socket.io";
import { type Server as HttpServer } from "http";
import { spawn } from "node-pty";
import { fetchS3Folder } from "./aws";
import path from "path";
import { fetchDir } from "./fs";
import { watchDirectory } from "./watcher";
import { newPtyProcess, skipInitOutputs, writeInitCommands } from "./terminal";

export interface Terminal {
    ptyProcess: ReturnType<typeof spawn>;
    id: string
}

export const socketHandler = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });


    io.on("connection", async (socket: Socket) => {
        console.log("A client connected to", socket.id);
        watchDirectory(path.join(__dirname, "..", "workspace"), socket);

        const userId = socket.handshake.query.userId
        const projectId = socket.handshake.query.projectId as string

        const workspaceLocation = path.join(__dirname, `../workspace/${projectId.split("-")[1]}`)
        initEventHandlers(socket, workspaceLocation)
        const res = await fetchS3Folder(`user/${userId}/${projectId}`, workspaceLocation);
        if (res.status === 200) {
            const rootContent = await fetchDir(workspaceLocation, "")
            socket.emit("files-loaded", ({ rootContent, loaded: true }))
        }
    });
}

const initEventHandlers = (socket: Socket, workspaceLocation: string) => {
    let terminals: Terminal[] = [];

    socket.on("requestPty", async (terminalId: string) => {
        console.log("Terminal requested.");

        const workspaceName = path.basename(workspaceLocation);

        const ptyProcess = newPtyProcess(workspaceLocation)

        await writeInitCommands(ptyProcess, workspaceName)

        const newTerminal: Terminal = {
            id: terminalId,
            ptyProcess: ptyProcess
        };
        terminals.push(newTerminal);
        
        skipInitOutputs(newTerminal, socket)

        console.log(`Terminal-${terminalId} opened.`);
    });

    socket.on("keyEvent", ({ terminalId, input }: { terminalId: string; input: string }) => {
        const terminal = terminals.find((t) => t.id === terminalId);
        if (!terminal) return;
        terminal.ptyProcess.write(input)
    });

    socket.on("getDirContents", async (dirPath: string, callBack) => {
        const content = await fetchDir(`${workspaceLocation}/${dirPath}`, "")
        callBack(content)
    })

    socket.on("closeTerminal", (terminalId: string) => {
        const terminal = terminals.find((t) => t.id === terminalId);
        if (!terminal) return;
        terminal.ptyProcess.kill();

        console.log(`Terminal-${terminal.id} closed.`)
    })

    socket.on("disconnect", () => {
        terminals.forEach((terminal) => {
            terminal.ptyProcess.kill();
            console.log(`${terminal.id} closed.`)
        })
        terminals = []
        console.log("A client disconnected from", socket.id);


        ///////////////////////////////////////////////
        //Add logic to clean up app the files when the user disconnects.
    });
}