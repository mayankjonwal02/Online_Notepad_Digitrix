import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaPlus } from "react-icons/fa";
import "./CustomCss/mycss.css";
import DocCard from "../components/DocCard";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup'
import Modal from 'react-modal'



export default function Docs() {

    
    const navigate = useNavigate();
    const [popup , setpopup] = useState(false)
    const [docname , setdocname] = useState("")
    const [responseData, setResponseData] = useState(null);
    const email = localStorage.getItem("email")
    const [doclist,setdoclist] = useState([])


    useEffect(() => {

        const getdoclist = async () => {
            try {
                let ip = require("../components/myconstants")
                let responce = await fetch(`http://${ip}/api/getdoclist` , {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email : email
                    })
                })

                const data = await responce.json();
                setResponseData(data);
                // alert(data.success)
                

                
            } catch (error) {
                alert(error.message)
            }
        }
    getdoclist()
    },[])

    if (!responseData) {
      return <p>Loading...</p>;
    }

    const { success, message, data } = responseData;

  return (
    <div>
   
      <Navbar />
      <div
        className="container mt-5"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
      <div>
  
</div>

        <div
          className="card rounded-circle bg-primary addDocButton"
          style={{
            width: "80px",
            height: "80px",
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setpopup(true)
          }}
        >
          <FaPlus className="text-white fs-1" />
        </div>
        
      </div>
      <Modal isOpen= {popup} onRequestClose={() => {setpopup(false)}} contentLabel="Example Modal" style={{content:{ display:"flex",flexDirection:"column",width: "fit-content",
      height: 'fit-content', // Set your desired height
      margin: 'auto'}}}>
        
         
         
    {/* <label for="exampleInputEmail1" className="form-label">Document Name</label> */}
    <input type="text" placeholder="Document Name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={docname}  onChange={(e) => {setdocname(e.currentTarget.value)}}/>
    <div style={{display:"flex" , alignItems:"center",justifyContent:"center"}}>

    <div className="btn btn-primary mt-3" style={{width:"fit-content"}} onClick={() => {
        if(docname.trim() !== "")
        {
            let doctype = "new"
            navigate(`/document/${email}/${docname}/${doctype}`)
        }
        else
        {
            alert("Document Name empty")
        }
        
        
        }
        }>
        Let's Start
    </div>
    
    </div>
  
         
        
      </Modal>
 

      <div className="container mt-5 centergridcontent" style={{alignItems:"center",justifyContent:"center" }}>

      <div className="gridclass">
      

      {success && data.docs.map((doc, index) => (
  <DocCard key={index} docname={doc.docname} date={doc.date} />
))}




      </div>
      </div>
    </div>
  );
}
