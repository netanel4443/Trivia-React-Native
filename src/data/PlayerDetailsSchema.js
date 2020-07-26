import Realm from 'realm'

export const PLAYER_DETAILS_SCHEMA='PlayerDetailsSchema'

export const PlayerDetailsSchema={
    name:PLAYER_DETAILS_SCHEMA,
    primaryKey:'playerName',
    properties:{
        playerName:'string',
        bestScore:'int',
        diamonds:'int'
    }
};

export const playerDetailsDatabaseOptions={
    path:'playeDetails.realm',
    schema:[PlayerDetailsSchema],
    schemaVersion:0,
};