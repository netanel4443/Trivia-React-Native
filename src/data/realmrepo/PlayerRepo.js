import { Observable, observable, from, Scheduler, asapScheduler, asyncScheduler } from "rxjs"
import { playerDetailsDatabaseOptions ,PLAYER_DETAILS_SCHEMA} from '../PlayerDetailsSchema'
import { subscribeOn , observeOn} from "rxjs/operators";
const Realm = require('realm');



export const savePlayerDetails=()=>{
    return new Observable(sub=>{
        Realm.open(playerDetailsDatabaseOptions).then(realm=>{
            realm.write(()=>{
                realm.create(PLAYER_DETAILS_SCHEMA,{
                    playerName:'Netanel',
                    diamonds:10,
                    bestScore:1500
                })
            })
        })
        .catch((e)=> console.log('savePlayerDetails '+{e}))
    }).pipe( subscribeOn(asyncScheduler),
             observeOn(asapScheduler))
      .subscribe(console.log)
}

export const getPlayerDetailss=()=>{
    // from(Realm.open(playerDetailsDatabaseOptions))
    return new Observable(sub=>{
        Realm.open(playerDetailsDatabaseOptions).then(realm=>{
          const realmObjects=  realm.objects(PLAYER_DETAILS_SCHEMA)
            console.log(realmObjects)
        })
    })
}