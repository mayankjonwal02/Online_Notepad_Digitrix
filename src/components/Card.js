import React from "react";
import { useState, useEffect } from "react";
import MyEditor from "./MyEditor";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
export default function Card() {
  const [text, setText] = useState("hello");
  const editorRef = useRef();
  useEffect(() => {
    const saveuserdata = localStorage.getItem("user_text");
    if (saveuserdata) {
      setText(saveuserdata);
    }
  }, []);

  const handleEditorChange = (content, editor) => {
    setText(content);
    localStorage.setItem("user_text", content);
  };
  return (
    <div>
      <div
        className="container p-3 "
        style={{ height: "800px", margin: "10px" }}
      >
        <form id="post">
          <div
            className="container p-3"
            style={{ height: "800px", margin: "10px" }}
          >
            <form id="post">
              {/* Use TinyMCE Editor component with onEditorChange event */}
              <Editor
                apiKey="00fkx56ieoxtf2xpt3e53ibiq7v38ukonormmyw6ck0akhy7" // Replace with your TinyMCE API key
                value={text}
                init={{
                  selector: "#editor",
                  height: 700,
                  menubar: true,
                  plugins:
                    "powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap linkchecker emoticons advtable export autosave",
                  toolbar:
                    "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
                  // height: "700px",
                  content_style: "body { background-color:#F0F8FF}",
                }}
                onEditorChange={handleEditorChange}
              />
            </form>
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
}
