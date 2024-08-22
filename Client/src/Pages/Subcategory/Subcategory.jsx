import React, { useEffect } from 'react'
import { getSubcategories } from '../../actions/subcategory'
import { useDispatch, useSelector } from 'react-redux'
import Hotel from "../../Components/Heading/Hotel.jpg"
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import CreateSubcategory from '../CreateSubcategory/CreateSubcategory'
import { useState } from 'react'
import './Subcategory.css'
function Subcategory() {
  const [create, setcreate]=useState(false)
const dispatch=useDispatch()
const {id}=useParams()
const allSubcategories =useSelector(state=>state.subCategoryReducer[id]|| [])
const handleClick=()=>
  {
    setcreate(true)
  }
    useEffect(()=>
    {
      if(id)
      {
        dispatch(getSubcategories(id))
      }
     

    },[dispatch,id] )


  return (
    <>
    <div className='subcategory-container'>
        {

        
            allSubcategories.map((subcategory, index)=>
            (
<div key={index} className="card subcategory-container" style={{width: "18rem"}}>
  <img src={subcategory.image.url} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{subcategory.name} </h5>
    <p className="card-text">{subcategory.description}</p>
    <NavLink className="btn btn-primary" to={`/subcategory/${subcategory._id}/items`}>
       Show more
      </NavLink>

      <NavLink to={`/subcategory/${subcategory._id}/edit`} className="btn btn-info edit">
    Edit
    </NavLink>
  </div>
</div>
            ))
        }
          
          <div className="createsub">
        <button className='btn btn-info' onClick={handleClick}>Create Subcategory

        </button>
      </div>
    </div>

    {create && <CreateSubcategory setcreate={setcreate} categoryId={id}/>}

    </>
  )
}

export default Subcategory
