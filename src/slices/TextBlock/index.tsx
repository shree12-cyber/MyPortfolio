import {Content} from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

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
    return (
        <div className="max-w-prose">
            <PrismicRichText field={slice.primary.text}/> 
            <PrismicNextLink field={slice.primary.project_link} className="italic"/>
        </div>
    );
};

export default TextBlock;
