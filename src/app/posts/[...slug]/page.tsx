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

    return posts.map((post) => ({
        slug: post.slug.split('/'),
    }));
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