"use client";

import { JSX } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

// Custom Headings (h1 - h6) with vintage styling
const CustomHeading = ({
  level,
  children,
  ...props
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeMap: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
    1: "text-4xl font-serif text-[#614e3a] font-bold mb-6 mt-8",
    2: "text-3xl font-serif text-[#614e3a] font-semibold mb-5 mt-8",
    3: "text-2xl font-serif text-[#5a4935] font-semibold mb-4 mt-6",
    4: "text-xl font-serif text-[#5a4935] font-medium mb-3 mt-5",
    5: "text-lg font-serif text-[#5a4935] font-medium mb-2 mt-4",
    6: "text-base font-serif text-[#614e3a] font-medium mb-2 mt-3 italic",
  };

  // Add decorative underline to h1 and h2
  const decoratedHeading = level <= 2 ? (
    <Tag className={`${sizeMap[level]} border-b border-[#d3bea1] pb-2 opacity-0 animate-fadeIn`} {...props}>
      {children}
    </Tag>
  ) : (
    <Tag className={`${sizeMap[level]} opacity-0 animate-fadeIn`} {...props}>
      {children}
    </Tag>
  );

  return decoratedHeading;
};

// Custom Blockquote with vintage styling
const CustomBlockquote = (props: JSX.IntrinsicElements["blockquote"]) => (
  <figure className="relative max-w-2xl mx-auto my-8 text-center">
    <blockquote
      className="relative py-6 px-8 border-l-4 bg-[#f3ebdc] border-[#d3bea1] italic rounded-md shadow-sm text-[#614e3a]"
      style={{
        backgroundImage: "url('/assets/images/sepia_toned_grunge_style_background_0501.jpg')",
        backgroundBlendMode: "overlay"
      }}
      {...props}
    />
    {props.cite && (
      <figcaption className="mt-4 text-sm text-[#7d6e5b]">
        — <span className="font-medium italic">{props.cite}</span>
      </figcaption>
    )}
  </figure>
);

// Custom Paragraph with vintage styling
const CustomParagraph = (props: JSX.IntrinsicElements["p"]) => (
  <p className="text-lg leading-relaxed text-[#614e3a] mb-5 first-letter:text-2xl first-letter:font-bold first-letter:text-[#8b3e2f]" {...props} />
);

// Custom Lists with vintage styling
const CustomUnorderedList = (props: JSX.IntrinsicElements["ul"]) => (
  <ul className="list-disc text-[#614e3a] ml-6 space-y-2 my-4" {...props} />
);

const CustomOrderedList = (props: JSX.IntrinsicElements["ol"]) => (
  <ol className="list-decimal text-[#614e3a] ml-6 space-y-2 my-4" {...props} />
);

const CustomListItem = (props: JSX.IntrinsicElements["li"]) => (
  <li className="pl-2" {...props} />
);

// Custom Image with vintage frame styling
const CustomImage = (props: JSX.IntrinsicElements["img"]) => (
  <div className="flex justify-center my-8">
    <div className="p-3 bg-[#e8d9c0] rounded shadow-md border border-[#d3bea1] relative max-w-full">
      <img
        className="rounded max-w-full h-auto"
        {...props}
      />
    </div>
  </div>
);

// Custom Link with vintage styling
const CustomLink = (props: JSX.IntrinsicElements["a"]) => (
  <a
    className="text-[#8b3e2f] hover:text-[#614e3a] border-b border-dotted border-[#d3bea1] hover:border-[#8b3e2f]"
    {...props}
  />
);

// Custom Horizontal Rule with vintage styling
const CustomHr = () => (
  <div className="flex items-center justify-center my-8">
    <div className="h-px bg-[#d3bea1] w-1/3"></div>
    <div className="mx-4 w-6 h-6 opacity-70">
      <Image
        src="/images/flower-decor.png"
        alt="Flower decoration"
        width={24}
        height={24}
      />
    </div>
    <div className="h-px bg-[#d3bea1] w-1/3"></div>
  </div>
);

// Post Content Component
const PostContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-lg max-w-none vintage-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props: JSX.IntrinsicElements["h1"]) => <CustomHeading level={1} {...props} />,
          h2: (props: JSX.IntrinsicElements["h2"]) => <CustomHeading level={2} {...props} />,
          h3: (props: JSX.IntrinsicElements["h3"]) => <CustomHeading level={3} {...props} />,
          h4: (props: JSX.IntrinsicElements["h4"]) => <CustomHeading level={4} {...props} />,
          h5: (props: JSX.IntrinsicElements["h5"]) => <CustomHeading level={5} {...props} />,
          h6: (props: JSX.IntrinsicElements["h6"]) => <CustomHeading level={6} {...props} />,
          blockquote: CustomBlockquote,
          p: CustomParagraph,
          ul: CustomUnorderedList,
          ol: CustomOrderedList,
          li: CustomListItem,
          img: CustomImage,
          a: CustomLink,
          hr: CustomHr,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;