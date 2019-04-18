import sqlite from 'sqlite'

let _db

export const initDB = async () => {
    
    if(_db) {
        console.log('DB is already initialized')
        return _db
    }
    const db = await sqlite.open('./database.sqlite')
    db.migrate({
            migrationsPath: './db/migrations',
            force: 'last'
        })
    _db = db
    console.log(_db)
    return _db
}

export const getDB = () => {
    return _db
}