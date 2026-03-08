import { PostsContext } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { ArticleLayout } from "@/components/mdx/article";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

/**
 * 1. generateStaticParams (SSG)
 */
export async function generateStaticParams() {
    const posts = await PostsContext.all();

    // The PostsContext returns slugs including the 'posts/' directory.
    // Since this catch-all route is already inside /src/app/posts/, 
    // we must strip the 'posts' segment from the params to match correctly.
    return posts.map((post) => {
        const segments = post.slug.split('/');
        return {
            slug: segments[0] === 'posts' ? segments.slice(1) : segments,
        };
    });
}

/**
 * 2. generateMetadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await PostsContext.fetchPostBySlug(slug);

    if (!post) {
        return {
            title: '404 - Post Not Found',
            description: 'The requested blog post could not be located.'
        };
    }

    return {
        title: post.metadata.title,
        description: post.metadata.summary,
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.summary,
            type: 'article',
            publishedTime: post.metadata.date,
        },
    } as Metadata;
}

/**
 * 3. BlogPostPage Component
 */
export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await PostsContext.fetchPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const Content = post.default;

    return (
        <ArticleLayout meta={post.metadata}>
            <Content />
        </ArticleLayout>
    );
}