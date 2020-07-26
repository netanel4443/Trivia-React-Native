import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import React, {useState} from 'react' 
import { Animated } from 'react-native';

const TimerAnimation = ({reset,duration,actionWhenTimeIsUp}) =>{


return (
  <CountdownCircleTimer
    key={reset}
    isPlaying
    size={100}
    duration={duration}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}  
    onComplete={() => {
      actionWhenTimeIsUp()
     
     }
    }
    
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: 'white' , fontSize:20}}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
)
    }
export default TimerAnimation