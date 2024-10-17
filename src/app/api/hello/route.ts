
export async function GET() {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    })
    return Response.json("Hello From '/' ")
}