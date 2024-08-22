import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './EditItem.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { updateItem } from '../../actions/item'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function EditItem() {
    const disptach=useDispatch()
    const navigate=useNavigate()
const {id}=useParams()
    const [name, setname]=useState("")
    const [description, setdescription]=useState("")
    const [imageFile, setimageFile]=useState(null)
    const [progress, setProgress]=useState(0)
    const [taxApplicability, settaxApplicability]=useState(false)
    const [tax, settax]=useState(0)
   const[baseAmount, setbaseAmount]=useState(0)
   const [discount, setdiscount]=useState(0)


useEffect(()=>
{
    const getItem =async()=>
    {
        try {
            const response = await axios.get(`https://menu-management-g3wr.onrender.com/subcategory/item/${id}/`)
            const item=response.data
            console.log(item)

            setname(item.name)
            setdescription(item.description)
            setbaseAmount(item.baseAmount)
            setdiscount(item.discount)
            settax(item.tax)
        } catch (error) {
            console.error("Error Fetchin data", error)

        }
    }
    getItem()
},[id])

    const handleSumit=async(e)=>
    {
        e.preventDefault(); 
        console.log({ name, description, imageFile, taxApplicability, tax, baseAmount, discount });

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

   disptach(updateItem(id,formData))
   navigate('/categories')
    }
  return (
    <form className='container1-itemEdit' onSubmit={handleSumit}>
        <div className="container2-itemEdit">
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
<button className='btn btn-primary'>Update</button>
    </form>
  )
}

export default EditItem
