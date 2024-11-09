import { Server, Socket } from "socket.io";
import { type Server as HttpServer } from "http";
import { spawn } from "node-pty";
import { fetchS3Folder } from "./aws";
import path from "path";
import { fetchDir, fetchFileContent, updateFileContent } from "./fs";
import { watchDirectory } from "./watcher";
import { newPtyProcess, skipInitOutputs, writeInitCommands } from "./terminal";
import fs, { FSWatcher } from "fs";

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


        const userId = socket.handshake.query.userId
        const projectId = socket.handshake.query.projectId as string

        const workspaceLocation = path.join(__dirname, `../workspace/${projectId.split("-")[1]}`)
        const res = await fetchS3Folder(`user/${userId}/${projectId}`, workspaceLocation);
        if (res.status === 200) {
            const rootContent = await fetchDir(workspaceLocation, "")
            socket.emit("files-loaded", ({ rootContent, loaded: true }))
            //Start watcher only after the files are loaded in the file system, else the files while loading will be watcher and watcher events will trigger and put newly fetched files back into s3, which were just fetched.
            const watcher = watchDirectory(path.join(__dirname, "..", "workspace"), socket);
            initEventHandlers(socket, workspaceLocation, watcher, userId as string, projectId)
        }
    });
}

const initEventHandlers = (socket: Socket, workspaceLocation: string, watcher: FSWatcher | undefined, userId: string, projectId: string) => {
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

    socket.on("getFileContent", async (path: string, callBack) => {
        const filePath = workspaceLocation + path
        const content = await fetchFileContent(filePath)
        callBack(content)
    })

    socket.on("updateFileContent", ({ path, value }: { path: string; value: string }) => {
        const filePath = workspaceLocation + path
        updateFileContent(filePath, value)
    })

    socket.on("disconnect", async () => {
        terminals.forEach((terminal) => {
            terminal.ptyProcess.kill();
            console.log(`${terminal.id} closed.`)
        })
        terminals = []
        console.log("A client disconnected from", socket.id);

        await closeWatcher(watcher!) //Watcher will not listen now, therefore the workspace won't be deleted from s3 when rmSync runs.
        fs.rmSync(workspaceLocation, { recursive: true, force: true });
        console.log("User's workspace removed from the system.")
    });
}


export interface entity {
    type: "dir" | "file";
    name: string;
    path: string;
    children?: entity[];
}

const closeWatcher = async (watcher: FSWatcher) => {
    await new Promise<void>((resolve) => {
        watcher.close()
        console.log("Watcher stopped.")
        resolve()
    })
}