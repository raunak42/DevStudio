import { Server, Socket } from "socket.io"
import { type Server as HttpServer } from "http";
import { spawn } from "node-pty";
import { fetchS3Folder } from "./aws";
import path from "path"

interface Terminal {
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
        const userId = socket.handshake.query.userId
        const projectId = socket.handshake.query.projectId as string

        const workspaceLocation = path.join(__dirname, `../workspace/${projectId.split("-")[1]}`)
        initEventHandlers(socket, workspaceLocation)
        const res = await fetchS3Folder(`user/${userId}/${projectId}`, workspaceLocation);
        if (res.message === "Download completed successfully") {
            socket.emit("files-loaded", true)
        }
    });

}

const initEventHandlers = (socket: Socket, workspaceLocation: string) => {
    let terminals: Terminal[] = []
    const SHELL = "bash"
    
    socket.on("requestPty", (terminalId: string) => {
        console.log("Terminal requested.")
        const ptyProcess = spawn(SHELL, [], {
            name: "xterm-256color",
            env: {
                ...process.env,
                npm_config_prefix: '',
                SHELL: SHELL
            },
            cwd: workspaceLocation,

        });

        const newTerminal: Terminal = {
            id: terminalId,
            ptyProcess: ptyProcess
        }

        terminals.push(newTerminal);

        newTerminal.ptyProcess.onData((data: string) => { //=== when ptyProcess produces output.
            socket.emit("ptyOutput", { terminalId, data });
        })
        console.log(`Terminal-${terminalId} opened.`)
    });

    socket.on("keyEvent", ({ terminalId, input }: { terminalId: string; input: string }) => {
        const terminal = terminals.find((t) => t.id === terminalId);
        if (!terminal) return;
        terminal.ptyProcess.write(input)
    });

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
    });
}