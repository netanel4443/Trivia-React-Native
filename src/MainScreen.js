import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as actions from './actions/mainScreenActions'

function  MainScreen({ navigation }) {
    
    const dispatch = useDispatch()
    const playerDetails = useSelector(state => state.gameReducer.playerDetails)

    useEffect(() => {
     dispatch(actions.getPlayerDetails())
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.playerDetails}>
              <Text > {getPlayerDetails(playerDetails)} </Text>
            </View>
            <TouchableOpacity style={styles.startGameBtn} onPress={()=>startGame(navigation,dispatch)} ><Text>Start game</Text></TouchableOpacity>
        </View>
    )
}

const startGame=(navigation,dispatch)=>{
    dispatch(actions.startAllQuestionsGame())
   navigation.navigate('GameScreen')
}

const getPlayerDetails=(playerDetails)=>{
    return `score ${playerDetails.score } \n level:  ${playerDetails.level}`
}


const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
    },

    playerDetails: {
        elevation   : 3,
        margin      : 10,
        padding     : 10,
        borderWidth: 0 
    },

    startGameBtn: {
        backgroundColor:'yellow',
        elevation: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width:250,
        height:50,
        marginTop:'auto',
        marginBottom:50,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:15
    },
})

export default MainScreen