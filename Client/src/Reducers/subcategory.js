const subCategoryReducer=(state={data:null}, action)=>
{
    switch(action.type)
    {
        case "FETCH_SUBCATEGORY":
        return {...state, [action.id]:action.payload}
        
        case "EDIT_SUBCATEGORY":
                        return {...state,
                            data:state.data.map((subcategory)=>subcategory._id ===action.payload._id? action.payload:subcategory)
                        }
                        default:
                            return state
    }
}

export default subCategoryReducer