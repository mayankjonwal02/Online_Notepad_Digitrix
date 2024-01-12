import React , {useState} from "react";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";



export default function Login() {

  const [email , setemail] = useState("");
  const [password , setpassword] = useState("");
  const [showpass , setshowpass] = useState(false);
  const navigate = useNavigate()



  const submitlogin = async(e) => {

    e.preventDefault()
    if(email.trim().length !== 0 && password.trim().length !== 0)
    {
      try {
        
        const ip = require("../components/myconstants")
          let responce = await fetch(
            `http://${ip}/api/login`,
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                email:email.trim(),
                password:password.trim()
              })
            }
          )
  
          let json = await responce.json();
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
    }
    else
    {
      alert("Fields Empty")
    }

  }

  return (
    <div>
    <Navbar/>
    <div
      className=""
      style={{
        height: "100vh",
        background: "linear-gradient(-45deg, #62cff4, #2c67f2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
      }}
    >
      <div className="container card m-3 " style={{maxWidth:"500px"}}>
        <form className="m-4 " style={{ alignItems:"center", justifyContent:"center"}}>
          <div className="text-center fw-bold fs-1 text-primary">
            Login
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
              onChange={(e) => {setemail(e.currentTarget.value)}}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-5">
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
        <div className="container text-center " style={{marginTop:"30px"}}>

          <button type="submit" class="btn btn-primary" onClick={submitlogin}>
            Submit
          </button>
          
          <div className="text-primary fw-bold m-3" onClick={() => {navigate("/signup")}}>Don't have an Account? SignUp Now</div>
        </div>
        </form>
      </div>
      <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const cred = credentialResponse.credential
        const decodedtoken = atob(cred.split('.')[1])
        const parsedtoken = JSON.parse(decodedtoken)
        const email = parsedtoken.email
        console.log(email);
        try {
        
        const ip = require("../components/myconstants")
          let responce = await fetch(
            `http://${ip}/api/googlelogin`,
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                email:email,
                
              })
            }
          )
  
          let json = await responce.json();
          if(json.success)
          {

            
            // alert(json.message)
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
      }}
      onError={() => {
        alert("login failed")
      }}
      useOneTap
    />
    </div>
    </div>
  );
}
