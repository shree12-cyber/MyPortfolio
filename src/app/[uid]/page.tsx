import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID("page", uid).catch(() => notFound());

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();
    const page = await client.getByUID("page", uid).catch(() => notFound());

    return {
        //About title
        title: "Portfolio",
        description: page.data.meta_description,
        icons:{
            icon:"/logo.png"
          }
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("page");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}
