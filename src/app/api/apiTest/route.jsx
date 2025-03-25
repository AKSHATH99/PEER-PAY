import dbConnect from "@/app/lib/dbConnect";

export async function GET(req, res) {
    await dbConnect();
    return Response.json({ message: "Server is running" });
}

