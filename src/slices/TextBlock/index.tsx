import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { FilledLinkToWebField } from "@prismicio/client";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

type ExtendedTextBlockPrimary = {
  text: Content.TextBlockSlice["primary"]["text"];
  project_link?: { link_type: string; url?: string }; // Ensure it's optional
};

export type ExtendedTextBlockProps = Omit<TextBlockProps, "slice"> & {
  slice: { primary: ExtendedTextBlockPrimary };
};

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: ExtendedTextBlockProps) => {
  const projectLink = slice.primary.project_link as FilledLinkToWebField;
  return (
    <div className="max-w-prose">
      <PrismicRichText field={slice.primary.text} />
      {projectLink?.url && (
        <PrismicNextLink field={projectLink} className="italic" />
      )}
    </div>
  );
};

export default TextBlock;
