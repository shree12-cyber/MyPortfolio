'use client';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdFavorite } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import data from "../../data/aboutData.json";

gsap.registerPlugin(ScrollTrigger);

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps) => {
  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
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
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="section">
        <Heading size="lg" className="mb-8" as="h2">
          {data.TechList.heading}
        </Heading>
        <p className="text-stone-400 -mt-7">{slice.primary.description}</p>
      </Bounded>

      {data.TechList.techStack.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          aria-label={tech_name}
        >
          <div className="flex items-center gap-4 px-4 w-max">
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <span
                  className="tech-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter whitespace-nowrap snap-start shrink-0"
                  style={{
                    color: i === 7 ? tech_color : "inherit",
                  }}
                >
                  {tech_name}
                </span>
                <span className="text-xl sm:text-2xl shrink-0">
                  <MdFavorite />
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TechList;
