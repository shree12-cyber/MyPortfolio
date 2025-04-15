import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";
import data from '../../../data/projectsData.json'

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const page = data.find((item) => item.uid === uid);
  if (!page) {
    notFound();
  }
  console.log(page);
  

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const page = data.find((item) => item.uid === uid);
  if (!page) {
    notFound();
  }

  return {
    title: page.data.title || "Portfolio",
    description: Array.isArray(page.data.about) ? page.data.about.join(", ") : page.data.about,
    icons:{
      icon:"/logo.png"
    }
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid || "PortFolio" };
  });
}
