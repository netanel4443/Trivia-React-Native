import * as actionTypes from './types/actionTypes'
import {  asapScheduler, asyncScheduler } from "rxjs"
import { subscribeOn , observeOn} from "rxjs/operators";
import { PlayerDetails } from '../data/PlayerDetails'
import {test} from '../middlewares/gameScreenMiddleware'
import { savePlayerDetails } from '../data/realmrepo/PlayerRepo'
import {getPlayerDetailsFromRepo} from '../middlewares/gameScreenMiddleware'
import { Action } from 'rxjs/internal/scheduler/Action';

export const questions=[{question:'sdfsdf',answer:true},
                        {question:'second',answer:false} 
                       ]
export const playerDetails=new PlayerDetails(0,0)

export const navigateTo=(whichScreen)=>{
    return {
        type: actionTypes.NAVIGATE,
        payload: whichScreen
    }
}

export const savePlayerDetailsToRepo=()=>{
    return ()=>{
        return(
            savePlayerDetails()    
        )
    }
}

export const getPlayerDetails=()=>{
    return (dispatch)=>{
      return(
        getPlayerDetailsFromRepo()
        .pipe( 
           subscribeOn(asyncScheduler),
           observeOn(asapScheduler)
       ).subscribe((data)=>dispatch(getPlayer(data)))
      )
    }
}

export const getQuestions=()=>{

    return {
            type:actionTypes.GET_QUESTIONS,
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
                        dispatch( disableAnswerBtns(false))),  1000 )
        )
    }
}

export const updatePlayerDetails=()=>{
    playerDetails.level+=1
    playerDetails.score+=50
    return {
        type:actionTypes.UPDTAE_PLAYER_DETAILS,
        level:playerDetails.level,
        score:playerDetails.score,
        details:playerDetails,
    }
}

 export const getPlayer=(name)=>{
    return {
        type:actionTypes.GET_PLAYER_DETAILS,
        level:playerDetails.level,
        score:playerDetails.score,
        name:name
    }
}

export const changeQuestionTextColor=color=>{
    return {
        type:actionTypes.CHANGE_QUESTION_TEXT_COLOR,
        payload:color,
        duration:3,
    }
}

export const disableAnswerBtns=disabled=>{
    return{
        type:actionTypes.ENABLE_OR_DISABLE_ANSWER_BTNS,
        payload:disabled
    }
}

export const showGameOverDialog=visibillity=>{

    return{
        type:actionTypes.GAME_OVER,
        payload:visibillity
    }
}

export const stopOrResumeTimer=(isPlaying)=>{
    return{
        type:actionTypes.STOP_OR_RESUME_TIMER,
        isTimerPlaying:isPlaying,
    }
}



