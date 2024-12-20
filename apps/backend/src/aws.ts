import {
    CopyObjectCommand,
    ListObjectsV2Command,
    S3Client,
    type CopyObjectCommandInput,
    type ListObjectsV2CommandInput,
    GetObjectOutput,
    GetObjectCommandInput,
    GetObjectCommand, DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { Upload, } from "@aws-sdk/lib-storage";
import fs from "fs";
import path from "path";


const s3Client = new S3Client({
    region: 'eu-central-1',
});


export const addNewToS3 = async ({ path, type }: { path: string; type: "file" | "dir" }) => {
    const key = type === "dir" ? `${path}/` : path
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.S3_BUCKET,
                Key: key,
                Body: "",
            }
        })
        await upload.done()
    } catch (err) {
        console.error(err)
    }
}

export const deleteFromS3 = async ({ path, type }: { path: string; type: "file" | "dir" }) => {
    const key = type === "dir" ? `${path}/` : path
    try {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key,
        }
        const deleteCommand = new DeleteObjectCommand(params)
        await s3Client.send(deleteCommand)
    } catch (error) {
        console.error(error)
    }
}

export const updateFileInS3 = async ({ path, content }: { path: string, content: string }) => {
    const key = path
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.S3_BUCKET,
                Key: key,
                Body: content,
            }
        })
        await upload.done()
    } catch (err) {
        console.error(err)
    }
}

export const copyS3Folder = async (frameWork: string, userId: string, replId: string, continuationToken?: string) => {
    const bucket = process.env.S3_BUCKET
    const sourcePrefix = `base/${frameWork}`
    const destinationPrefix = `user/${userId}/${replId}`

    try {
        const listParams: ListObjectsV2CommandInput = {
            Bucket: bucket,
            Prefix: sourcePrefix,
            ContinuationToken: continuationToken
        };
        const listCommand = new ListObjectsV2Command(listParams);
        const listedObjects = await s3Client.send(listCommand);

        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            return {
                message: "No objects found in the source folder.",
                status: 404
            }
        }

        await Promise.all(listedObjects.Contents.map(async (file) => {
            if (!file.Key) return
            const destinationKey = file.Key.replace(sourcePrefix, destinationPrefix)
            const copyParams: CopyObjectCommandInput = {
                Bucket: bucket,
                CopySource: `${bucket}/${file.Key}`,
                Key: destinationKey
            }
            const copyCommand = new CopyObjectCommand(copyParams);
            await s3Client.send(copyCommand)
        }))

        if (listedObjects.IsTruncated) {
            listParams.ContinuationToken = listedObjects.NextContinuationToken;
            await copyS3Folder(frameWork, userId, replId, continuationToken)
        }

        return {
            message: "Copy operations completed.",
            status: 200
        }
    } catch (error) {
        console.error('Error transferring folder:', error);
        return {
            message: 'Failed to transfer folder',
            status: 500
        }
    }
}

export const fetchS3Folder = async (key: string, localPath: string) => {
    const bucket = process.env.S3_BUCKET

    try {
        const listParams: ListObjectsV2CommandInput = {
            Bucket: bucket,
            Prefix: key,
        };

        const listCommand = new ListObjectsV2Command(listParams);
        const listedObjects = await s3Client.send(listCommand);

        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            return {
                message: "No objects found in the source folder.",
                status: 404
            }
        }

        await Promise.all(listedObjects.Contents.map(async (file) => {
            if (!file.Key) return
            const filePath = `${localPath}/${file.Key.replace(key, "")}`;

            if (file.Key.endsWith('/')) { //It means it is a folder.
                await createFolder(filePath);
                return;
            } else {  //Not a folder, a file.
                const getObjectParams: GetObjectCommandInput = {
                    Bucket: bucket,
                    Key: file.Key
                }
                const getObjectsCommand = new GetObjectCommand(getObjectParams);
                const data: GetObjectOutput = await s3Client.send(getObjectsCommand)
                if (!data) return

                const streamToBuffer = async (stream: any): Promise<Buffer> => {
                    const chunks: Buffer[] = [];
                    return new Promise((resolve, reject) => {
                        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
                        stream.on('error', reject);
                        stream.on('end', () => resolve(Buffer.concat(chunks)));
                    });
                };

                const fileData = await streamToBuffer(data.Body);

                await writeFile(filePath, fileData);
            }
        }))

        return {
            message: "Download completed successfully",
            status: 200
        };

    } catch (error) {
        console.error(error);
        return {
            message: 'Failed to fetch folder',
            status: 500,
        }
    }
}

function writeFile(filePath: string, fileData: Buffer): Promise<void> {
    return new Promise(async (resolve, reject) => {
        await createFolder(path.dirname(filePath));

        fs.writeFile(filePath, fileData, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    });
}

export function readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}

function createFolder(dirName: string) {
    return new Promise<void>((resolve, reject) => {
        fs.mkdir(dirName, { recursive: true }, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        });
    })
}