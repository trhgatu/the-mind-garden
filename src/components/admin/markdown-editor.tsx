"use client";
import React, { useEffect, useRef } from "react";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

const MarkdownEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const easyMDERef = useRef<EasyMDE | null>(null);

  useEffect(() => {
    if (editorRef.current && !easyMDERef.current) {
      easyMDERef.current = new EasyMDE({
        element: editorRef.current,
        initialValue: value,
        spellChecker: false,
      });

      easyMDERef.current.codemirror.on("change", () => {
        onChange(easyMDERef.current?.value() || "");
      });
    }

    return () => {
      if (easyMDERef.current) {
        easyMDERef.current.toTextArea();
        easyMDERef.current = null;
      }
    };
  }, []);

  return <textarea ref={editorRef} />;
};

export default MarkdownEditor;