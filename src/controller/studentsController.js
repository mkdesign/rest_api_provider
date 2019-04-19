import studentModel from '../models/students'

export default {
    list : async (req, res, next) => {
        try {
            const students = await studentModel.findAll(req, next)
            console.log(students)
             res.status(200).json({
                students : students
            })
        }
        catch(err) {
            next(err)
        }  
    },
    findById: async (req, res, next) => {
        try {
          const studentId = req.params.id * 1
    
          const requestStudent = await studentModel.findById(studentId, next)
          if (requestStudent !== undefined) {
            return res.send(requestStudent)
          } else {
            return res.status(404).end()
          }
        } catch (err) {
          next(err)
        }
    },
    create : async (req, res, next) => {
        try {
            const student = {
                ...req.body
            }
            const stuID = await studentModel.create(student, next)
            const created = await studentModel.findById(await stuID.lastID, next)
            return res.status(200).send({
                student: created
            })
        }
        catch(err) {
            next(err)
        }
    },
    update : async (req, res, next) => {
        try {
            const id = req.params.id * 1
            const updateStudent = await studentModel.findById(id, next)
            if(updateStudent !== null) {
                const studentParams = {
                    ...req.body
                }
                if (Object.keys(studentParams).length === 0) {
                    res.status(200).send({
                      error: 'No data to update'
                    })
                }
                await studentModel.update(id, studentParams, next)
                const updated = await studentModel.findById(id, next)
                return res.status(200).send({
                    student: updated
                })
            }else {
                res.status(404).send({
                    errors: 'relevant resource does not exist'
                })
            }
        }
        catch(err) {
            next(err)
        }
    },
    destroy : async (req, res, next) => {
        try {
            const id = req.params.id * 1
            const subjectStudent = await studentModel.findById(id, next)
            if (subjectStudent !== null) {
                const deleteStudent = await studentModel.destroy(id, next)
                console.log(deleteStudent)
                if(deleteStudent !== undefined || deleteStudent !== null) {
                    return res.status(200).send({
                        id: id
                    })
                }else {
                    res.status(404).send({
                        errors: 'Something seems to be wrong!'
                    })
                }
            }else {
                res.status(404).send({
                    errors: 'the post does not exist'
                })
            }
        }
        catch(err) {
            next(err)
        }
    }
}