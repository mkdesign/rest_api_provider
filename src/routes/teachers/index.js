import express from 'express'
 import teachersController from '../../controller/teachersController'

const teachersRoutes = express.Router()
teachersRoutes.get('/', teachersController.list)
teachersRoutes.get('/:id', teachersController.findById)
teachersRoutes.get('/:id/classes', teachersController.getTeacherClass)
teachersRoutes.post('/', teachersController.create)
teachersRoutes.put('/:id', teachersController.update)
teachersRoutes.delete('/:id', teachersController.destroy)

export default teachersRoutes