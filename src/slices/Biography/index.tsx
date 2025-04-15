import { Content } from "@prismicio/client";
import {  SliceComponentProps } from "@prismicio/react";
import { ImageField } from "@prismicio/types";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

import Avatar from "@/slices/Biography/Avatar";
import data from "../../data/aboutData.json";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
// import Resume from '
/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h2" size="lg" className="col-start-1">
          {/* About Heading */}
          {"About"} {data.first_name}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          {data.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <Link
          href={data.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-stone-900 bg-stone-50 px-4 py-2 font-bold text-stone-800 transition-transform ease-out hover:scale-105"
        >
          <span className="absolute inset-0 z-0 h-full translate-y-9 bg-pink-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
          <span className="relative flex items-center justify-center gap-2">
           my resume <MdArrowOutward className="inline-block" />
          </span>
        </Link>
        {/*update new resume*/}
        <Avatar
          image={slice.primary.avatar as ImageField<never>}
          classname="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
