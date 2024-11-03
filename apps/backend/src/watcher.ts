import chokidar from 'chokidar';
import { Socket } from 'socket.io';
import { addNewToS3, deleteFromS3 } from './aws';

const modifyPathForClient = (path: string) => {
    const pathArray = path.split("workspace")
    const modifiedPath = pathArray[1]
    return modifiedPath
}

const modifyPathForS3 = (path: string, projectId: string, userId: string) => {
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
        ignoreInitial: true
    });

    const events = ['add', 'addDir', 'unlink', 'unlinkDir']

    events.map((event) => {
        watcher.on(event, async (path) => {
            const modifiedPath = modifyPathForClient(path)
            socket.emit("watcherEvent", { path: modifiedPath, event })

            const pathForS3 = modifyPathForS3(path, projectId, userId)
            if (event === "add") {
                await addNewToS3(pathForS3)
            }
            else if (event === "unlink") {
                await deleteFromS3(pathForS3)
            }
        })

    })

    watcher.on('error', error => {
        console.error('Error occurred', error);
    });

    return watcher; // Return watcher instance so it can be closed if needed
}

// watcher.close();