import * as api from "../api"

export const getCategories=()=>async(dispatch)=>
{
    try {
        const {data}=await api.getCategories()
        dispatch({type:"FETCH_CATEGORY", payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory=(id)=>async(dispatch)=>
{
    try {
        await api.deleteCategory(id)
        dispatch({type:"DELETE_CATEGORY", payload:id})
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory=(id,update)=>async(dispatch)=>
{
    try {
    const {data}=    await api.updateCategory(id,update)
    dispatch({type:"EDIT_CATEGORY", payload:data})
    } catch (error) {
        console.log(error) 
    }
}