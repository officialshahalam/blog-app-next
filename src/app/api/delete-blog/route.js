import dbConnect from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function DELETE(req){
    
    try{
        await dbConnect();
        const {_id}=await req.json();
        console.log("Id in backend",_id);

        const response=await Blog.findByIdAndDelete(_id);

        if(response){
            return NextResponse.json({
                success:true,
                message:"Blog Deleted Successfully"
            });
        }

    }
    catch(e){
        console.log("error while deleting blog::",e);
        return NextResponse.json({
            success:false,
            message:"error while deleting blog",
            error:e
        });
    }
}