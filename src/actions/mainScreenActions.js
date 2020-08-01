import * as actionTypes from './types/actionTypes'
import {  asapScheduler, asyncScheduler } from "rxjs"
import { subscribeOn , observeOn} from "rxjs/operators";
import {test} from '../middlewares/gameScreenMiddleware'
import {getPlayerDetailsFromRepo} from '../middlewares/gameScreenMiddleware'
import * as useCases from '../middlewares/gameScreenMiddleware'

export const questions=[{question:'sdfsdf',answer:true},
                        {question:'second',answer:false} 
                       ]
 let gameLevel=0
 let gameScore=0


export const navigateTo=(whichScreen)=>{
    return {
        type: actionTypes.NAVIGATE,
        payload: whichScreen
    }
}

export const startAllQuestionsGame=()=>{
    //reset values  when starting a new game
    gameLevel=0 
    gameScore=0
    return{
        type: actionTypes.START_ALL_QUESTIONS_GAME
    }
}

export const showCustomGameModal=(visibillity)=>{
    return{
        type:actionTypes.SHOW_CUSTOM_GAME_MODAL,
        visibillity:visibillity
    }
}


export const savePlayerDetailsToRepo=(playerDetails)=>{
    // playerDetails.level=0  for reset player details should be removed its just for me
    // playerDetails.score=0

    var tmpDetails={...playerDetails}
    if(gameLevel>playerDetails.level){
        tmpDetails.level=gameLevel
    }
    if(gameScore>playerDetails.score){
        tmpDetails.score=gameScore
    }
       
    return (dispatch)=>{
        if (tmpDetails.level!=playerDetails.level || tmpDetails.score!=playerDetails.score ){
        return(
            dispatch(updatePlayerDetails(tmpDetails)),  

            useCases.savePlayerDetailsToDatabase(tmpDetails)
                .pipe(
                    subscribeOn(asyncScheduler),
                    observeOn(asapScheduler)
                ).subscribe()
        )
        }
    }
}

export const getPlayerDetails=()=>{
    return (dispatch)=>{
      return(
        getPlayerDetailsFromRepo()
        .pipe( 
           subscribeOn(asyncScheduler),
           observeOn(asapScheduler)
        ).subscribe((data)=>dispatch(updatePlayerDetails(data)))
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
             dispatch( updateGameDetails()),
         
             test(()=>( dispatch( changeQuestionTextColor('black')) ,
                        dispatch( disableAnswerBtns(false))),  1000 )
        )
    }
}

export const updateGameDetails=()=>{
    gameScore+=50
    gameLevel+=1
    return {
        type:actionTypes.UPDTAE_PLAYER_DETAILS,
        level:gameLevel,
        score:gameScore
    }
}

 export const updatePlayerDetails=(playerDetails)=>{
    return {
        type:actionTypes.GET_PLAYER_DETAILS,
        playerDetails:playerDetails
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

export const stopOrResumeTimer=(isPlaying)=>{
    return{
        type:actionTypes.STOP_OR_RESUME_TIMER,
        isTimerPlaying:isPlaying,
    }
}

export const showGameOverDialog=visibillity=>{

    return{
        type:actionTypes.GAME_OVER,
        payload:visibillity
    }
}
