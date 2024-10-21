import { CopyObjectCommand, ListObjectsV2Command, S3Client, type CopyObjectCommandInput, type ListObjectsV2CommandInput } from '@aws-sdk/client-s3';


const s3Client = new S3Client({
    region: 'eu-central-1', // e.g., 'us-west-2'
});

export const copyS3Folder = async (frameWork: string, userId: string, projectId:string) => {
    const bucket = process.env.S3_BUCKET

    const sourcePrefix = `base/${frameWork}`
    const destinationPrefix = `users/${userId}/${projectId}`

    try {
        const listParams: ListObjectsV2CommandInput = {
            Bucket: bucket,
            Prefix: sourcePrefix,
        };
        const listCommand = new ListObjectsV2Command(listParams);
        const listedObjects = await s3Client.send(listCommand);

        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            return {
                message: "No objects found in the source folder.",
                status: 404
            }
        }

        await Promise.all(listedObjects.Contents.map(async (object) => {
            if (!object.Key) return
            const destinationKey = object.Key.replace(sourcePrefix, destinationPrefix)
            const copyParams: CopyObjectCommandInput = {
                Bucket: bucket,
                CopySource: `${bucket}/${object.Key}`,
                Key: destinationKey
            }
            const copyCommand = new CopyObjectCommand(copyParams);
            await s3Client.send(copyCommand)
        }))

        return {
            message: "Copy operations completed.",
            status: 200
        }
    } catch (error) {
        console.error('Error transferring folder:', error);
        return {
            message:'Failed to transfer folder',
            status:500
        }
    }
}