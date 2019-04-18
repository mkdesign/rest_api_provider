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
    findById : (id, res) => {
        res.status(200).send('show id')
    },
    create : (req,res) => {
        res.status(200).send('create')
    },
    update : (req, res) => {
        res.status(200).send('update')
    },
    destroy : (req,res) => {
        res.status(200).send('delete')
    }
}