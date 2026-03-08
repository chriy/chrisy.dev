import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const PostMetadataSchema = z.object({
    title: z.string({ error: 'Artical title can not be null' }),
    date: z.string({ error: 'Artical date can not be null' }),
    summary: z.string().optional(),
    pinned: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    address: z.string().optional()
}).loose()


export type PostMetadata = z.infer<typeof PostMetadataSchema>;

// Post type
export type Post = {
    slug: string; // URL path
    metadata: PostMetadata; // Post metadata
};

export type Slug = {
    slug: string, type: 'directory' | 'file', absolutePath: string
}

export class PostsContext {
    // mdx path
    private static readonly rootDirectory = path.join(process.cwd(), 'src/content');
    private static readonly suffix = ".mdx"

    /**
     * Recursively retrieve all post paths
     * @param dir Directory path
     * @param router Multi-level routing path array
     * @private
     */
    private static fetchMDXFiles(dir: string, router: string[] = []): Slug[] {
        // Recursively collect all file paths
        const files: Slug[] = []

        if (!fs.existsSync(dir)) return files

        const entries = fs.readdirSync(dir, { withFileTypes: true })

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const subpath = path.join(dir, entry.name)
                const subfiles = this.fetchMDXFiles(subpath, [...router, entry.name])
                files.push(...subfiles)
            } else if (entry.isFile() && entry.name.endsWith(this.suffix)) {
                const slug = entry.name.startsWith('index.') && router.length > 0 // Do not process index.mdx in the root directory
                    ? router.length ? router.join("/") : 'index'
                    : [...router, entry.name.replace(/\.mdx$/, '')].join("/")
                files.push({
                    slug: slug,
                    type: entry.name.startsWith('index.') ? 'directory' : 'file',
                    absolutePath: path.join(dir, entry.name)
                })
            }
        }
        return files
    }

    static async all({ limit = 0 }: { limit?: number } = {}): Promise<Post[]> {
        const posts = this.fetchMDXFiles(this.rootDirectory, [])
        const metadata = await Promise.all(posts.map(async post => {
            const slug = post.type === 'file' ? post.slug : `${post.slug}/index`
            const mod = await import(`@/content/${slug}.mdx`);
            return { slug: post.slug, metadata: PostMetadataSchema.parse(mod.metadata) } satisfies Post;
        }))
        // Sort in descending order by date
        metadata.sort((a: Post, b: Post) => {
            return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
        })
        return limit > 0 ? metadata.slice(0, limit) : metadata
    }

    /**
     * Get single post content
     * @param slug Array representing the post's routing path
     */
    static async fetchPostBySlug(slug: Array<string>) {
        const fullSlug = slug.join('/')
        try {
            // Dynamic import
            const filepath = [`posts/${fullSlug}/index.mdx`, `posts/${fullSlug}.mdx`].find(dir => fs.existsSync(path.join(this.rootDirectory, dir)))

            if (!filepath) return null

            const mod = await import(`@/content/${filepath}`);
            return {
                metadata: PostMetadataSchema.parse(mod.metadata),
                default: mod.default,
            };
        } catch (error) {
            return null
        }
    }

}
