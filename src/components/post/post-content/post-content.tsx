"use client";

import React, {
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Custom Blockquote
const CustomBlockquote = ({
  children,
  ...props
}: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
  <blockquote
    className="border-l-4 border-primary pl-4 italic text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-md"
    {...props}
  >
    {children}
  </blockquote>
);

// Custom Paragraph
const CustomParagraph = ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200" {...props}>
    {children}
  </p>
);

// Custom Unordered List
const CustomUnorderedList = ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
  <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 ml-5 space-y-2" {...props}>
    {children}
  </ul>
);

const CustomPoetry = ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
  <pre
    className="whitespace-pre-wrap text-center font-serif text-lg leading-loose italic text-gray-800 dark:text-gray-300"
    {...props}
  >
    {children}
  </pre>
);

// Custom Ordered List
const CustomOrderedList = ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
  <ol className="list-decimal list-inside text-gray-800 dark:text-gray-200 ml-5 space-y-2" {...props}>
    {children}
  </ol>
);

// Custom List Item
const CustomListItem = ({ children, ...props }: LiHTMLAttributes<HTMLLIElement>) => (
  <li className="pl-2" {...props}>
    {children}
  </li>
);

// Custom Bold (strong)
const CustomBold = ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
  <strong className="font-semibold text-primary" {...props}>
    {children}
  </strong>
);

// Custom Italic (em)
const CustomItalic = ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
  <em className="italic text-gray-600 dark:text-gray-400" {...props}>
    {children}
  </em>
);

// Custom markdown components
const markdownComponents = {
  blockquote: CustomBlockquote,
  p: CustomParagraph,
  ul: CustomUnorderedList,
  ol: CustomOrderedList,
  li: CustomListItem,
  strong: CustomBold,
  em: CustomItalic,
  pre: CustomPoetry
};

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
