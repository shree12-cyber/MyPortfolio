import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicNextImage} from "@prismicio/next";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps) => {
  return (
      <PrismicNextImage field={slice.primary.image} imgixParams={{w: 600}}/>
  );
};

export default ImageBlock;
