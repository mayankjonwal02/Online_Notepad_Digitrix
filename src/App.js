import "./App.css";
import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Docs from "./screens/Docs";
import Defaultscreen from "./screens/defaultscreen";
import History from "./screens/history";
import WithoutLoginDoc from "./screens/withoutlogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path="/" element={<Defaultscreen/>} />
          <Route exact path="/document/:email/:docname/:doctype" element={<Home />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/docs" element={<Docs/>}/>
          <Route exact path="/history/:email/:docname/:doctype" element={<History/>}/>
          <Route exact path="/noaccountdoc" element={<WithoutLoginDoc/>}/>
        </Routes>
      </div>
    </Router>


  );
}

export default App;
