import React from 'react';
import { Routes,Route,Link } from "react-router-dom";
import Heading from './Heading/Heading';
import Category from '../Pages/Category/Category';
import Subcategory from '../Pages/Subcategory/Subcategory';
import Item from "../Pages/Item/Item"
import Edit from '../Pages/Edit/Edit';
import Subedit from '../Pages/Subedit/Subedit';
import EditItem from '../Pages/EditItem/EditItem';
export default function Allroutes()
{
    return(
        <Routes>
<Route path="/" element={<Heading/>}/>
<Route path="/categories" element={<Category/>}/>
<Route path="/category/:id/subcategories" element={<Subcategory/>}/>
<Route path='/subcategory/:id/items' element={<Item/>}/>
<Route path='/category/:id/edit' element={<Edit/>}/>
<Route path='/subcategory/:id/edit' element={<Subedit/>}/>
<Route path='/:id/edit' element={<EditItem/>}/>
        </Routes>
    )
}