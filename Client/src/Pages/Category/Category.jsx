import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {deleteCategory, getCategories} from "../../actions/category"
import Hotel from "../../Components/Heading/Hotel.jpg"
import { NavLink } from 'react-router-dom'
import CreateCategory from '../CreateCategory/CreateCategory'
import "./Category.css"
function Category() {

  const [create, setcreate]=useState(false)
const dispatch=useDispatch()
const handleClick=()=>
{
  setcreate(true)
}
const allCategories= useSelector(state=>state.categoryReducer.data)

useEffect(()=>
{
  dispatch(getCategories())
},[dispatch])

const handleDelete=(id)=>
{
  dispatch(deleteCategory(id))
}

if(!allCategories) 
{
  return ( <p>No Categories Available</p>)
 
}


  return (
    <>
  
   <div className="category-container">
   { allCategories.map((category, index)=>
      (
    <div key={index} className="card category" style={{width: "18rem"}}>
  <img src={category.image.url} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{category.name} </h5>
    <p className="card-text">{category.description}</p>
    <NavLink to={`/category/${category._id}/subcategories`} className="btn btn-primary">
    Show more
    </NavLink>
    <NavLink to={`/category/${category._id}/edit`} className="btn btn-info edit">
    Edit
    </NavLink>
  </div>
  
  <button className='btn btn-danger' onClick={()=>handleDelete(category._id)}>Delete Category</button>
  
</div>
      ))}
      <div className="create">
        <button className='btn btn-info' onClick={handleClick}>Create Category

        </button>
      </div>
</div>

{create && <CreateCategory setcreate={setcreate}/>}
</>
  )
}

  


export default Category
