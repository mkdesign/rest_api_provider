import SQL from 'sql-template-strings'
import {getDB} from '../db'

export default {
    findAll : async (req, next) => {
        try{
            const db = getDB()
            const students = await db.all(SQL`SELECT * FROM students`)
            if(students == undefined) {
                return null
            }
            return await students
        }
        catch (err) {
            next(err)
        }
    },
    findById : async (id,next) => {
        try{
            const db = getDB()
            const student = await db.get(SQL`SELECT * FROM students WHERE id = ${id}`)
            if(student == undefined) {
                return null
            }
            return student
        }
        catch (err) {
            next(err)
        }
    },
    create : async (student, next) => {
        try {
            const db = getDB()
            const created = await db.run(
                SQL`INSERT INTO students
                    (first_name, last_name) VALUES (${student.first_name},${student.last_name})`
                )
            return await created
        }
        catch(err) {
            next(err)
        }
    },
    update : async (id, student, next) => {
        try {
            const db = getDB()
            let columns = Object.keys(student)
            let columnsql = columns.join(',')
            let cvalues = columns.map(col => {
                return student[col]
            })

            let values = columns.map(() => {
                return '?'
            }).join(',')
            let sql = `UPDATE students SET (${columnsql}) = (${values}) WHERE id='${id}'`
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
            const deleteStudent = await db.run(SQL`DELETE FROM students WHERE id=${id}`)
            return await deleteStudent
        } catch (err) {
        next(err)
        }
    },
    allClasses : async (id, next) => {
        try {
            const db = getDB()
            const classes = await db.all(`SELECT * FROM classes 
                INNER JOIN student_classes ON classes.id = student_classes.class_id
                INNER JOIN students ON students.id = student_classes.student_id`)
        }
        catch(err) {
            next(err)
        }
    }
}