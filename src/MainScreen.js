import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'

function  MainScreen({ navigation }) {
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.playerDetails}>
              <Text > {getPlayetDetails()} </Text>
            </View>
            <TouchableOpacity style={styles.startGameBtn} onPress={()=>startGame(navigation)} ><Text>Start game</Text></TouchableOpacity>
        </View>

    )
}

const startGame=(navigation)=>{
  navigation.navigate('GameScreen')
}

const getPlayetDetails=()=>{
    return 'Name : Netanel\nscore : 0\nlevel : 0'
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