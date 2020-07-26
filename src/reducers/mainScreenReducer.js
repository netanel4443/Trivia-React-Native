import { NAVIGATE } from "../actions/types/actionTypes";


  const mainScreenReducer = (state = [],action)=>{

    switch (action.type){
        case NAVIGATE:
            return {
                screen:action.screen
            };

        default: return state;
    }
    return state
};

export default mainScreenReducer
