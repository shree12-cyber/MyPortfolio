'use client';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, {useEffect, useRef} from "react";
import { MdFavorite } from "react-icons/md";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import data from "../../data/aboutData.json"

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps) => {

  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          //markers: true,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
          ".tech-row",
          {
            x: (index) => {
              return index % 2 === 0
                  ? gsap.utils.random(600, 400)
                  : gsap.utils.random(-600, -400);
            },
          },

          {
            x: (index) => {
              return index % 2 === 0
                  ? gsap.utils.random(-600, -400)
                  : gsap.utils.random(600, 400);
            },
            ease: "power1.inOut"
          }
      )
    }, component)
    return () => ctx.revert() // cleanup!!
  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="section">
        <Heading size="lg" className="mb-8" as="h2">
         {/* TECH STACK HEAD */}
          {data.TechList.heading}   

        </Heading>
        <p className="text-stone-400 -mt-7">
          {slice.primary.description}
        </p>
      </Bounded>
      {data.TechList.techStack.map(({ tech_color, tech_name }, index) => (
  <div
    key={index}
    className="tech-row mb-8 flex items-center justify-center gap-4 text-stone-700"
    aria-label={tech_name}
  >
    {Array.from({ length: 15 }, (_, index) => (
      <React.Fragment key={index}>
        <span
          className="tech-item text-7xl font-extrabold uppercase tracking-tighter"
          style={{
            color: index === 7 ? tech_color : "inherit",
          }}
        >
          {tech_name}
        </span>
        <span className="text-2xl">
          <MdFavorite />
        </span>
      </React.Fragment>
    ))}
  </div>
))}
    </section>
  );
};

export default TechList;



