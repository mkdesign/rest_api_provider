import express from 'express'
import enrollController from '../../../controller/enrollController'

const enrollRoutes = express.Router()
enrollRoutes.get('/', enrollController.list)
enrollRoutes.post('/', enrollController.create)
enrollRoutes.delete('/:id', enrollController.destroy)

export default enrollRoutes


