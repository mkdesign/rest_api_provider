import express from 'express'
import classesController from '../../controller/classesController'
import enrollment from './enrollment'

const classesRoutes = express.Router()
classesRoutes.get('/', classesController.list)
classesRoutes.get('/:id', classesController.findById)
classesRoutes.post('/', classesController.create)
classesRoutes.put('/:id', classesController.update)
classesRoutes.delete('/:id', classesController.destroy)

classesRoutes.use(
    '/:classId/students',
    (req, res, next) => {
      req.classId = req.params.classId
      next()
    },
    enrollment
  )

export default classesRoutes


