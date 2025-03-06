"use client";

import { JSX } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Custom Headings (h1 - h6)
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
    1: "text-4xl font-bold text-primary",
    2: "text-3xl font-semibold text-primary",
    3: "text-2xl font-semibold text-gray-800 dark:text-gray-200",
    4: "text-xl font-medium text-gray-700 dark:text-gray-300",
    5: "text-lg font-medium text-gray-600 dark:text-gray-400",
    6: "text-base font-medium text-gray-500 dark:text-gray-400",
  };

  return (
    <Tag className={`${sizeMap[level]} mt-4 mb-2`} {...props}>
      {children}
    </Tag>
  );
};


// Custom Blockquote
const CustomBlockquote = (props: JSX.IntrinsicElements["blockquote"]) => (
  <figure className="relative max-w-2xl mx-auto text-center p-6">
    <svg className="w-12 h-12 mx-auto mb-4 text-primary opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
      <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
    </svg>
    <blockquote
      className="relative text-lg  p-4 border-l-4 border-primary bg-accent rounded-md transition-all duration-300"
      {...props}
    />

    {props.cite && (
      <figcaption className="mt-4 text-sm">
        — <span className="font-medium">{props.cite}</span>
      </figcaption>
    )}
  </figure>
);


// Custom Paragraph
const CustomParagraph = (props: JSX.IntrinsicElements["p"]) => (
  <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200" {...props} />
);

// Custom Lists
const CustomUnorderedList = (props: JSX.IntrinsicElements["ul"]) => (
  <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 ml-5 space-y-2" {...props} />
);

const CustomOrderedList = (props: JSX.IntrinsicElements["ol"]) => (
  <ol className="list-decimal list-inside text-gray-800 dark:text-gray-200 ml-5 space-y-2" {...props} />
);

const CustomListItem = (props: JSX.IntrinsicElements["li"]) => <li className="pl-2" {...props} />;

// Custom Text Elements
const CustomBold = (props: JSX.IntrinsicElements["strong"]) => (
  <strong className="font-semibold text-primary" {...props} />
);

const CustomItalic = (props: JSX.IntrinsicElements["em"]) => (
  <em className="italic text-gray-600 dark:text-gray-400" {...props} />
);

// Custom Link
const CustomLink = (props: JSX.IntrinsicElements["a"]) => (
  <a
    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

// Custom Horizontal Rule
const CustomHr = (props: JSX.IntrinsicElements["hr"]) => (
  <hr className="border-t-2 border-gray-300 dark:border-gray-600 my-6" {...props} />
);

// Custom Code Block
const CustomCode = (props: JSX.IntrinsicElements["code"]) => (
  <code className="bg-gray-100 dark:bg-gray-800 text-red-500 px-2 py-1 rounded" {...props} />
);

// Custom Poetry Block
const CustomPoetry = (props: JSX.IntrinsicElements["pre"]) => (
  <pre
    className="whitespace-pre-wrap text-center font-serif text-lg leading-loose italic text-gray-800 dark:text-gray-300"
    {...props}
  />
);

// Custom Image
const CustomImage = (props: JSX.IntrinsicElements["img"]) => (
  <div className="flex justify-center my-4">
    <img className="rounded-lg shadow-md max-w-full h-auto" {...props} />
  </div>
);

// Custom markdown components mapping
const markdownComponents = {
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
  strong: CustomBold,
  em: CustomItalic,
  a: CustomLink,
  hr: CustomHr,
  code: CustomCode,
  pre: CustomPoetry,
  img: CustomImage,
};

// Post Content Component
const PostContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-lg prose-gray max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;
