import dbConnect from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
const Joi = require('joi');

const blogDataValidater = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});


export async function POST(req) {

    try {
        dbConnect();
        const { title, description } = await req.json();

        const { error } = await blogDataValidater.validate({ title, description });
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message,
            })
        }


        const blogResponce = await Blog.create({ title, description });
        if (blogResponce) {
            return NextResponse.json({
                success: true,
                data: blogResponce,
                message: "Blog is created successfully"
            })
        }
    }
    catch (e) {
        console.log("Error while create blog::", e);
        NextResponse.json({
            success: false,
            message: "Error while create blog",
            error: error
        })
    }
}