import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import MyEditor from "../components/MyEditor";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <MyEditor /> */}
      <div className="container">
        <Card />
      </div>
    </div>
  );
}
