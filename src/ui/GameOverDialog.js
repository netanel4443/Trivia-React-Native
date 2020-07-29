import React from 'react'
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native'
import { Dialog } from 'react-native-simple-dialogs';

const GameOverDialog = ({visible,showOrHideFunc,playerDetails,playerName}) => {
   
    return (
        <Dialog
            dialogStyle={styles.dialogStyle}
            visible={visible}
            title="Custom Dialog"
            onTouchOutside={() => {okBtnOnClick(showOrHideFunc)}} >
            <View >
              <Text>Name: {playerName}</Text>
              <Text>Score:{playerDetails.score}</Text>  
              <Text>level:{playerDetails.level}</Text>  
             <TouchableOpacity  style={styles.okBtn} onPress={()=>okBtnOnClick(showOrHideFunc)} ><Text>Ok</Text></TouchableOpacity>
            </View>
        </Dialog>
    )
}

const okBtnOnClick=(showOrHideFunc)=>{
    showOrHideFunc()
}


const styles=StyleSheet.create({
    dialogStyle:{
        borderRadius:5
    },
    okBtn: {
        backgroundColor:'yellow',
        elevation: 10,
        width:200,
        height:30,
        marginLeft:'auto',
        marginRight:'auto',
        alignItems:"center",
        justifyContent:'center',
        borderRadius:5
      },

})

export default GameOverDialog
