import React from "react";
import { useState, useEffect } from "react";
import "./CustomCss/mycss.css"
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams  } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
export default function History(props) {
  const [text, setText] = useState("no version selected");
  const [responseData, setResponseData] = useState(null);
  const {email,docname,doctype} = useParams()
  const editorRef = useRef();
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchcontent = async () => {
      try {
        const ip = require("../components/myconstants");
        let responce = await fetch(`http://${ip}/api/getversion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            docname: docname,
          }),
        });

        let json = await responce.json();

        setResponseData(json);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchcontent();
  }, []);

  const handleEditorChange = async (content, editor) => {
    setText(content);
  };

  const downloadTxtFile = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${docname}.txt`;
    link.click();
  };

  if (!responseData) {
    return <div>Loading....</div>;
  }

  const { success, message, data } = responseData;

  return (
    
    <div className="historyall " style={{ minHeight:"100%", backgroundColor: "#e4e4e4" }}>
    <Navbar docname={docname}/>
    <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* <button onClick={downloadTxtFile}>Download as TXT</button> */}

        
        <div
          className="btn bg-white text-primary fw-bold m-3"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" , justifyContent:"start"}}
          onClick={()=>{navigate(`/document/${email}/${docname}/${"old"}`)}}
        >
          Back to Doc
        </div>
      </div>
      <div className="historyscreen" style={{justifyContent:"center"}}>
        <div>
          <div className="m-5 " style={{  flex: "1" }}>
            <div id="post" className="" style={{display:"flex",flexDirection:"column"}}>
              
            <div
                className=""
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <button onClick={downloadTxtFile}>Download as TXT</button> */}
                <div
                  className="btn bg-white text-primary fw-bold m-3"
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                  onClick={downloadTxtFile}
                >
                  Download as TXT
                </div>
              </div>
              <ReactQuill
                theme="snow"
                className="custom-quill-editor "
                value={text}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["blockquote", "code-block"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "link",
                  "image",
                  "video",
                  "blockquote",
                  "code-block",
                  "color",
                  "background",
                  "align",
                ]}
                style={{ height: "800px" }}
              />
               <div
                className="mt-5 "
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <button onClick={downloadTxtFile}>Download as TXT</button> */}
                <div
                  className="btn bg-white text-primary fw-bold m-3"
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                  onClick={downloadTxtFile}
                >
                  Download as TXT
                </div>
              </div>
             
            </div>
            
          </div>
        </div>
        <div className="">
          
          <div className="mt-5"
            style={{
              
            //   justifyContent: "space-evenly",
            //   height:"200px",
            //   overflowY:"auto",
            //   marginTop:"20px"
              
            }}
          >
          <div className="bg-primary text-white fw-bold text-center" style={{height:"fit-content"}}>
            Version
          </div>
          <div className="version" style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "space-evenly",
            //   height:"800px",
              overflow:"auto",
              marginTop:"20px",
            //   flex:"1"
              
            }}>

            {data.map((version) => (
              <div className="btn bg-white text-primary m-3 fw-bold" style={{width:"max-content"}} onClick={() => {setText(version.content)}}>{version.date}</div>
            ))}
          </div>
          </div>
        </div>
      </div>


   
    </div>
  );
}
