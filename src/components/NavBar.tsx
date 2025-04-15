"use client";

import clsx from "clsx";
import React from "react";
import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Button from "./Button";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="rounded-md border border-white/20 bg-black/25 backdrop-blur-md px-4 py-2"
    >
      <ul className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
        <NameLogo />
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {settings.data.nav_items.map(({ link, label }, index) => (
            <React.Fragment key={label}>
              <li>
                <PrismicNextLink
                  className="group relative block overflow-hidden rounded px-3 py-1 text-sm font-bold text-white"
                  field={link}
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full rounded bg-pink-400 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                      pathname.includes(asLink(link) as string)
                        ? "translate-y-6"
                        : "translate-y-8"
                    )}
                  />
                  <span className="relative">{label}</span>
                </PrismicNextLink>
              </li>
              {index < settings.data.nav_items.length - 1 && (
                <span
                  className="hidden text-xl font-thin text-white md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
          <li>
            <Button
              linkField={settings.data.cta_link} // <- ignored inside the component
              label="email me"
              classname="text-sm px-3 py-1"
            />
          </li>
        </div>
      </ul>
    </nav>
  );
}

function NameLogo() {
  return (
    <Link href="/" aria-label="Home page">
      <Image
        src="/S-logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="ml-1 h-10 w-auto"
      />
    </Link>
  );
}
