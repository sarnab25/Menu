import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './CreateCategory.css'
import axios from 'axios'
function CreateCategory({setcreate}) {

    const [name, setname]=useState("")
    const [description, setdescription]=useState("")
    const [imageFile, setimageFile]=useState(null)
    const [progress, setProgress]=useState(0)
    const [taxApplicability, settaxApplicability]=useState(false)
    const [tax, settax]=useState(0)
    const [taxType, settaxType]=useState("")

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
      formData.append('taxType', taxType);
    }

    try {
        const response =await axios.post("https://menu-management-g3wr.onrender.com/categories/create",formData,{ headers: {
            'Content-Type': 'multipart/form-data',
          },})
          console.log("Category created", response.data)
          setcreate(false)
    } catch (error) {
        console.log("Error creating Category", error)
    }
    }
  return (
    <form className='container1' onSubmit={handleSumit}>
        <div className="container2">
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
      <div className="x-btn" onClick={()=>setcreate(false)}>X</div>
<button className='btn btn-primary'>Create Category</button>
    </form>
  )
}

export default CreateCategory
