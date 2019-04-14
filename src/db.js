import sqlite from 'sqlite'

let _db

export const initDB = async () => {     // NOT WORKING SELF CODES
    console.log(1)
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