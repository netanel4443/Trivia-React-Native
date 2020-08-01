import React from 'react'
import { StyleSheet, Text , TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {useState} from 'react'
import { Dialog } from 'react-native-simple-dialogs';


const CustomGameModal= ({visibillity,dismiss,TotalQuestions,userInput}) => {
  
    const [numberOfQuestionsChosen, setNumberOfQuestions] = useState('1')
    
    return (
      <Dialog
        dialogStyle={styles.centeredView}
        visible={visibillity}
        onTouchOutside={()=>dismiss()}
      >
        <Text style={styles.totalNumberOFQuestionsText}>choose na number between 1 to{TotalQuestions} </Text>
        <TextInput 
        style={styles.textInputStyle}
        keyboardType={'number-pad'}
        onChangeText={(text)=>setNumberOfQuestions(text)}
         />  
       <TouchableOpacity
        onPress={()=>userInput(numberOfQuestionsChosen)}
        style={styles.startGameBtn}
       >
         <Text>Start game</Text>
       </TouchableOpacity>
      </Dialog>
    )
}


export default CustomGameModal

const styles = StyleSheet.create({

    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        borderRadius:3
      },

    textInputStyle:{
        width:100,
        height:60,
        marginLeft:'auto',
        marginRight:'auto',
        elevation:1
    },
    totalNumberOFQuestionsText:{
        marginLeft:'auto',
        marginRight:'auto'
    },
    startGameBtn:{
      marginTop:10,
      elevation:5,
      backgroundColor:'yellow',
      borderRadius:3,
      justifyContent:'center',
      alignItems:'center',
      height:40,
      width:200,
      marginLeft:'auto',
      marginRight:'auto'
    },
})
