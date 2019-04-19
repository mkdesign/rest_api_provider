import SQL from 'sql-template-strings'
import {getDB} from '../db'

export default {
    findAll : async (req, next) => {
        try{
            const db = getDB()
            const teachers = await db.all(SQL`SELECT * FROM teachers`)
            if(teachers == undefined) {
                return null
            }
            return await teachers
        }
        catch (err) {
            next(err)
        }
    },
    findById : async (id,next) => {
        try{
            const db = getDB()
            const teacher = await db.get(SQL`SELECT * FROM teachers WHERE id = ${id}`)

            if(teacher == undefined) {
                return null
            }
            return teacher
        }
        catch (err) {
            next(err)
        }
    },
    create : async (teacher, next) => {
        try {
            const db = getDB()
            const created = await db.run(
                SQL`INSERT INTO teachers
                    (first_name, last_name) VALUES (${teacher.first_name},${teacher.last_name})`
                )
            return await created
        }
        catch(err) {
            next(err)
        }
    },
    update : async (id, teacher, next) => {
        try {
            const db = getDB()
            let columns = Object.keys(teacher)
            let columnsql = columns.join(',')
            let cvalues = columns.map(col => {
                return teacher[col]
            })

            let values = columns.map(() => {
                return '?'
            }).join(',')
            let sql = `UPDATE teachers SET (${columnsql}) = (${values}) WHERE id='${id}'`
            const updatedstmt = await db.prepare(sql)
            const updateQuery = await updatedstmt.run(cvalues)
            return updateQuery
        }
        catch (err) {
            next(err)
        }
    },
    destroy : async (id, next) => {
        try {
            const db = getDB()
            const deleteTeacher = await db.run(SQL`DELETE FROM teachers WHERE id=${id}`)
            return await deleteTeacher
        } catch (err) {
        next(err)
        }
    },
    allClasses : async (id, next) => {
        try {
            const db = getDB()
            const classes = await db.all(`SELECT * FROM classes 
                INNER JOIN teachers ON classes.teacher_id = teachers.id`)
            if(classes == undefined) {
                return null
            }
            return await classes
        }
        catch(err) {
            next(err)
        }
    }  
}