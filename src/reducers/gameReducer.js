import { NAVIGATE, UPDTAE_PLAYER_DETAILS
     ,CHANGE_QUESTION_TEXT_COLOR, GET_PLAYER_DETAILS,
      GET_QUESTIONS, ENABLE_OR_DISABLE_ANSWER_BTNS ,GAME_OVER} from "../actions/types/actionTypes";
import { PlayerDetails } from "../data/PlayerDetails";

const initialState={
    score:0,
    level:0,
    color:'black',
    questions:[{question:'',answer:'false'}],
    disabled:false,
    playerDetails: new PlayerDetails(0,0),
    gameOverDialogVisibillity:false,
    duration:3,
}

 const gameReducer = (state = initialState,action)=>{

    switch (action.type){
        case NAVIGATE:
    
            return {
                ...state,
                screen:action.screen
            }
        case GET_QUESTIONS:
      
            return{ 
                  ...state,
                questions:action.payload
            } 
        case CHANGE_QUESTION_TEXT_COLOR:
            return {
                ...state,
                color:action.payload,
                duration:action.duration,
            } 
        case GET_PLAYER_DETAILS:
       
                return {
                ...state,
                score:action.score,
                level:action.level,
            }
        case UPDTAE_PLAYER_DETAILS:
            return{
                ...state,
                score:action.score,
                level:action.level,
                playerDetails:action.details
            }
        case ENABLE_OR_DISABLE_ANSWER_BTNS:
            return{
                ...state,
                disabled:action.payload
            }
        case GAME_OVER:
            console.log('game over')
            return{
                ...state,
                gameOverDialogVisibillity:action.payload
           }
            
        default: return state;
    }

};

export default gameReducer
