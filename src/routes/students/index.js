import express from 'express'
 import studentsController from '../../controller/studentsController'

const studentsRoutes = express.Router()
studentsRoutes.get('/', studentsController.list)
studentsRoutes.get('/:id', studentsController.findById)
// studentsRoutes.get('/:id/classes', studentsController.getStuClass)
studentsRoutes.post('/', studentsController.create)
studentsRoutes.put('/:id', studentsController.update)
studentsRoutes.delete('/:id', studentsController.destroy)

export default studentsRoutes


