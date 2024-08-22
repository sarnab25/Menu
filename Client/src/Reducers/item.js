const itemReducer =(state={item:[]},action)=>
{
switch(action.type)
{
    case "FETCH_ITEM":
        return {...state, item:action.payload}

        case "EDIT_ITEM":
            return {...state,
                item:state.item.map((item)=>item._id ===action.payload._id? action.payload:item)
            }

        case "SEARCH_ITEM":
            return  {...state, item:action.payload}
        default:
            return state
}
}
export default itemReducer