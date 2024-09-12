import BlogOverview from "@/components/blogOverView/page";

async function fetchAllBlogs() {
    const GET_URl=`${process.env.GET_BLOG_BASE_URL}/api/get-blogs`;
    console.log("GET_URL is:::",GET_URl);
    try {

        const apiResponse = await fetch(GET_URl, {
            method: "GET",
            cache:"no-cache"
        });
        const result = await apiResponse.json();
        return result?.data;
    }
    catch (error) {
        console.log("error while fetch all blogs:::", error);
    }
}


const Blogs = async () => {
    const allBlogs = await fetchAllBlogs();
    return (
        <div className="min-h-screen bg-gradient-to-tr from-violet-400 via-violet-600 to-violet-700">
            <BlogOverview allBlogs={allBlogs} />
        </div>
    );
}

export default Blogs;