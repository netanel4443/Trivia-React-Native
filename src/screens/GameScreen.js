import { Text, StyleSheet, View, ImageBackground, BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import backgroundImage from '../images/question.jpg'
import * as actions from '../actions/mainScreenActions'
import { useDispatch,useSelector ,shallowEqual } from "react-redux";
import React, { useEffect , useState } from 'react';
import TimerAnimation from '../ui/TimerAnimation'
import GameOverDialog from '../ui/GameOverDialog'
import { useFocusEffect } from '@react-navigation/native';


  function GameScreen({navigation})  {
   
    const dispatch= useDispatch()
    
    const {questions,score,level,color,disabled,
           gameOverDialogVisibillity,playerDetails,name,isTimerPlaying,
           timerAnimationKey}= useSelector(state => ({
      questions: state.gameReducer.questions,
      level: state.gameReducer.level,
      score: state.gameReducer.score,
      color: state.gameReducer.color,
      disabled: state.gameReducer.disabled,
      gameOverDialogVisibillity: state.gameReducer.gameOverDialogVisibillity,
      playerDetails: state.gameReducer.playerDetails,
      name:state.gameReducer.name,
      isTimerPlaying:state.gameReducer.isTimerPlaying,
      timerAnimationKey:state.gameReducer.timerAnimationKey,
    }),shallowEqual);
    
    const {duration} = useSelector(state => 
      ({duration:state.gameReducer.duration,
    }))
  
    
    useEffect(() => {
      dispatch(actions.getQuestions())
      dispatch(actions.getPlayerDetails())
      dispatch(actions.stopOrResumeTimer(true))
      },[]);
     

      useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            showGameOverDialog(dispatch,true)
            return true
          }
         
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      )


 
    return (
        <View style={styles.mainContainer}>
        <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1}} // must be passed from the parent, the number may vary depending upon your screen size
          source={backgroundImage}
        >
        <View style={styles.playerDetailsDesign}>
          <Text> score: {playerDetails.score} </Text>
          <Text> level: {playerDetails.level} </Text>
        </View>
          
        <View style={styles.timer}>
         <TimerAnimation 
          reset={level}
          duration={duration} 
          actionWhenTimeIsUp={()=>showGameOverDialog(dispatch,true)} 
          isPlaying={isTimerPlaying}

          />
        </View>
       
        <View style={styles.question}>
          {questions[level] ? 
            <Text style={{color:color}}>{questions[level].question}</Text>:
            <Text style={{color:'black'}}>no more questions</Text>
          }
        </View>
       
        <View style={styles.rowBtns}>
          <TouchableOpacity disabled={disabled} style={styles.yesAnswerBtn} onPress={()=>dispatch(actions.checkAnswer(true))} ><Text style={{color:'white'}}>True</Text></TouchableOpacity>
          <TouchableOpacity disabled={disabled} style={styles.noAnswerBtn} onPress={()=>dispatch(actions.checkAnswer(false))} ><Text style={{color:'white'}}>False</Text></TouchableOpacity>
        </View>
      
        </ImageBackground>
        <GameOverDialog  
          visible={gameOverDialogVisibillity} 
          showOrHideFunc={()=> onBackPressed(dispatch,gameOverDialogVisibillity,navigation) } 
          playerDetails={playerDetails}
          playerName={name}
         />
        </View>
    )  
}



const showGameOverDialog=(dispatch,visible)=>{
  dispatch(actions.stopOrResumeTimer(false))
  dispatch(actions.showGameOverDialog(visible))
}

const onBackPressed=(dispatch,gameOverDialogVisibillity,navigation)=>{
  showGameOverDialog(dispatch,!gameOverDialogVisibillity)
  navigation.goBack()  
}


const styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
},

playerDetailsDesign: {
    flexDirection:'row',
    justifyContent:'space-around',
    elevation   : 3,
    margin      : 10,
    padding     : 10,
    borderWidth: 0,
    backgroundColor:'white',

},

timer:{
marginLeft:'auto',
marginRight:'auto',
},

question: {
  elevation   : 3,
  margin      : 20,
  padding     : 10,
  borderWidth: 0,
  alignItems:'center',
  backgroundColor:'white'
},
rowBtns:{
  marginTop:'auto',
  flexDirection:'row',
  justifyContent:'space-evenly',
  marginBottom:50
},
yesAnswerBtn: {
  backgroundColor:'#00cc00',
  elevation: 10,
  width:150,
  height:50,
  marginTop:'auto',
  alignItems:"center",
  justifyContent:'center',
  borderRadius:10,
  
},
noAnswerBtn: {
  backgroundColor:'#ff5c33',
  elevation: 10,
  width:150,
  height:50,
  marginTop:'auto',
  alignItems:"center",
  justifyContent:'center',
  borderRadius:10
},

})

export default GameScreen
