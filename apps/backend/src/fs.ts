import fs from "fs";

interface Entry { //File system entry is the common name for files and directories.
    type: string;
    name: string;
    path: string
}

export const fetchDir = async (dir: string, baseDir: string): Promise<Entry[]> => {
    return new Promise((resolve) => {
        fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
            if (err) {
                console.error(err)
            }
            else {
                resolve(entries.map((entry) => {
                    const entryType = entry.isDirectory() ? "dir" : "file"
                    return {
                        type: entryType,
                        name: entry.name,
                        path: `${baseDir}/${entry.name}`
                    }
                }))
            }
        })
    })
}

export const fetchFileContent = async (file: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}