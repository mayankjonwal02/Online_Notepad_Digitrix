import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import MyEditor from "../components/MyEditor";
import { useParams } from "react-router-dom";

export default function Home() {

  const {email , docname , doctype } = useParams()
  return (
    <div className="">
      <Navbar docname={docname} />
      {/* <MyEditor /> */}
      {/* <div className="" style={{display:""}}> */}
        <Card email = {email}  docname = {docname} doctype = {doctype}/>
      {/* </div> */}
    </div>
  );
}
