
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux';
import './Subedit.css'
import { useNavigate, useParams } from 'react-router-dom'
import { updatesubCategory } from '../../actions/subcategory';
import axios from 'axios'
function Subedit() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
const {id}=useParams()
    const [name, setname]=useState("")
    const [description, setdescription]=useState("")
    const [imageFile, setimageFile]=useState(null)
    const [progress, setProgress]=useState(0)
    const [taxApplicability, settaxApplicability]=useState(false)
    const [tax, settax]=useState(0)

    useEffect(()=>
    {
        const getsubCategory=async()=>
        {
            try {
                const response =await axios.get(`https://menu-management-g3wr.onrender.com/category/subcategory/${id}`)
                const subcategory=response.data
                setname(subcategory.name)
                setdescription(subcategory.description)
                settaxApplicability(subcategory.taxApplicability)
                if (subcategory.taxApplicability) {
                    settax(subcategory.tax);

            } 
        }catch (error) {
                console.error("Error Fetchin data", error)
            }
        }

        getsubCategory()
    },[id])

    const handleSumit=async(e)=>
    {
        e.preventDefault(); 
 const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", imageFile)
        formData.append('taxApplicability', taxApplicability);
    if (taxApplicability) {
      formData.append('tax', tax);
        
    }
    dispatch(updatesubCategory(id, formData));
    navigate('/categories')
}
    
  return (
    <form className='container1-editsub' onSubmit={handleSumit}>
        <div className="container2-editsub">
            <div className="name">
            <label htmlFor='name'>Name
            <input id='name' type='text' placeholder='Enter Category name' value={name} onChange={(e) => setname(e.target.value)}/>
            </label>
            </div>

            <div className="image">
            <label htmlFor='image'> Image
            <input id='image' type='file' onChange={(e) => setimageFile(e.target.files[0])}/>
            
            </label>
            </div>

            <div className="description">
            <label htmlFor='description'>Description
            <input id='description' type='text' placeholder='Enter Description' value={description} onChange={(e) => setdescription(e.target.value)}/>
            </label>
            </div>

<div className="taxA">
            <label htmlFor='taxApplicability'>Tax Applicability
            <input id='taxApplicability' type='checkbox' placeholder='Enter Tax Number' checked={taxApplicability} onChange={(e) => settaxApplicability(e.target.checked)}/>
            </label>
            </div>

            {taxApplicability && (
                <>
                <div className="tax">
                <label htmlFor='tax'>Tax
                    <input id='tax' type='number' placeholder='Enter Tax Amount' value={tax} onChange={(e) => settax(e.target.value)}/>
                </label>
                </div>


                </>

                
            )}


        </div>
<button className='btn btn-primary'>Update</button>
    </form>
  )
}

export default Subedit

