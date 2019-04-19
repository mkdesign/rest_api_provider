import SQL from 'sql-template-strings'
import {getDB} from '../db'

export default {
    findAll : async (id, next) => {
        try{
            const db = getDB()
            const students = await db.all(SQL`SELECT * FROM student_classes INNER JOIN students ON students.id = student_classes.student_id WHERE class_id = ${id}`)
            if(students == undefined) {
                return null
            }
            return await students
        }
        catch (err) {
            next(err)
        }
    },
    create : async (enrollment, next) => {
        try {
            const db = getDB()
            const created = await db.run(
                SQL`INSERT INTO student_classes
                    (class_id, student_id)
                    VALUES (${enrollment.class_id}, ${enrollment.student_id})`
                )
            return await created
        }
        catch(err) {
            next(err)
        }
    },
    destroy  : async (stuId,classId, next) => {
        try {
            const db = getDB()
            const deleteClass = await db.run(SQL`DELETE FROM student_classes WHERE student_id=${stuId} AND class_id=${classId}`)
            return await deleteClass
        } catch (err) {
        next(err)
        }
    }   
}