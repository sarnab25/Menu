import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hotel from "../Heading/Hotel.jpg"
import "./Heading.css"
import { useNavigate } from 'react-router-dom';
function Heading() {
  
  const navigate=useNavigate()
const handle=()=>
{
  
  navigate("/categories")
}
  return (
    <div className="card Heading" style={{width: "55rem"}}>
  <img src={Hotel} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Welcome to Oiishi Hotel </h5>
    <p className="card-text">The Wait is Over</p>
    
    <button className="btn btn-primary" onClick={handle}>Click to see today's menu</button>
    
  </div>
</div>
  )
}

export default Heading
