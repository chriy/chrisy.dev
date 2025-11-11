import { Fragment } from "react";
import Hero from "@/components/Hero";
import { MiniLatestPost } from "@/components/MiniLatestPost";
import { MiniGallery } from "@/components/MiniGallery";
import { Links } from "@/components/Links";

export default function Page() {
    return (
        <Fragment>
            <Hero/>
            <MiniLatestPost/>
            <MiniGallery/>
            <Links/>
        </Fragment>
    )
}