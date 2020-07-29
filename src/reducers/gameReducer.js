import * as actionTypes from "../actions/types/actionTypes";
import { PlayerDetails } from "../data/PlayerDetails";
import { act } from "react-test-renderer";

const initialState={
    score:0,
    level:0,
    color:'black',
    questions:[{question:'',answer:'false'}],
    disabled:false,
    playerDetails: new PlayerDetails(0,0),
    gameOverDialogVisibillity:false,
    duration:3,
    name:"",
    isTimerPlaying:true,
}

 const gameReducer = (state = initialState,action)=>{

    switch (action.type){
        case actionTypes.NAVIGATE:
    
            return {
                ...state,
                screen:action.screen
            }
        case actionTypes.GET_QUESTIONS:
      
            return{ 
                  ...state,
                questions:action.payload
            } 
        case actionTypes.CHANGE_QUESTION_TEXT_COLOR:
            return {
                ...state,
                color:action.payload,
                duration:action.duration,
            } 
        case actionTypes.GET_PLAYER_DETAILS:
                return {
                ...state,
                score:action.score,
                level:action.level,
                name:action.name
            }
        case actionTypes.UPDTAE_PLAYER_DETAILS:
            return{
                ...state,
                score:action.score,
                level:action.level,
                playerDetails:action.details,
            }
        case actionTypes.ENABLE_OR_DISABLE_ANSWER_BTNS:
            return{
                ...state,
                disabled:action.payload
            }
        case actionTypes.GAME_OVER:
        
            return{
                ...state,
                gameOverDialogVisibillity:action.payload
           }
        case actionTypes.STOP_OR_RESUME_TIMER:
            return{
                ...state,
                isTimerPlaying:action.isTimerPlaying,
            }   
            
        default: return state;
    }

};

export default gameReducer
