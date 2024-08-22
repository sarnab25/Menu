import * as api from "../api"
export const getSubcategories=(id)=>async(dispatch)=>
{
    try {
        const {data}= await api.getSubcategories(id)
        dispatch({type:"FETCH_SUBCATEGORY", payload:data,id})
    } catch (error) {
        console.log(error)
    }
}

export const updatesubCategory=(id,update)=>async(dispatch)=>
    {
        try {
        const {data}=    await api.updatesubCategory(id,update)
        dispatch({type:"EDIT_SUBCATEGORY", payload:data})
        } catch (error) {
            console.log(error) 
        }
    }