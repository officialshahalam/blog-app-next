'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

const AllBlogs =  ({allBlogs,setOpenDialog,setBlogFormData,setEditBlogId}) => {

    const router=useRouter();

    async function deleteBlogHandler(_id){
        try{
            const res=await fetch("/api/delete-blog",{
                method:"DELETE",
                body: JSON.stringify({_id})
            });
            const result=await res.json();
            if(result?.success){
                router.refresh();
            }
        }
        catch(e){
            console.log("error while deleteing Blog:::",e);
        }
    }

    async function updateBlogHandler(blog){
        setOpenDialog(true);
        setBlogFormData(blog);
        setEditBlogId(blog._id);
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                allBlogs && allBlogs.length > 0 ?
                    (
                        allBlogs.map((blog, index) => (
                            <Card key={index} className="w-full">
                                <CardHeader>
                                    <CardTitle>{blog.title}</CardTitle>
                                    <CardDescription>{blog.description}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={()=>{updateBlogHandler(blog)}}>Edit</Button>
                                    <Button onClick={()=>{deleteBlogHandler(blog)}}>Delete</Button>
                                </CardFooter>
                            </Card>
                        ))
                    )
                    :
                    (<div>No blog Found Please Create Blogs</div>)
            }
        </div>
    );
}

export default AllBlogs;