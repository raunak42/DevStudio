import { CopyObjectCommand, ListObjectsV2Command, S3Client, type CopyObjectCommandInput, type ListObjectsV2CommandInput, GetObjectOutput, GetObjectCommandInput, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from "fs";
import path from "path";


const s3Client = new S3Client({
    region: 'eu-central-1', // e.g., 'us-west-2'
});

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
            const filePath = `${localPath}/${file.Key.replace(key, "")}`;
            await writeFile(filePath, fileData);
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