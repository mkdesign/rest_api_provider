import express from 'express'
import students from './students'
import teachers from './teachers'
import classes from './classes'

const router = express.Router()
router.use('/classes', classes)
router.use('/teachers', teachers)
router.use('/students', students)

//router.use('/classes/:classId/students', )

export default router