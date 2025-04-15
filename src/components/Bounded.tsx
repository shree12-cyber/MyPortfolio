import React from "react";
import clsx from "clsx";

type BoundedProps<T extends React.ElementType = "section"> = {
    as?: T;
    className?: string;
    children?: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
    <T extends React.ElementType = "section">(
        { as: Comp = "section" as T, className, children, ...restProps }: BoundedProps<T>,
        ref: React.Ref<T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : HTMLElement>
    ) => {
        return (
            <Comp
                ref={ref}
                className={clsx("px-6 py-10 md:px-7 md:py-14 lg:py-16", className)}
                {...restProps}
            >
                <div className="mx-auto w-full max-w-5xl">{children}</div>
            </Comp>
        );
    }
);

Bounded.displayName = "Bounded";

export default Bounded;
