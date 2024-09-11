import dbConnect from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        await dbConnect();
        const { _id, title, description } = await req.json();

        const response = await Blog.findByIdAndUpdate(
            { _id },
            {
                $set: { title: title, description: description }
            },
            {new:true}
        );

        if (response) {
            return NextResponse.json({
                success: true,
                message: "Blog Update Successfully"
            });
        }
    }
    catch (e) {
        console.log("error while Update blog::", e);
        return NextResponse.json({
            success: false,
            message: "error while Update blog",
            error: e
        });
    }
}