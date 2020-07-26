import { Observable,interval } from "rxjs"
import {take} from 'rxjs/operators'


export const timerCountDown=(time)=>{
  return  interval(1000).pipe(take(time))
            .subscribe(x=>console.log('next',x))
}

export const test=(body,time)=>{
   setTimeout(() => {  body()  }, time);
}

export const savePlayerDetailsToDatabase=()=>{
   
}

