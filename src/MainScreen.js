import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as actions from './actions/mainScreenActions'
import backgroundImage from './images/question.jpg'
import CustomGameModal from './ui/modals/CustomGameModal'

function  MainScreen({ navigation }) {
    
    const dispatch = useDispatch()
    const playerDetails = useSelector(state => state.gameReducer.playerDetails)
    const customGameModalVisibility=useSelector(state=>state.gameReducer.customGameModalVisibility)
    const questions=useSelector(state=>state.gameReducer.questions)

    useEffect(() => {
     dispatch(actions.getPlayerDetails())
     dispatch(actions.getQuestions())
    }, [])

    const showOrHideCustomGameModal=()=>{
        dispatch(actions.showCustomGameModal(!customGameModalVisibility))
    }

    const checkUserInputAndStartCustomGame=(numberOfQuestions)=>{
        console.log(`number of questions ${numberOfQuestions}`)
    }  

    return (
        <View style={styles.mainContainer}>
         <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1}} // must be passed from the parent, the number may vary depending upon your screen size
          source={backgroundImage}
        >
            <View style={styles.playerDetails}>
              <Text > {getPlayerDetails(playerDetails)} </Text>
            </View>
            <View style={styles.gameButtons}>
              <TouchableOpacity style={styles.startGameBtn} onPress={()=>startGame(navigation,dispatch)} ><Text>Start game</Text></TouchableOpacity>
              <TouchableOpacity style={styles.startGameBtn} onPress={()=>showOrHideCustomGameModal()} ><Text>Start custom game</Text></TouchableOpacity>
            </View>
            
         </ImageBackground>
         <CustomGameModal
             visibillity={customGameModalVisibility}
             dismiss={()=>showOrHideCustomGameModal()}
             TotalQuestions={questions.length}
             userInput={(numberOfQuestions)=>checkUserInputAndStartCustomGame(numberOfQuestions)}
         />
        </View>
    )
}

const startGame=(navigation,dispatch)=>{
    dispatch(actions.startAllQuestionsGame())
    navigation.navigate('GameScreen')
}

     

const getPlayerDetails=(playerDetails)=>{
    return `score ${playerDetails.score } \n level:  ${playerDetails.level}\n diamonds: ${playerDetails.diamonds}`
}


const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
    },

    playerDetails: {
        elevation   : 3,
        margin      : 10,
        padding     : 10,
        borderWidth: 0,
        backgroundColor:'white'
    },
    gameButtons:{
        marginBottom:'auto',
        marginTop:'auto'
    },

    startGameBtn: {
        backgroundColor:'yellow',
        elevation: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width:250,
        height:50,
        marginBottom:25,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:15
    },
})

export default MainScreen