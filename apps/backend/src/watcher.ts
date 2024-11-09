import chokidar from 'chokidar';
import { Socket } from 'socket.io';
import { addNewToS3, deleteFromS3, readFile, updateFileInS3 } from './aws';
import { ignored } from './ignored';

const modifyPathForClient = (path: string) => {
    const pathArray = path.split("workspace")
    const modifiedPath = pathArray[1]
    return modifiedPath
}

export const modifyPathForS3 = (path: string, projectId: string, userId: string) => {
    const workspaceName = projectId.split("-")[1]
    const x = path.split(workspaceName)[1]
    const pathForS3 = `user/${userId}/${projectId}${x}`
    return pathForS3
}

export function watchDirectory(directoryPath: string, socket: Socket | null) {
    if (!socket) return
    const userId = socket.handshake.query.userId as string
    const projectId = socket.handshake.query.projectId as string

    const watcher = chokidar.watch(directoryPath, {
        persistent: true,
        ignoreInitial: true,
        ignored: ignored,
    });

    const events = ['add', 'addDir', 'unlink', 'unlinkDir', 'change']

    events.map((event) => {
        watcher.on(event, async (path) => {
            const modifiedPath = modifyPathForClient(path)
            socket.emit("watcherEvent", { path: modifiedPath, event })

            const pathForS3 = modifyPathForS3(path, projectId, userId)
            if (event === "add") {
                await addNewToS3({ path: pathForS3, type: "file" })
            }
            else if (event === "addDir") {
                await addNewToS3({ path: pathForS3, type: "dir" })
            }
            else if (event === "unlink") {
                await deleteFromS3({ path: pathForS3, type: "file" })
            }
            else if (event === "unlinkDir") {
                await deleteFromS3({ path: pathForS3, type: "dir" })
            }
            else if (event === "change") {
                const content = await readFile(path)
                await updateFileInS3({ path: pathForS3, content: content })
            }
        })

    })
    
    watcher.on('error', error => {
        console.error('Error occurred', error);
    });

    return watcher;
}

