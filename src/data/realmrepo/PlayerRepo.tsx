import { Observable } from "rxjs"
import { playerDetailsDatabaseOptions ,PLAYER_DETAILS_SCHEMA} from '../PlayerDetailsSchema'
import { PlayerDetails } from "../PlayerDetails";
const Realm = require('realm');

//TODO : check if when a user first time save details 'modified' shouldn't be in this func but, in a seperate func of 'update'
export const savePlayerDetails=(details:PlayerDetails)=>{
    return new Observable(sub=>{
        Realm.open(playerDetailsDatabaseOptions).then((realm:any)=>{
            realm.write(()=>{
                realm.create(PLAYER_DETAILS_SCHEMA,{
                    playerName:'Netanel',
                    diamonds:details.diamonds,
                    bestScore:details.score,
                    bestLevel:details.level
                },'modified')
            })
        })
        .catch((e:any)=> console.log('savePlayerDetails '+{e}))
    })
}

export const getPlayerDetails=()=>{
    // from(Realm.open(playerDetailsDatabaseOptions))
    return new Observable(sub=>{
        Realm.open(playerDetailsDatabaseOptions).then((realm:any)=>{
          const realmObjects= realm.objects(PLAYER_DETAILS_SCHEMA)
              console.log(realmObjects)
                const playerDetailsFromDB=realmObjects[0]
                const tmpPlayerDetails=new PlayerDetails(
                    playerDetailsFromDB.bestLevel,
                    playerDetailsFromDB.bestScore,
                    playerDetailsFromDB.diamonds,
                    playerDetailsFromDB.playerName
                )
              sub.next(tmpPlayerDetails)
        }).catch((e:any)=> console.log('savePlayerDetails '+{e}))
    })
}