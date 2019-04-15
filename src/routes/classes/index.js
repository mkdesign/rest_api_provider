import express from 'express'
 import classesController from '../../controller/classesController'

const classesRoutes = express.Router()
classesRoutes.get('/', classesController.list)
classesRoutes.get('/:id', classesController.findById)
classesRoutes.post('/', classesController.create)
classesRoutes.put('/:id', classesController.update)
classesRoutes.delete('/:id', classesController.destroy)

export default classesRoutes


