import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getallItem } from '../../actions/item'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import CreateItem from '../CreateItem/CreateItem'
import Searchbar from '../../Components/Searchbar/Searchbar'
import './Item.css'
import Hotel from "../../Components/Heading/Hotel.jpg"

function Item() {
  const [create, setcreate]=useState(false)
 
  const handleSumit=()=>
  {
    setcreate(true)
  }
    const dispatch=useDispatch()
    const allItems= useSelector(state=>state.itemReducer.item)
    const {id}=useParams()

    useEffect(()=>
    {
        if(id)
        {
            dispatch(getallItem(id))
        }
       
    },[dispatch, id])
  return (
    <>
   
    <div className="item-container">
      
        { allItems.map((item, index)=>
        (
            <div key={index} className="card category" style={{width: "18rem"}}>
            <img src={item.image.url} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{item.name} </h5>
              <p className="card-text">{item.description}</p>
              <NavLink to={`/${item._id}/edit`}>
              <button className='btn btn-info'>Edit</button>
              </NavLink>
            </div>
            </div>
        ))}
        <div className="container-3">
  <div className="create"><button className='btn btn-primary' onClick={handleSumit}>Create Item</button></div>
  <Searchbar/>
  </div>
  </div>
{
  create && <CreateItem setcreate={setcreate} subCategoryId={id}/>
}
  </>
  )
}

export default Item
