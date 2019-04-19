import SQL from 'sql-template-strings'
import {getDB} from '../db'

export default {
    findAll : async (req, next) => {
        try{
            const db = getDB()
            const classes = await db.all(SQL`SELECT * FROM classes`)
            if(classes == undefined) {
                return null
            }
            return await classes
        }
        catch (err) {
            next(err)
        }
    },
    findById : async (id,next) => {
        try{
            const db = getDB()
            const classes = await db.get(SQL`SELECT 
            teachers.name As teacher_name, id, code, name, start_Date, end_date
             FROM classes INNER JOIN teachers ON teachers.id = classes.teacher_id WHERE classes.id = ${id}`)
            if(classes == undefined) {
                return null
            }
            return classes
        }
        catch (err) {
            next(err)
        }
    },
    create : async (newClass, next) => {
        try {
            const db = getDB()
            const created = await db.run(
                SQL`INSERT INTO classes
                    (code,name,teacher_id,start_date, end_date)
                    VALUES (${newClass.code},${newClass.name},${newClass.teacher_id},${newClass.start_date},${newClass.end_date})`
                )
            return await created
        }
        catch(err) {
            next(err)
        }
    },
    update : async (id, updateClass, next) => {
        try {
            const db = getDB()
            let columns = Object.keys(updateClass)
            let columnsql = columns.join(',')
            let cvalues = columns.map(col => {
                return updateClass[col]
            })

            let values = columns.map(() => {
                return '?'
            }).join(',')
            let sql = `UPDATE classes SET (${columnsql}) = (${values}) WHERE id='${id}'`
            const updatedstmt = await db.prepare(sql)
            const updateQuery = await updatedstmt.run(cvalues)
            return updateQuery
        }
        catch (err) {
            next(err)
        }
    },
    destroy  : async (id, next) => {
        try {
            const db = getDB()
            const deleteClass = await db.run(SQL`DELETE FROM classes WHERE id=${id}`)
            return await deleteClass
        } catch (err) {
        next(err)
        }
    }   
}