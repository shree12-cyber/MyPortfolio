import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import data from "../data/heroData.json";

export default function Footer() {
    const navItems = [

        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
    ];

    return (
        <Bounded  className="text-slate-600">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-pink-400"
                    >
                        <Image
                            src="/S-logo.png"
                            alt="Logo"
                            width={64}
                            height={64}
                            className="h-7 w-auto ml-1"
                        />
                    </Link>
                    <span
                        className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
                        aria-hidden={true}
                    >
                        /
                    </span>
                    <p className="text-sm text-slate-300">
                        © 2025 {data.first_name} {data.last_name}
                    </p>
                </div>

                <nav className="navigation" aria-label="Footer Navigation">
                    <ul className="flex items-center gap-1">
                        {navItems.map(({ href, label }, index) => (
                            <React.Fragment key={label}>
                                <li>
                                    <Link
                                        href={href}
                                        className={clsx(
                                            "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:text-pink-400"
                                        )}
                                    >
                                        {label}
                                    </Link>
                                </li>
                                {index < navItems.length - 1 && (
                                    <span
                                        className="text-4xl font-thin leading-[0] text-slate-400"
                                        aria-hidden="true"
                                    >
                                        /
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>

                <div className="socials inline-flex justify-center sm:justify-end">
                    {data.socials.github && (
                        <a
                            href={data.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-pink-400"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                    )}
                    {data.socials.linkedin && (
                        <a
                            href={data.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-pink-400"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                    )}
                </div>
            </div>
        </Bounded>
    );
}
