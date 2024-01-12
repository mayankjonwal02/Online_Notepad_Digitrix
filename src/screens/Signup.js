import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const [conpassword , setconpassword] = useState("");
    const [showpass , setshowpass] = useState(false);
    const [showconpass , setshowconpass] = useState(false);
    const navigate = useNavigate()

    const submitregister = async(e) => {
      e.preventDefault()
      if(email.trim().length !== 0 && password.trim().length !== 0 && conpassword.trim().length !== 0)
      {
        if (password.trim() === conpassword.trim()) {
          try {
            
            const ip = require("../components/myconstants")
            let responce = await fetch(
              `http://${ip}/api/signup`,
              {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body : JSON.stringify({
                  email : email.trim(),
                  password : password.trim()
                })
              }
            )

            let json = await responce.json()
            if(json.success)
            {
              alert(json.message)
              navigate("/docs")
            localStorage.setItem("email",email)
            localStorage.setItem("islogined","true")
            }
            else
            {
              alert(json.message)
            }

          } catch (error) {
            alert(error.message)
          }
          
        } else {
          alert("Password Mis-Match")
        }
      }
      else
      {
        alert("Fields Empty")
      }
    }

  return (
    <div className="">
    <div className="">


    <Navbar/>
    <div
      className=""
      style={{
        height: "100vh",
        background: "linear-gradient(-45deg, #62cff4, #2c67f2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container card m-3 " style={{maxWidth:"500px"}}>
        <form className="m-3 " style={{ alignItems:"center", justifyContent:"center"}}>
          <div className="text-center fw-bold fs-1 text-primary mb-3">
            Signup
          </div>
          <div class="mb-4">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => {
                setemail(e.currentTarget.value)
             
              }}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <div className="input-group">

            <input
              type={showpass?"text":"password"}
              class="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => {
                setpassword(e.currentTarget.value)
              }}
            />
            <button className="btn text-primary fw-bold" style={{background:"#89CFF0"}} type="button" onClick={() => setshowpass(!showpass)}>
               {showpass?"Hide":"Show"}
            </button>
            </div>
          </div>
          <div class="mb-5">
            <label for="exampleInputPassword1" class="form-label">
              Confirm Password
            </label>
            <div className="input-group">

            <input
              type={showconpass?"text":"password"}
              class="form-control"
              id="exampleInputPassword1"
              value={conpassword}
              onChange={(e) => {
                setconpassword(e.currentTarget.value)
              }}
            />
              <button className="btn text-primary fw-bold" type="button" style={{background:"#89CFF0"}} onClick={() => setshowconpass(!showconpass)}>
                {showconpass?"Hide":"Show"}
            </button>
            </div>
          </div>
        <div className="container text-center " style={{marginTop:"30px"}}>

          <button type="submit" class="btn btn-primary" onClick={submitregister}>
            Submit
          </button>
          <div className="text-primary fw-bold m-3" onClick={() => {navigate("/login")}}>Already Registered? Login</div>

        </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
