const categoryReducer =(state={data:null},action)=>
{
    switch(action.type)
    {
        case "FETCH_CATEGORY":
            return {...state, data:action.payload}
            

                case "DELETE_CATEGORY":
                    return {...state,
                        data:state.data.filter((category)=>category._id !== action.payload)
                    }

                    case "EDIT_CATEGORY":
                        return {...state,
                            data:state.data.map((category)=>category._id ===action.payload._id? action.payload:category)
                        }
                        default:
                            return state
    }
}

export default categoryReducer