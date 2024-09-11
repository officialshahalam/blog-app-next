import dbConnect from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await dbConnect();
        const response=await Blog.find({});
        
        if(response){
            return NextResponse.json({
                success:true,
                data:response,
                message:"All Blogs are fetched successfully"
            })
        }
    }
    catch(e){
        console.log("error while fetching all blogs::",e);
        return NextResponse.json({
            success:false,
            message:"Error while fetche all blogs",
            error:e
        })
    }
}