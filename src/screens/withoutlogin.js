import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import MyEditor from "../components/MyEditor";
import { useParams } from "react-router-dom";

export default function WithoutLoginDoc() {

  const email = ""
  const docname = ""
  const doctype = "old"
  return (
    <div className="bg-primary ">
    <div className="container">

      <Navbar docname={""} />
    </div>

<div className="" style={{ backgroundColor: "#e4e4e4"}}>
  
        <Card email = {email}  docname = {docname} doctype = {doctype}/>
</div>
      
    </div>
  );
}
