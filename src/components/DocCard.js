import React from 'react'
import "./componentcss.css"
import { useNavigate } from 'react-router-dom'

export default function DocCard(props) {
    const navigate  = useNavigate();
    const email = localStorage.getItem("email")
  return (
    <div onClick={() => {navigate(`/document/${email}/${props.docname}/${"old"}`)}}>
      <div className='card cardconfig' style={{height:"200px",width:"200px" }}>
        <div className='' style={{display:"flex",flexDirection:"column"}}>
            <h5 className='card-title m-2 text-primary'>{props.docname.toUpperCase()}</h5>
            <div className="m-2" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <div className="fw-bold  " style={{margin:0}}>Opened:  </div>
            <div className="ms-1" style={{margin:0}}>{props.date}</div>
            </div>
        </div>
      </div>
    </div>
  )
}
