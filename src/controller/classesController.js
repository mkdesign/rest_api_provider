import classModel from '../models/classes'

export default {
    list : async (req, res, next) => {
        try {
            const classes = await classModel.findAll(req, next)
            console.log(classes)
             res.status(200).json({
                classes : classes
            })
        }
        catch(err) {
            next(err)
        }  
    },
    findById: async (req, res, next) => {
        try {
          const classId = req.params.id * 1
    
          const requestClass = await classModel.findById(classId, next)
          if (requestClass !== undefined) {
            return res.send(requestClass)
          } else {
            return res.status(404).end()
          }
        } catch (err) {
          next(err)
        }
    },
    create : async (req, res, next) => {
        try {
            const newClass = {
                ...req.body
            }
            const classID = await classModel.create(newClass, next)
            const created = await classModel.findById(await classID.lastID, next)
            return res.status(200).send({
                class: created
            })
        }
        catch(err) {
            next(err)
        }
    },
    update : async (req, res, next) => {
        try {
            const id = req.params.id * 1
            const updateClass = await classModel.findById(id, next)
            if(updateClass !== null) {
                const classParams = {
                    ...req.body
                }
                if (Object.keys(classParams).length === 0) {
                    res.status(200).send({
                      error: 'No data to update'
                    })
                }
                await classModel.update(id, classParams, next)
                const updated = await classModel.findById(id, next)
                return res.status(200).send({
                    class: updated
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
            const subjectClass = await classModel.findById(id, next)
            if (subjectClass !== null) {
                const deleteClass = await classModel.destroy(id, next)
                return res.status(200).send({
                    id: id
                })
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