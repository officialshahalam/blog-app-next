import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5 bg-gradient-to-tr from-violet-700 via-violet-500 to-violet-400">
      <h1 className="text-3xl font-bold text-white">Explore Our Blog Collection</h1>
      <Button size="lg" className="text-lg">
        <Link href="/blogs">Explore</Link>
      </Button>
    </div>
  );
}
