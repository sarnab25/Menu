import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './CreateItem.css'
import axios from 'axios'
function CreateItem({setcreate,subCategoryId}) {
    const [name, setname]=useState("")
    const [description, setdescription]=useState("")
    const [imageFile, setimageFile]=useState(null)
    const [progress, setProgress]=useState(0)
    const [taxApplicability, settaxApplicability]=useState(false)
    const [tax, settax]=useState(0)
   const[baseAmount, setbaseAmount]=useState(0)
   const [discount, setdiscount]=useState(0)

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
    formData.append("baseAmount", baseAmount)
    formData.append("discount", discount)
    formData.append("subcategory", subCategoryId)

    try {
        const response =await axios.post("http://localhost:5050/subcategory/create/item",formData,{ headers: {
            'Content-Type': 'multipart/form-data',
          },})
          console.log("Item created", response.data)
          setcreate(false)
    } catch (error) {
        console.log("Error creating Item", error)
    }
    }
  return (
    <form className='container1-item' onSubmit={handleSumit}>
        <div className="container2-item">
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

<div className="base">
            <label htmlFor='base'>Amount
            <input id='base' type='number' placeholder='Enter Category name' value={baseAmount} onChange={(e) => setbaseAmount(e.target.value)}/>
            </label>
            </div>

            <div className="discount">
            <label htmlFor='discount'>Discount
            <input id='discount' type='number' placeholder='Enter Category name' value={discount} onChange={(e) => setdiscount(e.target.value)}/>
            </label>
            </div>


        </div>
      <div className="x-btn" onClick={()=>setcreate(false)}>X</div>
<button className='btn btn-primary'>Create Item</button>
    </form>
  )
}

export default CreateItem
