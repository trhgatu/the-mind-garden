"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownPreviewProps {
    content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
    return (
        <div className="prose prose-lg max-w-none">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold border-b-2 pb-2">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold text-blue-600 pb-1">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold pb-1">{children}</h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-lg font-medium pb-1">{children}</h4>
                    ),
                    h5: ({ children }) => (
                        <h5 className="text-base font-medium pb-1">{children}</h5>
                    ),
                    h6: ({ children }) => (
                        <h6 className="text-sm font-medium pb-1">{children}</h6>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-600">
                            {children}
                        </blockquote>
                    ),
                    code: ({ children }) => {
                        const isBlock = children?.toString().includes("\n");
                        return isBlock ? (
                            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
                                <code>{children}</code>
                            </pre>
                        ) : (
                            <code className="bg-gray-200 px-1 rounded">{children}</code>
                        );
                    },
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside pl-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside pl-4">{children}</ol>
                    ),
                    a: ({ href, children }) => (
                        <a href={href} className="text-blue-500 hover:underline">
                            {children}
                        </a>
                    ),
                }}
            >
                {content}
            </Markdown>
        </div>
    );
};

export default MarkdownPreview;
