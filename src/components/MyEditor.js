import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
export default function MyEditor() {
  const editorRef = useRef();
  return (
    <div className="h-100">
      <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
    </div>
  );
}
