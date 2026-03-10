import Hero from "@/components/ui/hero";
import LatestPosts from "@/components/ui/latest";
import { PostsContext } from "@/lib/posts";
import Contact from "@/components/ui/contact";

export default async function Page() {
    const posts = await PostsContext.all({ limit: 5 })
    return (
        <section>
            <Hero/>
            <LatestPosts posts={ posts }/>
            <Contact/>
        </section>
    )
}