import {combineReducers} from 'redux'
import mainScreenReducer from './mainScreenReducer'
import gameReducer from './gameReducer'

const rootReducer=combineReducers({
    mainScreenReducer : mainScreenReducer,
    gameReducer : gameReducer
})

export default rootReducer