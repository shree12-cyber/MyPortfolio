"use client";

import React, { useEffect, useRef, useState } from "react";
import { asImageSrc, Content, isFilled } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from '../../data/projectsData.json';

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "read more...",
}: ContentListProps) {
  const component = useRef(null);
  const revealRef = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const urlPrefixes = contentType === "Blog" ? "/blog" : "/projects";

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=200px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
      return () => ctx.revert();
    }, component);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      const ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 110),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
            opacity: 1,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert();
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentItem]);

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;

    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  const onMouseEnter = (index: number) => setCurrentItem(index);
  const onMouseLeave = () => setCurrentItem(null);

  return (
    <div className="relative px-4 sm:px-6 md:px-12" ref={component}>
      <ul className="grid border-b border-b-slate-100" onMouseLeave={onMouseLeave}>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {isFilled.keyText(item.data.title) && (
              <li
                className="list-item opacity-0"
                onMouseEnter={() => onMouseEnter(index)}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
              >
                <Link
                  href={urlPrefixes + "/" + item.uid}
                  className="flex flex-col gap-4 border-t border-t-slate-100 py-6 text-slate-200 md:flex-row md:justify-between md:items-center"
                  aria-label={item.data.title}
                >
                  <div className="flex flex-col gap-1 max-w-full">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
                      {item.data.title}
                    </span>
                    <div className="flex flex-wrap gap-2 text-sm sm:text-base font-semibold text-pink-400">
                      {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm sm:text-base md:text-xl font-medium whitespace-nowrap mt-2 md:mt-0">
                    {viewMoreText}
                    <MdArrowOutward />
                  </span>
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>

      {/* Hover Reveal Image */}
      <div
        className="hover-reveal bg-over pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-center bg-cover opacity-0 transition-[background] duration-300 hidden sm:block"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
        }}
        ref={revealRef}
      />
    </div>
  );
}
