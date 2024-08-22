import * as api from "../api"

export const getallItem=(id)=>async(disptach)=>
{
    try {
        const {data}=await api.getallItem(id)
        console.log("Fetched",data)
        disptach({type:"FETCH_ITEM", payload:data, id})
    } catch (error) {
        console.log(error)
    }
}

export const updateItem=(id,update)=>async(dispatch)=>
    {
        try {
        const {data}=    await api.updateItem(id,update)
        dispatch({type:"EDIT_ITEM", payload:data})
        } catch (error) {
            console.log(error) 
        }
    }

    export const search =(name)=>async(dispatch)=>
    {
        try{
            const {data}=await api.search(name)
            dispatch({type:'SEARCH_ITEM', payload:data})
        }
        catch(error)
        {
            console.error('Error searching items', error);
        }
    }