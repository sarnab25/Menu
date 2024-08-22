import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { search } from '../../actions/item';

import './Searchbar.css'
function Searchbar() {
    const dispatch=useDispatch()
    const [query, setquery]=useState("")
    const handleSearch =(e)=>
    {
        e.preventDefault();
if(search)
{
    dispatch(search(query))
}
    }
    
  return (
    <div className='search-bar'>
    <input type='text' placeholder='Search Item'  value={query} onChange={(e)=>setquery(e.target.value)} />   <button className='btn btn-info' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Searchbar
