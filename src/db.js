import sqlite from 'sqlite'

let _db

// export const initDB = async () => {     // NOT WORKING SELF CODES
//     console.log(1)
//     if(_db) {
//         console.log('DB is already initialized')
//         return _db
//     }
//     const db = await sqlite.open('./database.sqlite')
//     db.migrate({
//             migrationsPath: './db/migrations',
//             force: 'last'
//         })
//     _db = db
//     console.log(_db)
//     return _db
// }


export const initDb = cb => {
  if (_db) {
    console.warn('DB has already been initialized')
    return cb(null, _db)
  }
  Promise.resolve()
    .then(() =>
      sqlite.open('./database.sqlite', {
        Promise
      })
    )
    .then(db =>
      db.migrate({
        migrationsPath: './db/migrations',
        force: 'last'
      })
    )
    .then(db => {
      console.log('DB Initialized')
      _db = db
      return cb(null, _db)
    })
}

// export const getDb = () => {
//   assert.ok(_db, 'Db has not been initialized. call initDB first')
//   return _db
// }

