'use client'
import { Button } from "@/components/ui/button"
import AllBlogs from "@/components/allblogs/page";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"


const BlogOverview = ({ allBlogs }) => {

    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);
    const [blogFormData, setBlogFormData] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(false);
    const [editBlogId,setEditBlogId]=useState("");

    function changeHandler(event) {
        const { name, value, type, checked } = event.target;
        setBlogFormData((prev) => {
            return {
                ...prev,
                [name]: type === "checked" ? checked : value
            }
        });
    }

    async function saveChangesHandler() {
        try {
            setLoading(true);
            const res= editBlogId 
                        ?
                        await fetch("/api/update-blog/", {
                        method: "PUT",
                        body: JSON.stringify({...blogFormData,_id:editBlogId})
                        })
                        :
                        await fetch("/api/post-blog/", {
                            method: "POST",
                            body: JSON.stringify(blogFormData)
                        })
            
            const result = await res.json();
            if (result?.success) {
                setLoading(false);
                setBlogFormData({ title: "", description: "" });
                setOpenDialog(false);
                router.refresh();
            }
        }
        catch (e) {
            console.log(("error while create post:::", e));
            setLoading(false);
            setBlogFormData({ title: "", description: "" });
            router.refresh();
        }
    }

    return (
        <div className="w-10/12 mx-auto pt-10 space-y-6">
            <Dialog open={openDialog} onOpenChange={() => {
                setOpenDialog(!openDialog)
                setBlogFormData({ title: "", description: "" });
                }}>
                <DialogTrigger asChild>
                    <Button variant="costom">Add Blog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Blog Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                name="title"
                                value={blogFormData.title}
                                id="title"
                                className="col-span-3"
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                value={blogFormData.description}
                                className="col-span-3"
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={saveChangesHandler}>
                            {loading ? "saving changes" : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AllBlogs
                allBlogs={allBlogs}
                setOpenDialog={setOpenDialog}
                blogFormData={blogFormData}
                setBlogFormData={setBlogFormData}
                saveChangesHandler={saveChangesHandler}
                setEditBlogId={setEditBlogId}
            />
        </div>
    );
}

export default BlogOverview;