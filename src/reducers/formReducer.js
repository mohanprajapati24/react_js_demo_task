export const initialState = {
    eamil         : "",
    password      : "",
    errors        : {},
    isSubmitting  : false
}

export function formReducer (state, action){
    switch (action.type){
        case "FIELD_CHANGE" :
            return{
                ...state,
                [action.field] : action.value
            };

        case "SET_ERROR" : 
            return{
                ...state,
                errors: action.payload
            };

        case "SUBMIT_START" : 
            return{
                ...state,
                isSubmitting : true
            };

        case "SUBMIT_END" : 
            return{
                ...state,
                isSubmitting : false
            };

        case "RESET_FORM" : 
                return initialState;

        default:
            return state

    }
}