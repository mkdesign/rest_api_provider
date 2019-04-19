import enrollModel from '../models/enroll'

export default {
    list : async (req, res, next) => {
        try {
            let classId = req.classId
            const students = await enrollModel.findAll(classId, next)
            console.log(students)
             res.status(200).json({
                students : students
            })
        }
        catch(err) {
            next(err)
        }  
    },
    create : async (req, res, next) => {
        try {
            console.log(1)
            const enrollment = {
                ...req.body
            }

            enrollment.class_id = req.classId
            
            const enrolled = await enrollModel.create(enrollment, next)
            
            return res.status(200).send({
                enrolled: enrolled
            })
        }
        catch(err) {
            next(err)
        }
    },
    destroy : async (req, res, next) => {
        try {
            const id = req.params.id * 1
            const deleteClass = await enrollModel.destroy(id,req.classId, next)
            return res.status(200).send({
                id: id
            })
        }
        catch(err) {
            next(err)
        }
    }
}