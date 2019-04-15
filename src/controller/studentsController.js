

export default {
    list : (req, res) => {
        res.status(200).send('list of students')
    },
    findById : (id, res) => {
        res.status(200).send('show id')
    },
    getStuClass : (id, res) => {
        res.status(200).send('show id and class')
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