import chokidar from 'chokidar';
import { Socket } from 'socket.io';

const modifyPath = (path: string) => {
    const pathArray = path.split("workspace")
    const modifiedPath = pathArray[1]
    return modifiedPath
}

export function watchDirectory(directoryPath: string, socket: Socket | null) {
    if (!socket) return
    const watcher = chokidar.watch(directoryPath, {
        persistent: true,
        ignoreInitial: true
    });

    const events = ['add', 'addDir', 'unlink', 'unlinkDir']

    events.map((event) => {
        watcher.on(event, (path) => {
            const modifiedPath = modifyPath(path)
            socket.emit("watcherEvent", { path: modifiedPath, event })
        })
    })

    watcher.on('error', error => {
        console.error('Error occurred', error);
    });

    return watcher; // Return watcher instance so it can be closed if needed
}

// watcher.close();