import { NAVIGATE, CHANGE_QUESTION_TEXT_COLOR,
         GET_PLAYER_DETAILS,GET_QUESTIONS,UPDTAE_PLAYER_DETAILS,
         ENABLE_OR_DISABLE_ANSWER_BTNS, 
         GAME_OVER} from './types/actionTypes'
import { PlayerDetails } from '../data/PlayerDetails'
import {test} from '../middlewares/gameScreenMiddleware'
import { savePlayerDetails, getPlayerDetailss } from '../data/realmrepo/PlayerRepo'


export const questions=[{question:'sdfsdf',answer:true},
                        {question:'second',answer:false} 
                       ]
export const playerDetails=new PlayerDetails(0,0)

export const navigateTo=(whichScreen)=>{
    return {
        type: NAVIGATE,
        payload: whichScreen
    }
}

export const savePlayerDetailsToRepo=()=>{
    return (dispatch)=>{
        return(
            savePlayerDetails()    
        )
    }
}

export const getPlayerDetailsFromRepo=()=>{
    return (dispatch)=>{
        return(
            getPlayerDetailss()
            )
    }
}

export const getQuestions=()=>{

    return {
            type:GET_QUESTIONS,
            payload:questions
    }
}


export const checkAnswer=(answer)=>{
    let color='green'
    return (dispatch)=>{
        return(
             color=answer==true?'green':'red',
             dispatch( disableAnswerBtns(true)),
             dispatch( changeQuestionTextColor(color)),
             dispatch( updatePlayerDetails()),
         
             test(()=>( dispatch( changeQuestionTextColor('black')) ,
                        dispatch( disableAnswerBtns(false)))
                        ,  1000 )
        )
    }
}

export const updatePlayerDetails=()=>{
    playerDetails.level+=1
    playerDetails.score+=50
    return {
        type:UPDTAE_PLAYER_DETAILS,
        level:playerDetails.level,
        score:playerDetails.score,
        details:playerDetails
    }
}

export const getPlayerDetails=()=>{
    return {
        type:GET_PLAYER_DETAILS,
        level:playerDetails.level,
        score:playerDetails.score
    }
}

export const changeQuestionTextColor=color=>{
    return {
        type:CHANGE_QUESTION_TEXT_COLOR,
        payload:color,
        duration:5,
    }
}

export const disableAnswerBtns=disabled=>{
    return{
        type:ENABLE_OR_DISABLE_ANSWER_BTNS,
        payload:disabled
    }
}

export const showGameOverDialog=visibillity=>{
    return{
        type:GAME_OVER,
        payload:visibillity
    }
}



