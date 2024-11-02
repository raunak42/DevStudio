import { Server, Socket } from "socket.io";
import { type Server as HttpServer } from "http";
import { spawn } from "node-pty";
import { fetchS3Folder } from "./aws";
import path from "path";
import { fetchDir } from "./fs";
import { watchDirectory } from "./watcher";
import { newPtyProcess, skipInitOutputs, writeInitCommands } from "./terminal";
import fs from "fs"

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


    socket.on("closeTerminal", (terminalId: string) => {
        const terminal = terminals.find((t) => t.id === terminalId);
        if (!terminal) return;
        terminal.ptyProcess.kill();

        console.log(`Terminal-${terminal.id} closed.`)
    })

    socket.on("getDirContents", async (dirPath: string, callBack) => {
        const content = await fetchDir(`${workspaceLocation}/${dirPath}`, "")
        callBack(content)
    })

    socket.on("addFile", ({ parentDir, fileName, atRoot }: { parentDir?: entity; fileName: string, atRoot?: boolean }) => {
        if (!atRoot) {
            if (!parentDir) return
            const filePath = workspaceLocation + parentDir.path + `/${fileName}`
            fs.writeFile(filePath, "", (err) => {
                if (err) {
                    console.error(`Error creating file: ${err}`);
                } else {
                    console.log(`File created successfully: ${filePath}`);
                }
            })
        } else if (atRoot) {
            const filePath = workspaceLocation + `/${fileName}`
            fs.writeFile(filePath, "", (err) => {
                if (err) {
                    console.error(`Error creating file: ${err}`);
                } else {
                    console.log(`File created successfully: ${filePath}`);
                }
            })
        }
    })

    socket.on("addFolder", ({ parentDir, folderName, atRoot }: { parentDir?: entity; folderName: string; atRoot?: boolean }) => {
        if (!atRoot) {
            if (!parentDir) return
            const folderPath = workspaceLocation + parentDir.path + `/${folderName}`
            console.log(folderPath)
            fs.mkdir(folderPath, (err) => {
                if (err) {
                    console.error(`Error creating folder: ${err}`);
                } else {
                    console.log(`Folder created successfully: ${folderPath}`);
                }
            })
        } else if (atRoot) {
            const folderPath = workspaceLocation + `/${folderName}`
            fs.mkdir(folderPath, (err) => {
                if (err) {
                    console.error(`Error creating folder: ${err}`);
                } else {
                    console.log(`Folder created successfully: ${folderPath}`);
                }
            })
        }
    })

    socket.on("rename", ({ entity, newName }: { entity: entity; newName: string }) => {

        const oldPath = workspaceLocation + entity.path
        const oldPathArray = oldPath.split("/")
        const newPathArray = [...oldPathArray.slice(0, -1), newName]
        const newPath = newPathArray.join("/")

        fs.renameSync(oldPath, newPath)
    })

    socket.on("delete", ({ entity }: { entity: entity }) => {
        const path = workspaceLocation + entity.path

        if (entity.type === "file") {
            fs.unlink(path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully!');
                }
            });
        } else if (entity.type === "dir") {
            fs.rmSync(path, { recursive: true, force: true });
        }
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


export interface entity {
    type: "dir" | "file";
    name: string;
    path: string;
    children?: entity[];
}