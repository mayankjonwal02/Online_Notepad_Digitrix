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
    <div className="">
      <Navbar docname={"No Account Found"} />

        <Card email = {email}  docname = {docname} doctype = {doctype}/>
      
    </div>
  );
}
