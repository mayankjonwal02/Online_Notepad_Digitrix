import React from "react";
import { useNavigate } from "react-router-dom";
import "./componentcss.css";

export default function Navbar(props) {
  let islogined = localStorage.getItem("islogined");
  const navigate = useNavigate();
  const docname = props.docname;
  const onlogout = () => {
    navigate("/login");
    localStorage.setItem("islogined", "false");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid" style={{ display: "flex" }}>
        <div
          className=""
          style={{
            fontWeight: "bolder",
            fontSize: "30px",
            color: "#ffffff",
            flex: "1",
          }}
        >
          Digitrix
        </div>

        {props.docname ? (
          <div
            className="navconfig"
            style={{
              fontWeight: "bolder",
              fontSize: "20px",
              color: "#7DF9FF",
              alignItems: "center",
            }}
          >
            {props.docname.toUpperCase()}
          </div>
        ) : null}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div
            className=""
            style={{
              justifyContent: "end",
              alignItems: "end",
              display: "flex",
              flex: "1",
            }}
          >
            <div
              className="btn bg-white text-primary fw-bold fs-5"
              onClick={onlogout}
            >
              {islogined === "true" ? "Logout" : "Login"}
            </div>
            <div
              className="btn bg-white text-primary fw-bold fs-5 ms-2"
              onClick={() => {navigate("/noaccountdoc")}}
            >
              Go to Docs
            </div>
          </div>
          {/* <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}
