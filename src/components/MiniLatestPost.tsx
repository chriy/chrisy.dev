'use client'

import Link from "next/link";
import PostCover1 from '@/images/post_cover-1.png'
import PostCover2 from '@/images/post_cover-5.png'
import PostCover3 from '@/images/post_cover-3.png'
import PostCover4 from '@/images/post_cover-4.png'
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface CardProps {
    key: number;
    cover: StaticImageData;
    tag: Array<string>
    content: string;
}

const MiniPostCard = (props: CardProps) => {
    const date = new Date();
    const datetime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const a = (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link href="/">
                <div className="bg-white dark:bg-neutral-800/40 h-fit rounded-2xl shadow-xs">
                    <Image src={props.cover.src} alt="Post" width={1} height={1} className="rounded-t-2xl w-full"/>
                    <div className="w-full px-2 py-4 min-h-40 flex flex-col justify-between">
                        <div className="flex items-center justify-start gap-2">
                            {props.tag.map((tag, index) => (
                                <span key={index} className="inline-block px-2 py-1 text-xs h-fit w-fit rounded-md bg-[#dee9fc] text-[#263fa8]">{tag}</span>
                            ))}
                        </div>

                        <div className="w-full wrap-normal text-clip px-2 py-4 font-medium">
                            <h2 className="text-[#121212] dark:text-accent-dark">{props.content}</h2>
                        </div>

                        <div className="w-full px-2 my-2 h-2 flex items-center justify-between">
                            <div className="text-xs text-gray-400">
                                <span>{datetime}</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" fill={"#f5f5f5"}>
                                    <g id="Menu / More_Horizontal">
                                        <g id="Vector">
                                            <path d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z" stroke={"#dee9fc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke={"#dee9fc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z" stroke={"#dee9fc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                    </g>
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )

    const b = (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={"grid grid-cols-1 md:grid-cols-2 bg-white w-full rounded-md shadow-md h-fit"}>
                <Image src={props.cover.src} alt="Post" width={1} height={1} objectFit={"cover"} className="rounded w-full"/>

            </div>

        </motion.div>
    )
    return a
}

export default function MiniLatestPost() {

    const posts = [
        {
            cover: PostCover1,
            content: "Try Dev Container",
            tag: ["Tech"],
        },
        {
            cover: PostCover2,
            content: "Nginx负载均衡的一致性Hash路由方案",
            tag: ["Nginx"]
        },
        {
            cover: PostCover3,
            content: "MNIST Handwritten Digit Recognition in PyTorch",
            tag: ["Torch", "Python"],
        },
        {
            cover: PostCover4,
            content: "What is the different of React useState and useEffect Hooks",
            tag: ["React"]
        }
    ];

    return (<article>
            <div className="p-2 mx-auto">
                <div className="py-4">
                    <h2 className="text-4xl font-bold text-shadow-gray-700 dark:text-primary-text-dark">
                        <span>🧑‍🌾 Latest&nbsp;  </span>
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#64b5f6] to-[#81c784]">Posts</span>
                    </h2>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 pt-2">
                        Random thoughts on tech and life’s journeys
                    </p>

                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-3 md:px-4 py-4 bg-[#f9fafb] rounded-2xl dark:bg-transparent">
                    {[...posts].map((props, index) => (
                        <MiniPostCard key={index} content={props.content} cover={props.cover} tag={props.tag}/>))}
                </div>

                <div className="bg-amber-500 dark:bg-amber-600 w-fit px-4 py-1 mt-8 rounded-full font-normal text-white">
                    <Link className="text-xs" href="/posts">
                        View more
                    </Link>
                </div>
            </div>
        </article>
    )
}