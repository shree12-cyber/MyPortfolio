import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";

type ButtonProps = {
  linkField?: LinkField;
  href?: string;
  label: KeyTextField;
  showIcon?: boolean;
  classname?: string;
};

export default function Button({
  linkField,
  href,
  label,
  showIcon = true,
  classname,
}: ButtonProps) {
  const linkProps = href ? { href } : { field: linkField };

  return (
    <PrismicNextLink
      {...linkProps}
      className={clsx(
        "group relative flex w-fit text-stone-800 items-center justify-center overflow-hidden rounded-md border-2 border-stone-900 bg-stone-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
        classname
      )}
    >
      <span className="absolute inset-0 z-0 h-full translate-y-9 bg-pink-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
      <span className="relative flex items-center justify-center gap-2">
        {label} {showIcon && <MdArrowOutward className="inline-block" />}
      </span>
    </PrismicNextLink>
  );
}
