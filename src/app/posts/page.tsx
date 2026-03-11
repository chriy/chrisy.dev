import { PostsContext } from "@/lib/posts";
import Posts from "./posts";

export default async function PostsPage() {
    const posts = await PostsContext.all();
    return (
        <main className="bg-theme-light dark:bg-theme-dark transition-colors duration-300">
            <Posts posts={ posts }/>
        </main>
    );
}

