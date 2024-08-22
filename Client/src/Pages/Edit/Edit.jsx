import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux';
import './Edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCategory } from '../../actions/category';
import axios from 'axios'
function Edit() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
const {id}=useParams()
    const [name, setname]=useState("")
    const [description, setdescription]=useState("")
    const [imageFile, setimageFile]=useState(null)
    const [progress, setProgress]=useState(0)
    const [taxApplicability, settaxApplicability]=useState(false)
    const [tax, settax]=useState(0)
    const [taxType, settaxType]=useState("")

    useEffect(()=>
    {
        const getCategory=async()=>
        {
            try {
                const response =await axios.get(`https://menu-management-g3wr.onrender.com/categories/${id}`)
                const category=response.data
                setname(category.name)
                setdescription(category.description)
                settaxApplicability(category.taxApplicability)
                if (category.taxApplicability) {
                    settax(category.tax);
                    settaxType(category.taxType);

            } 
        }catch (error) {
                console.error("Error Fetchin data", error)
            }
        }

        getCategory()
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
    dispatch(updateCategory(id, formData));
    navigate('/categories')
}
    
  return (
    <form className='container1-edit' onSubmit={handleSumit}>
        <div className="container2-edit">
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

<div className="tType">
                <label htmlFor='taxType'>Tax Type
                            <select id='taxType' value={taxType} onChange={(e) => settaxType(e.target.value)}>
                                <option value="">Select Tax Type</option>
                                <option value="Percentage">Percentage</option>
                                <option value="Flat">Flat</option>
                                <option value="Excise">Excise</option>
                                <option value="Service">Service</option>
                            </select>
                        </label>
                        </div>
                </>

                
            )}


        </div>
<button className='btn btn-primary'>Update</button>
    </form>
  )
}

export default Edit
